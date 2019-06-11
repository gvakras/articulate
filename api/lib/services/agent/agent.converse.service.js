import _ from 'lodash';
import {
    CSO_AGENT,
    CSO_CONTEXT,
    CSO_TIMEZONE_DEFAULT,
    MODEL_ACTION,
    MODEL_AGENT,
    MODEL_CATEGORY,
    MODEL_KEYWORD,
    MODEL_WEBHOOK,
    PARAM_DOCUMENT_RASA_RESULTS,
    RASA_INTENT_SPLIT_SYMBOL,
    CSO_CATEGORIES,
    MODEL_POST_FORMAT
} from '../../../util/constants';
import GlobalDefaultError from '../../errors/global.default-error';
import RedisErrorHandler from '../../errors/redis.error-handler';

module.exports = async function ({ id, sessionId, text, timezone, debug = false, additionalKeys = null }) {

    const { redis, handlebars } = this.server.app;
    const { agentService, contextService, globalService, documentService } = await this.server.services();
    const webhooks = [];

    //MARK: reduce the remaining life of the saved slots
    const updateLifespanOfSlots = (conversationStateObject) => {

        Object.keys(conversationStateObject.context.savedSlots).forEach(slot => {
            const savedSlot = conversationStateObject.context.savedSlots[slot];
            if (savedSlot.remainingLife > -1){
                if (savedSlot.remainingLife > 0){
                    //1 is the shortest value of life, after that it is set to null as 0 is infinity
                    if (savedSlot.remainingLife === 1){
                        savedSlot.remainingLife = null;
                    }
                    else {
                        savedSlot.remainingLife--;
                    }
                }
            }
        });
        //Removes all the slots that doesn't have a remaining life
        Object.keys(conversationStateObject.context.savedSlots).forEach((slot) => {
            if (!conversationStateObject.context.savedSlots[slot].remainingLife){
                delete conversationStateObject.context.savedSlots[slot];
            };
        });
    };

    //MARK: get all the keywords for all the categories
    const getKeywordsFromRasaResults = ({ rasaResults }) => {

        return _.flatMap(rasaResults, (category) => {

            category.keywords = _.map(category.keywords, (keyword) => {

                //MARK: assigns category name to keyword
                keyword.category = category.category;
                return keyword;
            });
            return category.keywords;
        });
    };

    //MARK: returns the category recognizer, or the only category or just list of keywords
    const getBestRasaResult = ({ rasaResults, categoryClassifierThreshold, multiCategory }) => {

        let rasaResult = {};

        const recognizedCategory = rasaResults[0];

        if (multiCategory) {
            //MARK: if there is more than one category and this exceeds the agent.categoryClassifierThreshold then return it
            if (rasaResults.length > 0 && recognizedCategory.categoryScore > categoryClassifierThreshold) {
                rasaResult = recognizedCategory;
            }
            else {
                //MARK: if there is only one then return it
                if (rasaResults.length === 1) {
                    rasaResult = recognizedCategory;
                }
                //MARK: if there is more than one then collect all keywords
                //MARK: but this will have a different structure?
                else {
                    rasaResult.keywords = getKeywordsFromRasaResults({ rasaResults });
                }
            }
        }
        else {
            rasaResult = recognizedCategory;
        }

        return rasaResult;
    };

    //MARK: if there is an action, look for it in the agent actions, return the first one
    const getActionData = ({ rasaResult, agentActions }) => {

        //MARK: rasaResult comes from getBestRasaResult
        if (rasaResult.action) {

            return _.filter(agentActions, (agentAction) => {

                return agentAction.actionName === rasaResult.action.name;
            })[0];
        }
        return null;
    };

    //MARK: if there is a modifier, look for it in the agent keywords, return the first one
    const getModifierData = ({ rasaResult, agentKeywords }) => {

        //MARK: rasaResult comes from getBestRasaResult
        if (rasaResult.action) {

            const agentModifiers = _.flatten(_.map(agentKeywords, (keyword) => {

                return _.map(keyword.modifiers, (modifier) => {

                    modifier.keyword = keyword.keywordName;
                    return modifier;
                });
            }));
            return _.filter(agentModifiers, (modifier) => {

                return modifier.modifierName === rasaResult.action.name;
            })[0];
        }
        return null;
    };

    //MARK: find and action from the agent object by name
    const getActionByName = ({ actionName, agentActions }) => {

        return _.filter(agentActions, (agentAction) => {

            return agentAction.actionName === actionName;
        })[0];
    };

    //MARK: look into all the context until you get one with slots
    const getLastContextWithValidSlots = ({ context, recognizedKeywords }) => {

        const recognizedKeywordsNames = _.map(recognizedKeywords, 'keyword');
        let keepGoing = true;
        let contextIndex = context.frames.length - 1;
        let lastValidContext = null;
        while (keepGoing && contextIndex !== -1) {

            const contextSlotsKeywords = context.frames[contextIndex].slots ? _.map(context.frames[contextIndex].slots, 'keyword') : [];
            const intersection = _.intersection(recognizedKeywordsNames, contextSlotsKeywords);
            if (intersection.length > 0) {
                keepGoing = false;
                lastValidContext = _.cloneDeep(context.frames[contextIndex]);
            }
            contextIndex--;
        }
        if (lastValidContext){
            delete lastValidContext.id;
        }
        return lastValidContext;
    };

    const recognizedKeywordsArePartOfTheContext = ({ conversationStateObject, recognizedKeywords }) => {

        const agentActionData = getActionByName({ actionName: conversationStateObject.currentFrame.action, agentActions: conversationStateObject.agent.actions });
        if (agentActionData){
            const agentActionSlotsKeywords = _.map(agentActionData.slots, 'keyword');
            
            const isPartOfActionSlots = recognizedKeywords.some((recognizedKeyword) => {

                if (agentActionSlotsKeywords.indexOf(recognizedKeyword.keyword) > -1){
                    return true;
                }
                return false;
            });
            return isPartOfActionSlots;
        }
        return false;
    };

    const response = async ({ conversationStateObject }) => {

        updateLifespanOfSlots(conversationStateObject);
        //MARK: CSO.parse ===true
        if (conversationStateObject.parse) {
            //MARK: if the model recognized an action
            if (conversationStateObject.action && !conversationStateObject.modifier) {
                //MARK: if there is an action but no responses call RespondFallback and persist context
                if (!conversationStateObject.action.responses || conversationStateObject.action.responses.length === 0) {
                    //await agentService.converseUpdateContextFrames({ id: conversationStateObject.context.id, frames: conversationStateObject.context.frames });
                    return await agentService.converseGenerateResponseFallback({ agent: conversationStateObject.agent, conversationStateObject });
                }
                //MARK: CSO.parse ===false
                //MARK: get category using rasaResult category name
                conversationStateObject.category = conversationStateObject.categories[conversationStateObject.rasaResult.category];
                //MARK: if there is an action and a category, check if the action confidence ia bigger than the category threshold === true
                if ((!conversationStateObject.agent.multiCategory && conversationStateObject.rasaResult.action.confidence > conversationStateObject.agent.categoryClassifierThreshold) ||
                    (conversationStateObject.agent.multiCategory && conversationStateObject.category && conversationStateObject.rasaResult.action.confidence > conversationStateObject.category.actionThreshold)) {
                    //MARK: if the current context is empty or the current OR if the action name is the same as the current context action add a new frame with empty slots
                    if (!conversationStateObject.currentFrame || (conversationStateObject.rasaResult.action.name !== conversationStateObject.currentFrame.action)) {
                        const frame = {
                            action: conversationStateObject.rasaResult.action.name,
                            slots: {}
                        };
                        conversationStateObject.context.frames.push(frame);
                        //MARK: get the last context, but it is the same that was pushed above?
                        conversationStateObject.currentFrame = frame;
                    }
                    const actionResponse = await agentService.converseGenerateResponse({
                        conversationStateObject
                    });
                    //TODO: agentService.converseGenerateResponse, this needs to be removed from there
                    await agentService.converseUpdateContextFrames({ id: conversationStateObject.context.id, frames: conversationStateObject.context.frames });
                    return actionResponse;
                }
            }

            //MARK: if the model recognized a modifier
            if (conversationStateObject.modifier && conversationStateObject.action) {
                //MARK: get the slots of the current context action
                const currentFrameSlotsKeywords = _.map(conversationStateObject.action.slots, 'keyword');
                //MARK: if the modifier applies to the current context
                if (currentFrameSlotsKeywords.indexOf(conversationStateObject.modifier.keyword) !== -1) {
                    //MARK: generate response using the modifier
                    const actionResponse = await agentService.converseGenerateResponse({
                        conversationStateObject
                    });
                    //TODO: agentService.converseGenerateResponse, this needs to be removed from there
                    await agentService.converseUpdateContextFrames({ id: conversationStateObject.context.id, frames: conversationStateObject.context.frames });
                    return actionResponse;
                }
            }
            //MARK: if there is NO action then use the rasaResult.keywords else get them from getKeywordsFromRasaResults
            //MARK: I think this line doesn't do much since we already called getKeywordsFromRasaResults before to get rasaResult, the only difference is that we are saving the entire rasaResult instead of just the keywords
            const recognizedKeywords = conversationStateObject.rasaResult.action ? getKeywordsFromRasaResults({ rasaResults: conversationStateObject.parse }) : conversationStateObject.rasaResult.keywords;
            //MARK: conversationStateObject.currentFrame === true
            if (conversationStateObject.currentFrame) {
                //MARK: recognizedKeywords>0
                if (recognizedKeywords.length > 0) {
                    //MARK: if there are slots and the recognizedKeywords are part of the context == true
                    if (conversationStateObject.currentFrame.slots && Object.keys(conversationStateObject.currentFrame.slots).length > 0 && recognizedKeywordsArePartOfTheContext({ conversationStateObject, recognizedKeywords })) {
                        //MARK: update action object from the action of the context
                        conversationStateObject.action = getActionByName({ actionName: conversationStateObject.currentFrame.action, agentActions: conversationStateObject.agent.actions });
                        const actionResponse = await agentService.converseGenerateResponse({
                            conversationStateObject
                        });
                        //TODO: agentService.converseGenerateResponse, this needs to be removed from there
                        await agentService.converseUpdateContextFrames({ id: conversationStateObject.context.id, frames: conversationStateObject.context.frames });
                        return Object.assign(actionResponse, { followedKeywordPath: true });
                    }
                    //MARK: the recognized keyword aren't part of the latest frame
                    //MARK: if there are no slots then we get the last one with valid slots, update the context list and set the last context, then get the action used by that context
                    const lastValidContext = getLastContextWithValidSlots({ context: conversationStateObject.context, recognizedKeywords });
                    if (lastValidContext) {
                        conversationStateObject.context.frames.push(lastValidContext);
                        conversationStateObject.currentFrame = lastValidContext;
                        conversationStateObject.action = getActionByName({ actionName: conversationStateObject.currentFrame.action, agentActions: conversationStateObject.agent.actions });
                        const actionResponse = await agentService.converseGenerateResponse({
                            conversationStateObject
                        });
                        //TODO: agentService.converseGenerateResponse, this needs to be removed from there
                        await agentService.converseUpdateContextFrames({ id: conversationStateObject.context.id, frames: conversationStateObject.context.frames });
                        return Object.assign(actionResponse, { followedKeywordPath: true });
                    }
                }
            }
            return await agentService.converseGenerateResponseFallback({ agent: conversationStateObject.agent, conversationStateObject });
        }
        return Promise.reject(GlobalDefaultError({
            message: `Sorry, the engine wasn't able to parse your text`
        }));
    };

    const storeDataInQueue = async ({ conversationStateObject, action, response, indexOfActionInQueue }) => {

        if (indexOfActionInQueue === -1) {
            conversationStateObject.context.actionQueue.push({
                action,
                slots: conversationStateObject.currentFrame.slots
            });
            conversationStateObject.context.responseQueue.push({ ...response });
        }
        else {
            conversationStateObject.context.actionQueue[indexOfActionInQueue] = {
                action,
                slots: conversationStateObject.currentFrame.slots
            };
            conversationStateObject.context.responseQueue[indexOfActionInQueue] = { ...response };
        }
        await saveContextQueues({ context: conversationStateObject.context });
    };

    const saveContextQueues = async ({ context }) => {
        await contextService.update({
            sessionId: context.sessionId,
            data: {
                actionQueue: context.actionQueue,
                responseQueue: context.responseQueue
            }
        });
    };

    const removeFromQueue = async ({ conversationStateObject, action }) => {
        const index = indexOnQueue({ actionQueue: conversationStateObject.context.actionQueue, action });
        conversationStateObject.context.actionQueue.splice(index, 1);
        conversationStateObject.context.responseQueue.splice(index, 1);
        await contextService.update({
            sessionId: conversationStateObject.context.sessionId,
            data: {
                actionQueue: conversationStateObject.context.actionQueue,
                responseQueue: conversationStateObject.context.responseQueue
            }
        });
    };

    const moveOnQueue = ({ context, oldIndex, newIndex }) => {
        context.actionQueue.splice(newIndex, 0, context.actionQueue.splice(oldIndex, 1)[0]);
        context.responseQueue.splice(newIndex, 0, context.responseQueue.splice(oldIndex, 1)[0]);
    };

    const indexOnQueue = ({ actionQueue, action, modifier, agentActions }) => {

        let actionIndex = -1;
        if (modifier) {
            actionQueue.some((tempAction, tempIndex) => {

                const tempActionData = getActionByName({ actionName: tempAction.action, agentActions });
                tempActionData.slots.some((tempSlot) => {

                    if (tempSlot.keyword === modifier.keyword) {
                        actionIndex = tempIndex;
                    }
                    return actionIndex !== -1;
                });
                return actionIndex !== -1;
            });
        }
        else {
            actionQueue.some((tempAction, tempIndex) => {

                if (tempAction.action === action) {
                    actionIndex = tempIndex;
                }
                return actionIndex !== -1;
            });
        }

        return actionIndex;
    };

    const getResponsesFromQueue = ({ context }) => {

        const responses = [];
        const actionsToRemove = [];
        context.responseQueue.every((response, index) => {

            if (response.actionWasFulfilled) {
                responses.push(context.responseQueue[index].textResponse);
                actionsToRemove.push(index);
                return true;
            }

            responses.push(context.responseQueue[index].textResponse);
            return false;

        });
        context.actionQueue = _.filter(context.actionQueue, (action, index) => {
            return actionsToRemove.indexOf(index) === -1;
        });
        context.responseQueue = _.filter(context.responseQueue, (response, index) => {
            return actionsToRemove.indexOf(index) === -1;
        });
        return responses;
    };

    const getResponseOfChainedAction = async ({ action, conversationStateObject }) => {

        const response = {
            actionWasFulfilled: true
        };
        //If the chained action have required slots, check if those can be pulled from the current context
        const requiredSlotNames = _.compact(_.map(action.slots, (slot) => {

            return slot.isRequired ? slot : null;
        }));
        if (requiredSlotNames.length > 0) {
            const missingSlots = _.filter(requiredSlotNames, (slot) => {

                if (conversationStateObject.slots) {
                    const currentSlotValue = conversationStateObject.slots[slot.slotName];
                    return (currentSlotValue === undefined) || (currentSlotValue === '') || (currentSlotValue === null) || (Array.isArray(currentSlotValue) && currentSlotValue.length === 0);
                }
                return true;
            });
            if (missingSlots.length > 0) {
                response.actionWasFulfilled = false;
                const textResponse = await agentService.converseCompileResponseTemplates({ responses: missingSlots[0].textPrompts, templateContext: conversationStateObject, isTextPrompt: true });
                Object.assign(response, { ...textResponse });
                return response;
            }
        }
        if (action.useWebhook || conversationStateObject.agent.useWebhook) {
            let modelPath, webhook;
            if (action.useWebhook) {
                modelPath = [
                    {
                        model: MODEL_AGENT,
                        id: conversationStateObject.agent.id
                    },
                    {
                        model: MODEL_ACTION,
                        id: action.id
                    },
                    {
                        model: MODEL_WEBHOOK
                    }
                ];
                webhook = await globalService.findInModelPath({ modelPath, isFindById: false, isSingleResult: true });
            }
            else {
                modelPath = [
                    {
                        model: MODEL_AGENT,
                        id: conversationStateObject.agent.id
                    },
                    {
                        model: MODEL_WEBHOOK
                    }
                ];
                webhook = await globalService.findInModelPath({ modelPath, isFindById, isSingleResult, skip, limit, direction, field });
            }
            const webhookResponse = await agentService.converseCallWebhook({
                url: webhook.webhookUrl,
                templatePayload: webhook.webhookPayload,
                payloadType: webhook.webhookPayloadType,
                method: webhook.webhookVerb,
                headers: webhook.webhookHeaders,
                username: webhook.webhookUser ? webhook.webhookUser : undefined,
                password: webhook.webhookPassword ? webhook.webhookPassword : undefined,
                templateContext: conversationStateObject
            });
            if (webhookResponse.textResponse) {
                return { textResponse: webhookResponse.textResponse, actions: webhookResponse.actions ? webhookResponse.actions : [], actionWasFulfilled: true, webhook: webhookResponse };
            }
            conversationStateObject.webhook = { ...webhookResponse };
            const textResponse = await agentService.converseCompileResponseTemplates({ responses: action.responses, templateContext: conversationStateObject });
            return { ...textResponse, webhook: webhookResponse, actionWasFulfilled: true };
        }
        const textResponse = await agentService.converseCompileResponseTemplates({ responses: action.responses, templateContext: conversationStateObject });
        Object.assign(response, { ...textResponse });
        return response;
    };

    const chainResponseActions = async ({ conversationStateObject, responseActions }) => {

        const agentActions = conversationStateObject[CSO_AGENT].actions;
        let currentQueueIndex = 0;

        for (let responseAction of responseActions) {
            let agentAction = _.filter(agentActions, (tempAction) => {

                return tempAction.actionName === responseAction;
            });
            if (agentAction.length > 0) {
                agentAction = agentAction[0];
                const indexOfActionInQueue = indexOnQueue({ actionQueue: conversationStateObject.context.actionQueue, action: agentAction.actionName });
                if (indexOfActionInQueue !== -1) {
                    moveOnQueue({
                        context: conversationStateObject.context,
                        oldIndex: indexOfActionInQueue,
                        newIndex: currentQueueIndex
                    });
                    currentQueueIndex++;
                }
                else {
                    const chainedActionSlotNames = _.map(agentAction.slots, 'slotName');
                    const slotsOfChainedAction = {};
                    if (conversationStateObject.slots){
                        chainedActionSlotNames.forEach((actionSlot) => {

                            if (conversationStateObject.slots[actionSlot]){
                                slotsOfChainedAction[actionSlot] = conversationStateObject.slots[actionSlot];
                            }
                            else{
                                slotsOfChainedAction[actionSlot] = '';
                            }
                        });
                    }
                    conversationStateObject.context.frames.push(
                    {
                        action: agentAction.actionName,
                        slots: slotsOfChainedAction
                    });

                    conversationStateObject.context.actionQueue.push({
                        action: agentAction.actionName,
                        slots: {}
                    });
                    const response = await getResponseOfChainedAction({ action: agentAction, conversationStateObject });
                    if (response.webhook) {
                        webhooks.push(response.webhook);
                    }
                    conversationStateObject.context.responseQueue.push({ ...response });
                    await chainResponseActions({ conversationStateObject, responseActions: response.actions } )
                }
            }
        }
    };

    const conversationStateObject = {};

    try {
        let allProcessedPostFormat = {};
        const AgentModel = await redis.factory(MODEL_AGENT, id);

        const ParsedDocument = await agentService.parse({ AgentModel, text, timezone, returnModel: true, sessionId });
        const recognizedActionNames = ParsedDocument[PARAM_DOCUMENT_RASA_RESULTS][0].action.name.split(RASA_INTENT_SPLIT_SYMBOL);

        conversationStateObject[CSO_AGENT] = AgentModel.allProperties();
        conversationStateObject[CSO_AGENT].actions = await globalService.loadAllLinked({ parentModel: AgentModel, model: MODEL_ACTION, returnModel: false });
        const agentCategories = await globalService.loadAllLinked({ parentModel: AgentModel, model: MODEL_CATEGORY, returnModel: false });
        conversationStateObject[CSO_CATEGORIES] = {}
        agentCategories.forEach((agentCategory) => {

            conversationStateObject[CSO_CATEGORIES][agentCategory.categoryName] = agentCategory;
        });
        conversationStateObject[CSO_AGENT].keywords = await globalService.loadAllLinked({ parentModel: AgentModel, model: MODEL_KEYWORD, returnModel: false });

        let storeInQueue = false;
        let currentQueueIndex = 0;

        const responses = await recognizedActionNames.reduce(async (previousPromise, recognizedActionName) => {
            let finalResponse = null;
            const data = await previousPromise;

            //This block will handle sessionIds that doesn't exists
            //If the sessionId doesn't exists it creates one context for that session
            //And adds a frames attribute which is an empty array
            //The frames will be updated once converse resolve the value
            let context;
            try {
                context = await contextService.findBySession({ sessionId, loadFrames: true });
            }
            catch (error) {
                if (error.statusCode && error.statusCode === 404) {
                    context = await contextService.create({ data: { sessionId } });
                    context.frames = [];
                }
                else {
                    return Promise.reject(error);
                }
            }
            conversationStateObject[CSO_CONTEXT] = context;
            //MARK: Get the last frame context from the context array
            conversationStateObject.currentFrame = _.last(conversationStateObject.context.frames);

            ParsedDocument[PARAM_DOCUMENT_RASA_RESULTS][0].action.name = recognizedActionName;
            conversationStateObject.docId = ParsedDocument.id;
            conversationStateObject.parse = ParsedDocument[PARAM_DOCUMENT_RASA_RESULTS];
            conversationStateObject.text = text;
            conversationStateObject.sessionId = sessionId;
            conversationStateObject.timezone = timezone || conversationStateObject[CSO_AGENT].timezone || CSO_TIMEZONE_DEFAULT;
            if (!_.isEmpty(additionalKeys)) {
                _.mapKeys(additionalKeys, (value, key) => {

                    if (!conversationStateObject[key]) {
                        conversationStateObject[key] = value;
                    }
                });
            }
            let indexOfActionInQueue = -1;
            //MARK: get category recognizer, 1 category or list of keywords from all categories
            conversationStateObject.rasaResult = getBestRasaResult({ rasaResults: conversationStateObject.parse, categoryClassifierThreshold: conversationStateObject.agent.categoryClassifierThreshold, multiCategory: conversationStateObject.agent.multiCategory });
            //MARK: if there is an action, look for it in the agent actions
            conversationStateObject.action = getActionData({ rasaResult: conversationStateObject.rasaResult, agentActions: conversationStateObject.agent.actions });
            if (!conversationStateObject.action) {
                //MARK: look if the model recognized a modifier
                conversationStateObject.modifier = getModifierData({ rasaResult: conversationStateObject.rasaResult, agentKeywords: conversationStateObject.agent.keywords });
                if (conversationStateObject.modifier) {
                    //MARK: search if there is an action in the queue that can be modified by the modifier
                    indexOfActionInQueue = indexOnQueue({ actionQueue: conversationStateObject.context.actionQueue, modifier: conversationStateObject.modifier, agentActions: conversationStateObject.agent.actions });
                    if (indexOfActionInQueue !== -1) {
                        //MARK: if there is an action that can be modified by the modifier, then get its data
                        conversationStateObject.action = getActionByName({ actionName: conversationStateObject.context.actionQueue[0].action, agentActions: conversationStateObject.agent.actions });
                    }
                    else {
                        //MARK: if the modifier doesn't modifies any action in the action queue, get latest action in context
                        if (conversationStateObject.currentFrame) {
                            conversationStateObject.action = getActionByName({ actionName: conversationStateObject.currentFrame.action, agentActions: conversationStateObject.agent.actions });
                        }
                    }
                }
            }
            else {
                indexOfActionInQueue = indexOnQueue({ actionQueue: conversationStateObject.context.actionQueue, action: conversationStateObject.action.actionName });
            }

            if (indexOfActionInQueue !== -1) {
                moveOnQueue({
                    context: conversationStateObject.context,
                    oldIndex: indexOfActionInQueue,
                    newIndex: currentQueueIndex
                });
                currentQueueIndex++;
            }

            const agentToolResponse = await response({ conversationStateObject });
            indexOfActionInQueue = indexOfActionInQueue !== -1 ? indexOfActionInQueue : (conversationStateObject.action ? indexOnQueue({ actionQueue: conversationStateObject.context.actionQueue, action: conversationStateObject.action.actionName }) : -1);
            if (agentToolResponse.followedKeywordPath && indexOfActionInQueue !== -1){
                moveOnQueue({
                    context: conversationStateObject.context,
                    oldIndex: indexOfActionInQueue,
                    newIndex: currentQueueIndex
                });
                currentQueueIndex++;
            }
            if (agentToolResponse.webhook) {
                webhooks.push(agentToolResponse.webhook);
            }
            const cleanAgentToolResponse = {
                docId: agentToolResponse.docId,
                textResponse: agentToolResponse.textResponse,
                actionWasFulfilled: agentToolResponse.actionWasFulfilled,
                actions: agentToolResponse.actions,
                isFallback: agentToolResponse.isFallback
            };
            storeInQueue = storeInQueue || !cleanAgentToolResponse.actionWasFulfilled;

            cleanAgentToolResponse.docId = conversationStateObject.docId;
            let postFormatPayloadToUse;
            let usedPostFormatAction;


            if ((conversationStateObject.action && conversationStateObject.action.usePostFormat) || conversationStateObject.agent.usePostFormat) {
                let modelPath, postFormat;
                if (conversationStateObject.action && conversationStateObject.action.usePostFormat){
                    modelPath = [
                        {
                            model: MODEL_AGENT,
                            id: conversationStateObject.agent.id
                        },
                        {
                            model: MODEL_ACTION,
                            id: conversationStateObject.action.id
                        },
                        {
                            model: MODEL_POST_FORMAT
                        }
                    ];
                    usedPostFormatAction = true;
                    postFormat = await globalService.findInModelPath({ modelPath, isFindById: false, isSingleResult: true });
                }
                else {
                    modelPath = [
                        {
                            model: MODEL_AGENT,
                            id: conversationStateObject.agent.id
                        },
                        {
                            model: MODEL_POST_FORMAT
                        }
                    ];
                    usedPostFormatAction = false;
                    postFormat = await globalService.findInModelPath({ modelPath, isFindById, isSingleResult, skip, limit, direction, field });
                }
                postFormatPayloadToUse = postFormat.postFormatPayload;
            }
            if (postFormatPayloadToUse) {
                try {
                    const compiledPostFormat = handlebars.compile(postFormatPayloadToUse);
                    const processedPostFormat = compiledPostFormat({ ...conversationStateObject, ...{ textResponse: cleanAgentToolResponse.textResponse } });
                    const processedPostFormatJson = JSON.parse(processedPostFormat);
                    //processedPostFormatJson.docId = cleanAgentToolResponse.docId;
                    /*if (!processedPostFormatJson.textResponse) {
                        processedPostFormatJson.textResponse = cleanAgentToolResponse.textResponse;
                    }*/
                    allProcessedPostFormat = { ...allProcessedPostFormat, ...processedPostFormatJson };
                    finalResponse = { ...cleanAgentToolResponse, ...processedPostFormatJson };
                }
                catch (error) {
                    const errorMessage = usedPostFormatAction ? 'Error formatting the post response using action POST format : ' : 'Error formatting the post response using agent POST format : ';
                    console.error(errorMessage, error);
                    const responseWithError = { ...{ postFormatting: errorMessage + error }, cleanAgentToolResponse };
                    finalResponse = responseWithError;
                }
            }
            else {
                finalResponse = cleanAgentToolResponse;
            }
            if (storeInQueue) {
                await storeDataInQueue({ conversationStateObject, action: conversationStateObject.action ? conversationStateObject.action.actionName : recognizedActionName, response: finalResponse, indexOfActionInQueue });
            }
            else {
                if (indexOfActionInQueue !== -1) {
                    await removeFromQueue({ conversationStateObject, action: conversationStateObject.action.actionName });
                }
                data.push(finalResponse);
            }
            if (cleanAgentToolResponse.actionWasFulfilled && cleanAgentToolResponse.actions && cleanAgentToolResponse.actions.length > 0) {
                context = await contextService.findBySession({ sessionId, loadFrames: true });
                conversationStateObject[CSO_CONTEXT] = context;
                await chainResponseActions({ conversationStateObject, responseActions: cleanAgentToolResponse.actions });
                await agentService.converseUpdateContextFrames({ id: conversationStateObject.context.id, frames: conversationStateObject.context.frames });
            }
            return data;
        }, Promise.resolve([]));
        
        let textResponses = _.map(responses, 'textResponse');
        //extract responses from previous answers
        const responsesFromQueue = getResponsesFromQueue({
            context: conversationStateObject.context
        });
        textResponses = textResponses.concat(responsesFromQueue);
        const textResponse = textResponses.join(' ');
        await saveContextQueues({ context: conversationStateObject.context });

        const converseResult = {
            textResponse,
            docId: conversationStateObject.docId,
            responses,
            ...allProcessedPostFormat
        };
        const { context, currentFrame, parse, docId } = conversationStateObject;
        const prunnedCSO = {
            docId,
            context,
            currentFrame,
            parse,
            webhooks
        };
        const fullConverseResult = {
            ...converseResult,
            conversationStateObject: prunnedCSO
        };

        documentService.update({ 
            id: conversationStateObject.docId,
            data: { 
                converseResult: JSON.stringify(fullConverseResult)
            }
        });
        conversationStateObject.context.docIds.push(converseResult.docId)
        contextService.update({
            sessionId: conversationStateObject.context.sessionId,
            data: {
                savedSlots: conversationStateObject.context.savedSlots,
                docIds: conversationStateObject.context.docIds
            }
        });

        return debug ? fullConverseResult : converseResult;
    }
    catch (error) {

        if (error.isParseError){
            if (error.missingCategories){
                return {
                    textResponse: 'I don\'t have any knowledge in my brain yet. Please teach me something.'
                }
            }
            if (error.missingTrainedCategories || error.missingTrainingAtAll){
                return {
                    textResponse: error.message
                }
            }
        }
        throw RedisErrorHandler({ error });
    }
};
