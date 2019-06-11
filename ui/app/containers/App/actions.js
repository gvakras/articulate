/*
 *
 * App actions
 *
 */

import {
  ADD_ACTION,
  ADD_ACTION_ERROR,
  ADD_ACTION_NEW_SAYING,
  ADD_ACTION_RESPONSE,
  ADD_ACTION_SAYING,
  ADD_ACTION_SUCCESS,
  ADD_AGENT,
  ADD_AGENT_ERROR,
  ADD_AGENT_FALLBACK,
  ADD_AGENT_PARAMETER,
  ADD_AGENT_SUCCESS,
  ADD_CATEGORY_PARAMETER,
  ADD_FALLBACK,
  ADD_HEADER_ACTION_WEBHOOK,
  ADD_HEADER_AGENT_WEBHOOK,
  ADD_KEYWORD_EXAMPLE,
  ADD_MODIFIER_SAYING,
  ADD_MODIFIER_SAYING_SUCCESS,
  ADD_NEW_MODIFIER,
  ADD_NEW_SLOT,
  ADD_SAYING,
  ADD_SAYING_ERROR,
  ADD_SLOT_TEXT_PROMPT_SLOT,
  CHAIN_ACTION_TO_RESPONSE,
  CHANGE_ACTION_DATA,
  CHANGE_ACTION_NAME,
  CHANGE_ACTION_POST_FORMAT_DATA,
  CHANGE_ACTION_WEBHOOK_DATA,
  CHANGE_ACTION_WEBHOOK_PAYLOAD_TYPE,
  CHANGE_AGENT_DATA,
  CHANGE_AGENT_NAME,
  CHANGE_AGENT_PARAMETER_NAME,
  CHANGE_AGENT_PARAMETER_VALUE,
  CHANGE_AGENT_SETTINGS_DATA,
  CHANGE_CATEGORY_DATA,
  CHANGE_CATEGORY_PARAMETER_NAME,
  CHANGE_CATEGORY_PARAMETER_VALUE,
  CHANGE_CONNECTION_DATA,
  CHANGE_DETAIL_VALUE,
  CHANGE_EXAMPLE_NAME,
  CHANGE_EXAMPLE_SYNONYMS,
  CHANGE_HEADER_KEY_ACTION_WEBHOOK,
  CHANGE_HEADER_KEY_AGENT_WEBHOOK,
  CHANGE_HEADER_VALUE_ACTION_WEBHOOK,
  CHANGE_HEADER_VALUE_AGENT_WEBHOOK,
  CHANGE_KEYWORD_DATA,
  CHANGE_KEYWORDS_PAGE_SIZE,
  CHANGE_ACTIONS_PAGE_SIZE,
  CHANGE_LOCALE,
  CHANGE_MODIFIER_DATA,
  CHANGE_MODIFIER_NAME,
  CHANGE_MODIFIER_SAYINGS_PAGE_SIZE,
  CHANGE_POST_FORMAT_DATA,
  CHANGE_REVIEW_PAGE_SIZE,
  CHANGE_SAYING_CATEGORY,
  CHANGE_SAYINGS_PAGE_SIZE,
  CHANGE_SETTINGS_DATA,
  CHANGE_SLOT_DATA,
  CHANGE_SLOT_NAME,
  CHANGE_WEBHOOK_DATA,
  CHANGE_WEBHOOK_PAYLOAD_TYPE,
  CHECK_API,
  CLEAR_SAYING_TO_ACTION,
  CLOSE_NOTIFICATION,
  COPY_RESPONSE,
  COPY_SAYING,
  COPY_SAYING_ERROR,
  COPY_SAYING_SUCCESS,
  CREATE_CATEGORY,
  CREATE_CATEGORY_ERROR,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CONNECTION,
  CREATE_CONNECTION_ERROR,
  CREATE_CONNECTION_SUCCESS,
  CREATE_KEYWORD,
  CREATE_KEYWORD_ERROR,
  CREATE_KEYWORD_SUCCESS,
  DELETE_ACTION,
  DELETE_ACTION_ERROR,
  DELETE_ACTION_NEW_SAYING,
  DELETE_ACTION_RESPONSE,
  DELETE_ACTION_SAYING,
  DELETE_ACTION_SUCCESS,
  DELETE_AGENT,
  DELETE_AGENT_ERROR,
  DELETE_AGENT_FALLBACK,
  DELETE_AGENT_PARAMETER,
  DELETE_AGENT_SUCCESS,
  DELETE_CATEGORY,
  DELETE_CATEGORY_ERROR,
  DELETE_CATEGORY_PARAMETER,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CONNECTION,
  DELETE_CONNECTION_ERROR,
  DELETE_CONNECTION_SUCCESS,
  DELETE_FALLBACK,
  DELETE_HEADER_ACTION_WEBHOOK,
  DELETE_HEADER_AGENT_WEBHOOK,
  DELETE_KEYWORD,
  DELETE_KEYWORD_ERROR,
  DELETE_KEYWORD_EXAMPLE,
  DELETE_KEYWORD_SUCCESS,
  DELETE_MODIFIER,
  DELETE_MODIFIER_SAYING,
  DELETE_SAYING,
  DELETE_SAYING_ERROR,
  DELETE_SLOT,
  DELETE_SLOT_TEXT_PROMPT_SLOT,
  EDIT_ACTION_RESPONSE,
  EXPORT_AGENT,
  EXPORT_AGENT_ERROR,
  EXPORT_AGENT_SUCCESS,
  IMPORT_AGENT,
  IMPORT_AGENT_ERROR,
  IMPORT_AGENT_SUCCESS,
  LOAD_ACTION,
  LOAD_ACTION_ERROR,
  LOAD_ACTION_SUCCESS,
  LOAD_ACTIONS,
  LOAD_ACTIONS_ERROR,
  LOAD_ACTIONS_SUCCESS,
  LOAD_ACTIONS_PAGE,
  LOAD_ACTIONS_PAGE_ERROR,
  LOAD_ACTIONS_PAGE_SUCCESS,
  LOAD_AGENT,
  LOAD_AGENT_DOCUMENTS,
  LOAD_AGENT_DOCUMENTS_ERROR,
  LOAD_AGENT_DOCUMENTS_SUCCESS,
  LOAD_AGENT_ERROR,
  LOAD_AGENT_SUCCESS,
  LOAD_AGENTS,
  LOAD_AGENTS_ERROR,
  LOAD_AGENTS_SUCCESS,
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_ERROR,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORY,
  LOAD_CATEGORY_ERROR,
  LOAD_CATEGORY_SUCCESS,
  LOAD_CHANNELS,
  LOAD_CHANNELS_ERROR,
  LOAD_CHANNELS_SUCCESS,
  LOAD_CONNECTION,
  LOAD_CONNECTION_ERROR,
  LOAD_CONNECTION_SUCCESS,
  LOAD_CONNECTIONS,
  LOAD_CONNECTIONS_ERROR,
  LOAD_CONNECTIONS_SUCCESS,
  LOAD_FILTERED_ACTIONS,
  LOAD_FILTERED_ACTIONS_ERROR,
  LOAD_FILTERED_ACTIONS_SUCCESS,
  LOAD_FILTERED_CATEGORIES,
  LOAD_FILTERED_CATEGORIES_ERROR,
  LOAD_FILTERED_CATEGORIES_SUCCESS,
  LOAD_KEYWORD,
  LOAD_KEYWORD_ERROR,
  LOAD_KEYWORD_SUCCESS,
  LOAD_KEYWORDS,
  LOAD_KEYWORDS_ERROR,
  LOAD_KEYWORDS_SUCCESS,
  LOAD_SAYINGS,
  LOAD_SAYINGS_ERROR,
  LOAD_SAYINGS_SUCCESS,
  LOAD_SETTINGS,
  LOAD_SETTINGS_ERROR,
  LOAD_SETTINGS_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_ERROR,
  LOGOUT_USER_SUCCESS,
  RESET_ACTION_DATA,
  RESET_ACTIONS,
  RESET_AGENT_DATA,
  RESET_CATEGORY_DATA,
  RESET_CONNECTION_DATA,
  RESET_KEYWORD_DATA,
  RESET_MISSING_API,
  RESET_SESSION,
  RESET_SESSION_SUCCESS,
  RESET_STATUS_FLAGS,
  RESPOND_MESSAGE,
  SELECT_CATEGORY,
  SEND_MESSAGE,
  SEND_SAYING_TO_ACTION,
  SET_AGENT_DEFAULTS,
  SIGN_UP_USER,
  SIGN_UP_USER_ERROR,
  SIGN_UP_USER_SUCCESS,
  SORT_MODIFIERS,
  SORT_SLOTS,
  STORE_SOURCE_DATA,
  TAG_KEYWORD,
  TAG_MODIFIER_KEYWORD,
  TOGGLE_CONVERSATION_BAR,
  TRAIN_AGENT,
  TRAIN_AGENT_ERROR,
  UNCHAIN_ACTION_FROM_RESPONSE,
  UNTAG_KEYWORD,
  UNTAG_MODIFIER_KEYWORD,
  UPDATE_ACTION,
  UPDATE_ACTION_ERROR,
  UPDATE_ACTION_SUCCESS,
  UPDATE_AGENT,
  UPDATE_AGENT_ERROR,
  UPDATE_AGENT_SUCCESS,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_ERROR,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CONNECTION,
  UPDATE_CONNECTION_ERROR,
  UPDATE_CONNECTION_SUCCESS,
  UPDATE_KEYWORD,
  UPDATE_KEYWORD_ERROR,
  UPDATE_KEYWORD_SUCCESS,
  UPDATE_NEW_RESPONSE,
  UPDATE_SAYING_ERROR,
  UPDATE_SAYING_SUCCESS,
  UPDATE_SETTING,
  UPDATE_SETTING_ERROR,
  UPDATE_SETTING_SUCCESS,
  UPDATE_SETTINGS,
  UPDATE_SETTINGS_ERROR,
  UPDATE_SETTINGS_SUCCESS,
  LOAD_SESSION,
  LOAD_SESSION_ERROR,
  LOAD_SESSION_SUCCESS,
  DELETE_SESSION,
  DELETE_SESSION_SUCCESS,
  DELETE_SESSION_ERROR,
  SHOW_WARNING,
  LOAD_PREBUILT_CATEGORIES,
  LOAD_PREBUILT_CATEGORIES_ERROR,
  LOAD_PREBUILT_CATEGORIES_SUCCESS,
  IMPORT_CATEGORY,
  IMPORT_CATEGORY_ERROR,
  IMPORT_CATEGORY_SUCCESS,
  REFRESH_SERVER_INFO,
  LOAD_SERVER_INFO,
  LOAD_SERVER_INFO_ERROR,
  LOAD_SERVER_INFO_SUCCESS,
} from './constants';

/*
 * Global
 */

export function loadServerInfo() {
  return {
    type: LOAD_SERVER_INFO,
    apiCall: true,
  };
}

export function loadServerInfoError(error) {
  return {
    type: LOAD_SERVER_INFO_ERROR,
    error,
  };
}

export function loadServerInfoSuccess(server) {
  return {
    type: LOAD_SERVER_INFO_SUCCESS,
    server,
  };
}

export function refreshServerInfo(server) {
  return {
    type: REFRESH_SERVER_INFO,
    server,
  };
}

export function loadSession(sessionId, newSession) {
  return {
    type: LOAD_SESSION,
    apiCall: true,
    sessionId,
    newSession,
  };
}

export function loadSessionSuccess(sessionId) {
  return {
    type: LOAD_SESSION_SUCCESS,
    sessionId,
  };
}

export function loadSessionError(error) {
  return {
    type: LOAD_SESSION_ERROR,
    error,
  };
}

export function deleteSession(sessionId, clearSessionId) {
  return {
    apiCall: true,
    type: DELETE_SESSION,
    sessionId,
    clearSessionId,
  };
}

export function deleteSessionSuccess() {
  return {
    type: DELETE_SESSION_SUCCESS,
  };
}

export function deleteSessionError(error) {
  return {
    type: DELETE_SESSION_ERROR,
    error,
  };
}

export function checkAPI(refURL) {
  return {
    type: CHECK_API,
    apiCall: true,
    refURL,
  };
}

export function resetMissingAPI() {
  return {
    type: RESET_MISSING_API,
  };
}

export function resetStatusFlag() {
  return {
    type: RESET_STATUS_FLAGS,
  };
}

export function toggleConversationBar(value) {
  return {
    type: TOGGLE_CONVERSATION_BAR,
    value,
    apiCall: true,
  };
}

export function closeNotification(index) {
  return {
    type: CLOSE_NOTIFICATION,
    index,
  };
}

export function sendMessage(message) {
  return {
    type: SEND_MESSAGE,
    apiCall: true,
    message,
  };
}

export function respondMessage(message) {
  return {
    type: RESPOND_MESSAGE,
    message,
  };
}

export function storeSourceData(conversationStateObject) {
  return {
    type: STORE_SOURCE_DATA,
    conversationStateObject,
  };
}

export function resetSession() {
  return {
    type: RESET_SESSION,
    apiCall: true,
  };
}

export function resetSessionSuccess() {
  return {
    type: RESET_SESSION_SUCCESS,
  };
}

export function showWarning(message) {
  return {
    type: SHOW_WARNING,
    message,
  };
}

/*
 * Connections
 */
export function loadConnections() {
  return {
    type: LOAD_CONNECTIONS,
    apiCall: true,
  };
}

export function loadConnectionsError(error) {
  return {
    type: LOAD_CONNECTIONS_ERROR,
    error,
  };
}

export function loadConnectionsSuccess(connections) {
  return {
    type: LOAD_CONNECTIONS_SUCCESS,
    connections,
  };
}

export function loadChannels() {
  return {
    type: LOAD_CHANNELS,
    apiCall: true,
  };
}

export function loadChannelsError(error) {
  return {
    type: LOAD_CHANNELS_ERROR,
    error,
  };
}

export function loadChannelsSuccess(channels) {
  return {
    type: LOAD_CHANNELS_SUCCESS,
    channels,
  };
}

/*
 * Agents
 */
export function loadAgents() {
  return {
    type: LOAD_AGENTS,
    apiCall: true,
  };
}

export function loadAgentsError(error) {
  return {
    type: LOAD_AGENTS_ERROR,
    error,
  };
}

export function loadAgentsSuccess(agents) {
  return {
    type: LOAD_AGENTS_SUCCESS,
    agents,
  };
}

export function exportAgent(id) {
  return {
    type: EXPORT_AGENT,
    apiCall: true,
    id,
  };
}

export function exportAgentError(error) {
  return {
    type: EXPORT_AGENT_ERROR,
    error,
  };
}

export function exportAgentSuccess(agent) {
  return {
    type: EXPORT_AGENT_SUCCESS,
    agent,
  };
}

export function importAgent(agent) {
  return {
    type: IMPORT_AGENT,
    apiCall: true,
    agent,
  };
}

export function importAgentError(error) {
  return {
    type: IMPORT_AGENT_ERROR,
    error,
  };
}

export function importAgentSuccess(agent) {
  return {
    type: IMPORT_AGENT_SUCCESS,
    agent,
  };
}

/*
 * Agent
 */

export function resetAgentData(ref) {
  return {
    type: RESET_AGENT_DATA,
    ref,
  };
}

export function loadAgent(agentId) {
  return {
    type: LOAD_AGENT,
    agentId,
    apiCall: true,
  };
}

export function loadAgentError(error) {
  return {
    type: LOAD_AGENT_ERROR,
    error,
  };
}

export function loadAgentSuccess(payload) {
  return {
    type: LOAD_AGENT_SUCCESS,
    payload,
  };
}

export function setAgentDefaults() {
  return {
    type: SET_AGENT_DEFAULTS,
  };
}

export function changeAgentData(payload) {
  return {
    type: CHANGE_AGENT_DATA,
    payload,
  };
}

export function changeAgentName(payload) {
  return {
    type: CHANGE_AGENT_NAME,
    payload,
  };
}

export function changeCategoryClassifierThreshold(value) {
  return {
    type: CHANGE_AGENT_DATA,
    payload: {
      field: 'categoryClassifierThreshold',
      value: parseInt(value),
    },
  };
}

export function addAgentFallbackResponse(newFallback) {
  return {
    type: ADD_AGENT_FALLBACK,
    newFallback,
  };
}

export function deleteAgentFallbackResponse(fallbackIndex) {
  return {
    type: DELETE_AGENT_FALLBACK,
    fallbackIndex,
  };
}

export function changeWebhookData(payload) {
  return {
    type: CHANGE_WEBHOOK_DATA,
    payload,
  };
}

export function changeWebhookPayloadType(payload) {
  return {
    type: CHANGE_WEBHOOK_PAYLOAD_TYPE,
    payload,
  };
}

export function changePostFormatData(payload) {
  return {
    type: CHANGE_POST_FORMAT_DATA,
    payload,
  };
}

export function changeAgentSettingsData(payload) {
  return {
    type: CHANGE_AGENT_SETTINGS_DATA,
    payload,
  };
}

export function addAgent() {
  return {
    type: ADD_AGENT,
    apiCall: true,
  };
}

export function addAgentError() {
  return {
    type: ADD_AGENT_ERROR,
  };
}

export function addAgentSuccess(agent) {
  return {
    type: ADD_AGENT_SUCCESS,
    agent,
  };
}

export function updateAgent() {
  return {
    type: UPDATE_AGENT,
    apiCall: true,
  };
}

export function updateAgentError() {
  return {
    type: UPDATE_AGENT_ERROR,
  };
}

export function updateAgentSuccess(agent) {
  return {
    type: UPDATE_AGENT_SUCCESS,
    agent,
  };
}

export function deleteAgent(id) {
  return {
    type: DELETE_AGENT,
    id,
    apiCall: true,
  };
}

export function deleteAgentError() {
  return {
    type: DELETE_AGENT_ERROR,
  };
}

export function deleteAgentSuccess() {
  return {
    type: DELETE_AGENT_SUCCESS,
  };
}

export function trainAgent() {
  return {
    type: TRAIN_AGENT,
    apiCall: true,
  };
}

export function trainAgentError(error) {
  return {
    type: TRAIN_AGENT_ERROR,
    error,
  };
}

export function addNewHeaderAgentWebhook(payload) {
  return {
    type: ADD_HEADER_AGENT_WEBHOOK,
    payload,
  };
}

export function deleteHeaderAgentWebhook(headerIndex) {
  return {
    type: DELETE_HEADER_AGENT_WEBHOOK,
    headerIndex,
  };
}

export function changeHeaderNameAgentWebhook(headerIndex, value) {
  return {
    type: CHANGE_HEADER_KEY_AGENT_WEBHOOK,
    headerIndex,
    value,
  };
}

export function changeHeaderValueAgentWebhook(headerIndex, value) {
  return {
    type: CHANGE_HEADER_VALUE_AGENT_WEBHOOK,
    headerIndex,
    value,
  };
}

export function addNewAgentParameter(payload) {
  return {
    type: ADD_AGENT_PARAMETER,
    payload,
  };
}

export function deleteAgentParameter(parameterName) {
  return {
    type: DELETE_AGENT_PARAMETER,
    parameterName,
  };
}

export function changeAgentParameterName(oldParameterName, newParameterName) {
  return {
    type: CHANGE_AGENT_PARAMETER_NAME,
    oldParameterName,
    newParameterName,
  };
}

export function changeAgentParameterValue(parameterName, value) {
  return {
    type: CHANGE_AGENT_PARAMETER_VALUE,
    parameterName,
    value,
  };
}

export function loadAgentDocuments(page, pageSize, field, direction) {
  return {
    type: LOAD_AGENT_DOCUMENTS,
    apiCall: true,
    page,
    pageSize,
    field,
    direction,
  };
}

export function loadAgentDocumentsError(error) {
  return {
    type: LOAD_AGENT_DOCUMENTS_ERROR,
    error,
  };
}

export function loadAgentDocumentsSuccess(documents) {
  return {
    type: LOAD_AGENT_DOCUMENTS_SUCCESS,
    documents,
  };
}

/*
 * Sayings
 */
export function loadSayings(filter, page, pageSize) {
  return {
    type: LOAD_SAYINGS,
    apiCall: true,
    filter,
    page,
    pageSize,
  };
}

export function loadSayingsError(error) {
  return {
    type: LOAD_SAYINGS_ERROR,
    error,
  };
}

export function loadSayingsSuccess(sayings) {
  return {
    type: LOAD_SAYINGS_SUCCESS,
    sayings,
  };
}

export function addSaying(filter, page, pageSize, value) {
  return {
    type: ADD_SAYING,
    apiCall: true,
    value,
    pageSize,
    filter,
    page,
  };
}

export function copySaying({ userSays, keywords = [], categoryId, actions }) {
  return {
    type: COPY_SAYING,
    apiCall: true,
    userSays,
    keywords,
    categoryId,
    actions,
  };
}

export function copySayingError(error) {
  return {
    type: COPY_SAYING_ERROR,
    error,
  };
}

export function copySayingSuccess(saying) {
  return {
    type: COPY_SAYING_SUCCESS,
    saying,
  };
}

export function addSayingError(error) {
  return {
    type: ADD_SAYING_ERROR,
    error,
  };
}

export function deleteSaying(filter, page, pageSize, sayingId, categoryId) {
  return {
    type: DELETE_SAYING,
    apiCall: true,
    sayingId,
    categoryId,
    filter,
    page,
    pageSize,
  };
}

export function deleteSayingError(error) {
  return {
    type: DELETE_SAYING_ERROR,
    error,
  };
}

export function changeSayingCategory(
  filter,
  page,
  pageSize,
  saying,
  categoryId,
) {
  return {
    type: CHANGE_SAYING_CATEGORY,
    apiCall: true,
    saying,
    categoryId,
    filter,
    page,
    pageSize,
  };
}

export function tagKeyword(
  filter,
  page,
  pageSize,
  saying,
  value,
  start,
  end,
  keywordId,
  keywordName,
) {
  return {
    type: TAG_KEYWORD,
    apiCall: true,
    filter,
    page,
    pageSize,
    saying,
    value,
    start,
    end,
    keywordId,
    keywordName,
  };
}

export function untagKeyword(filter, page, pageSize, saying, start, end) {
  return {
    type: UNTAG_KEYWORD,
    apiCall: true,
    filter,
    page,
    pageSize,
    saying,
    start,
    end,
  };
}

export function updateSayingSuccess(saying) {
  return {
    type: UPDATE_SAYING_SUCCESS,
    saying,
  };
}

export function updateSayingError(error) {
  return {
    type: UPDATE_SAYING_ERROR,
    error,
  };
}

export function addActionSaying(filter, page, pageSize, saying, actionName) {
  return {
    type: ADD_ACTION_SAYING,
    apiCall: true,
    filter,
    page,
    pageSize,
    saying,
    actionName,
  };
}

export function deleteActionSaying(filter, page, pageSize, saying, actionName) {
  return {
    type: DELETE_ACTION_SAYING,
    apiCall: true,
    filter,
    page,
    pageSize,
    saying,
    actionName,
  };
}

export function addActionNewSaying(actionName) {
  return {
    type: ADD_ACTION_NEW_SAYING,
    actionName,
  };
}

export function deleteActionNewSaying(actionName) {
  return {
    type: DELETE_ACTION_NEW_SAYING,
    actionName,
  };
}

export function clearSayingToAction() {
  return {
    type: CLEAR_SAYING_TO_ACTION,
  };
}

export function sendSayingToAction(saying) {
  return {
    type: SEND_SAYING_TO_ACTION,
    saying,
  };
}

export function loadCategories() {
  return {
    type: LOAD_CATEGORIES,
    apiCall: true,
  };
}

export function loadCategoriesError(error) {
  return {
    type: LOAD_CATEGORIES_ERROR,
    error,
  };
}

export function loadCategoriesSuccess(categories) {
  return {
    type: LOAD_CATEGORIES_SUCCESS,
    categories,
  };
}

export function loadPrebuiltCategories() {
  return {
    type: LOAD_PREBUILT_CATEGORIES,
    apiCall: true,
  };
}

export function loadPrebuiltCategoriesError(error) {
  return {
    type: LOAD_PREBUILT_CATEGORIES_ERROR,
    error,
  };
}

export function loadPrebuiltCategoriesSuccess(prebuiltCategories) {
  return {
    type: LOAD_PREBUILT_CATEGORIES_SUCCESS,
    prebuiltCategories,
  };
}

export function importCategory(category) {
  return {
    type: IMPORT_CATEGORY,
    category,
    apiCall: true,
  };
}

export function importCategoryError(error) {
  return {
    type: IMPORT_CATEGORY_ERROR,
    error,
  };
}

export function importCategorySuccess() {
  return {
    type: IMPORT_CATEGORY_SUCCESS,
  };
}

export function loadFilteredCategories(filter) {
  return {
    type: LOAD_FILTERED_CATEGORIES,
    filter,
    apiCall: true,
  };
}

export function loadFilteredCategoriesError(error) {
  return {
    type: LOAD_FILTERED_CATEGORIES_ERROR,
    error,
  };
}

export function loadFilteredCategoriesSuccess(categories) {
  return {
    type: LOAD_FILTERED_CATEGORIES_SUCCESS,
    categories,
  };
}

export function loadFilteredActions(filter) {
  return {
    type: LOAD_FILTERED_ACTIONS,
    filter,
    apiCall: true,
  };
}

export function loadFilteredActionsError(error) {
  return {
    type: LOAD_FILTERED_ACTIONS_ERROR,
    error,
  };
}

export function loadFilteredActionsuccess(actions) {
  return {
    type: LOAD_FILTERED_ACTIONS_SUCCESS,
    actions,
  };
}

export function selectCategory(categoryName) {
  return {
    type: SELECT_CATEGORY,
    categoryName,
  };
}

export function changeSayingsPageSize(agentId, pageSize) {
  return {
    apiCall: true,
    type: CHANGE_SAYINGS_PAGE_SIZE,
    agentId,
    pageSize,
  };
}

/*
 * Keywords
 */
export function loadKeywords(filter, page, pageSize) {
  return {
    type: LOAD_KEYWORDS,
    apiCall: true,
    filter,
    page,
    pageSize,
  };
}

export function loadKeywordsError(error) {
  return {
    type: LOAD_KEYWORDS_ERROR,
    error,
  };
}

export function loadKeywordsSuccess(keywords) {
  return {
    type: LOAD_KEYWORDS_SUCCESS,
    keywords,
  };
}

export function deleteKeyword(id) {
  return {
    type: DELETE_KEYWORD,
    apiCall: true,
    id,
  };
}

export function deleteKeywordSuccess() {
  return {
    type: DELETE_KEYWORD_SUCCESS,
  };
}

export function deleteKeywordError(error) {
  return {
    type: DELETE_KEYWORD_ERROR,
    error,
  };
}

export function changeKeywordsPageSize(agentId, pageSize) {
  return {
    apiCall: true,
    type: CHANGE_KEYWORDS_PAGE_SIZE,
    agentId,
    pageSize,
  };
}

/*
 * Settings
 */
export function loadSettings() {
  return {
    type: LOAD_SETTINGS,
    apiCall: true,
  };
}

export function loadSettingsError(error) {
  return {
    type: LOAD_SETTINGS_ERROR,
    error,
  };
}

export function loadSettingsSuccess(settings) {
  return {
    type: LOAD_SETTINGS_SUCCESS,
    settings,
  };
}

export function updateSettings() {
  return {
    type: UPDATE_SETTINGS,
    apiCall: true,
  };
}

export function updateSettingsError(error) {
  return {
    type: UPDATE_SETTINGS_ERROR,
    error,
  };
}

export function updateSettingsSuccess() {
  return {
    type: UPDATE_SETTINGS_SUCCESS,
  };
}

export function updateSetting(setting, value) {
  return {
    type: UPDATE_SETTING,
    apiCall: true,
    setting,
    value,
  };
}

export function updateSettingError(error) {
  return {
    type: UPDATE_SETTING_ERROR,
    error,
  };
}

export function updateSettingSuccess(payload) {
  return {
    type: UPDATE_SETTING_SUCCESS,
    payload,
  };
}

export function changeSettingsData(payload) {
  return {
    type: CHANGE_SETTINGS_DATA,
    payload,
  };
}

export function addFallbackResponse(newFallback) {
  return {
    type: ADD_FALLBACK,
    newFallback,
  };
}

export function deleteFallbackResponse(fallbackIndex) {
  return {
    type: DELETE_FALLBACK,
    fallbackIndex,
  };
}

/*
 * Actions
 */

export function changeActionsPageSize(agentId, pageSize) {
  return {
    apiCall: true,
    type: CHANGE_ACTIONS_PAGE_SIZE,
    agentId,
    pageSize,
  };
}

export function loadActionsPage(filter, page, pageSize) {
  return {
    type: LOAD_ACTIONS_PAGE,
    apiCall: true,
    filter,
    page,
    pageSize,
  };
}

export function loadActionsPageError(error) {
  return {
    type: LOAD_ACTIONS_PAGE_ERROR,
    error,
  };
}

export function loadActionsPageSuccess(actions) {
  return {
    type: LOAD_ACTIONS_PAGE_SUCCESS,
    actions,
  };
}

export function resetActionData() {
  return {
    type: RESET_ACTION_DATA,
  };
}

export function resetActions() {
  return {
    type: RESET_ACTIONS,
  };
}

export function loadActions(agentId) {
  return {
    type: LOAD_ACTIONS,
    apiCall: true,
    agentId,
  };
}

export function loadActionsError(error) {
  return {
    type: LOAD_ACTIONS_ERROR,
    error,
  };
}

export function loadActionsSuccess(actions) {
  return {
    type: LOAD_ACTIONS_SUCCESS,
    actions,
  };
}

export function loadAction(actionId, isDuplicate) {
  return {
    type: LOAD_ACTION,
    actionId,
    isDuplicate,
    apiCall: true,
  };
}

export function loadActionError(error) {
  return {
    type: LOAD_ACTION_ERROR,
    error,
  };
}

export function loadActionSuccess(payload) {
  return {
    type: LOAD_ACTION_SUCCESS,
    payload,
  };
}

export function changeActionName(payload) {
  return {
    type: CHANGE_ACTION_NAME,
    payload,
  };
}

export function changeActionData(payload) {
  return {
    type: CHANGE_ACTION_DATA,
    payload,
  };
}

export function addActionResponse(newResponse) {
  return {
    type: ADD_ACTION_RESPONSE,
    newResponse,
  };
}

export function deleteActionResponse(responseIndex) {
  return {
    type: DELETE_ACTION_RESPONSE,
    responseIndex,
  };
}

export function chainActionToResponse(responseIndex, actionName) {
  return {
    type: CHAIN_ACTION_TO_RESPONSE,
    responseIndex,
    actionName,
  };
}

export function unchainActionFromResponse(responseIndex, actionIndex) {
  return {
    type: UNCHAIN_ACTION_FROM_RESPONSE,
    responseIndex,
    actionIndex,
  };
}

export function copyResponse(response) {
  return {
    type: COPY_RESPONSE,
    response,
  };
}

export function updateNewResponse(response) {
  return {
    type: UPDATE_NEW_RESPONSE,
    response,
  };
}

export function changeActionWebhookData(payload) {
  return {
    type: CHANGE_ACTION_WEBHOOK_DATA,
    payload,
  };
}

export function changeActionWebhookPayloadType(payload) {
  return {
    type: CHANGE_ACTION_WEBHOOK_PAYLOAD_TYPE,
    payload,
  };
}

export function changeActionPostFormatData(payload) {
  return {
    type: CHANGE_ACTION_POST_FORMAT_DATA,
    payload,
  };
}

export function addAction(addToNewSayingActions) {
  return {
    type: ADD_ACTION,
    apiCall: true,
    addToNewSayingActions,
  };
}

export function addActionError() {
  return {
    type: ADD_ACTION_ERROR,
  };
}

export function addActionSuccess(payload) {
  return {
    type: ADD_ACTION_SUCCESS,
    payload,
  };
}

export function updateAction() {
  return {
    type: UPDATE_ACTION,
    apiCall: true,
  };
}

export function updateActionError() {
  return {
    type: UPDATE_ACTION_ERROR,
  };
}

export function updateActionSuccess(action, oldActionName) {
  return {
    type: UPDATE_ACTION_SUCCESS,
    action,
    oldActionName,
  };
}

export function deleteAction(id, actionName, redirectUrl) {
  return {
    type: DELETE_ACTION,
    apiCall: true,
    id,
    actionName,
    redirectUrl,
  };
}

export function deleteActionError(error) {
  return {
    type: DELETE_ACTION_ERROR,
    error,
  };
}

export function deleteActionSuccess() {
  return {
    type: DELETE_ACTION_SUCCESS,
  };
}

export function addNewHeaderActionWebhook(payload) {
  return {
    type: ADD_HEADER_ACTION_WEBHOOK,
    payload,
  };
}

export function deleteHeaderActionWebhook(headerIndex) {
  return {
    type: DELETE_HEADER_ACTION_WEBHOOK,
    headerIndex,
  };
}

export function changeHeaderNameActionWebhook(headerIndex, value) {
  return {
    type: CHANGE_HEADER_KEY_ACTION_WEBHOOK,
    headerIndex,
    value,
  };
}

export function changeHeaderValueActionWebhook(headerIndex, value) {
  return {
    type: CHANGE_HEADER_VALUE_ACTION_WEBHOOK,
    headerIndex,
    value,
  };
}

export function addNewSlot() {
  return {
    type: ADD_NEW_SLOT,
  };
}

export function changeSlotName(payload) {
  return {
    type: CHANGE_SLOT_NAME,
    payload,
  };
}

export function changeSlotData(payload) {
  return {
    type: CHANGE_SLOT_DATA,
    payload,
  };
}

export function addSlotTextPrompt(payload) {
  return {
    type: ADD_SLOT_TEXT_PROMPT_SLOT,
    payload,
  };
}

export function deleteSlotTextPrompt(payload) {
  return {
    type: DELETE_SLOT_TEXT_PROMPT_SLOT,
    payload,
  };
}

export function sortSlots(oldIndex, newIndex) {
  return {
    type: SORT_SLOTS,
    oldIndex,
    newIndex,
  };
}

export function deleteSlot(slotIndex) {
  return {
    type: DELETE_SLOT,
    slotIndex,
  };
}

export function editActionResponse(newResponse, responseIndex) {
  return {
    type: EDIT_ACTION_RESPONSE,
    newResponse,
    responseIndex,
  };
}

/* Keyword */
export function resetKeywordData() {
  return {
    type: RESET_KEYWORD_DATA,
  };
}

export function loadKeyword(id) {
  return {
    type: LOAD_KEYWORD,
    apiCall: true,
    id,
  };
}

export function loadKeywordError(error) {
  return {
    type: LOAD_KEYWORD_ERROR,
    error,
  };
}

export function loadKeywordSuccess(keyword) {
  return {
    type: LOAD_KEYWORD_SUCCESS,
    keyword,
  };
}

export function createKeyword() {
  return {
    type: CREATE_KEYWORD,
    apiCall: true,
  };
}

export function createKeywordError(error) {
  return {
    type: CREATE_KEYWORD_ERROR,
    error,
  };
}

export function createKeywordSuccess(keyword) {
  return {
    type: CREATE_KEYWORD_SUCCESS,
    keyword,
  };
}

export function updateKeyword() {
  return {
    type: UPDATE_KEYWORD,
    apiCall: true,
  };
}

export function updateKeywordError(error) {
  return {
    type: UPDATE_KEYWORD_ERROR,
    error,
  };
}

export function updateKeywordSuccess(keyword) {
  return {
    type: UPDATE_KEYWORD_SUCCESS,
    keyword,
  };
}

export function changeKeywordData(payload) {
  return {
    type: CHANGE_KEYWORD_DATA,
    payload,
  };
}

export function addKeywordExample(newExample) {
  return {
    type: ADD_KEYWORD_EXAMPLE,
    newExample,
  };
}

export function deleteKeywordExample(exampleIndex) {
  return {
    type: DELETE_KEYWORD_EXAMPLE,
    exampleIndex,
  };
}

export function changeExampleName(exampleIndex, name) {
  return {
    type: CHANGE_EXAMPLE_NAME,
    exampleIndex,
    name,
  };
}

export function changeExampleSynonyms(exampleIndex, synonyms) {
  return {
    type: CHANGE_EXAMPLE_SYNONYMS,
    exampleIndex,
    synonyms,
  };
}

export function addNewModifier() {
  return {
    type: ADD_NEW_MODIFIER,
  };
}

export function changeModifierName(payload) {
  return {
    type: CHANGE_MODIFIER_NAME,
    payload,
  };
}

export function changeModifierData(payload) {
  return {
    type: CHANGE_MODIFIER_DATA,
    payload,
  };
}

export function addModifierSaying(modifierIndex, newSaying) {
  return {
    type: ADD_MODIFIER_SAYING,
    modifierIndex,
    newSaying,
    apiCall: true,
  };
}

export function addModifierSayingSuccess(modifierIndex, newSaying, keywords) {
  return {
    type: ADD_MODIFIER_SAYING_SUCCESS,
    modifierIndex,
    newSaying,
    keywords,
  };
}

export function deleteModifierSaying(payload) {
  return {
    type: DELETE_MODIFIER_SAYING,
    payload,
  };
}

export function sortModifiers(oldIndex, newIndex) {
  return {
    type: SORT_MODIFIERS,
    oldIndex,
    newIndex,
  };
}

export function deleteModifier(modifierIndex) {
  return {
    type: DELETE_MODIFIER,
    modifierIndex,
  };
}

export function tagModifierKeyword(
  modifierIndex,
  sayingIndex,
  value,
  start,
  end,
  keywordId,
  keywordName,
) {
  return {
    type: TAG_MODIFIER_KEYWORD,
    modifierIndex,
    sayingIndex,
    value,
    start,
    end,
    keywordId,
    keywordName,
  };
}

export function untagModifierKeyword(modifierIndex, sayingIndex, start, end) {
  return {
    type: UNTAG_MODIFIER_KEYWORD,
    modifierIndex,
    sayingIndex,
    start,
    end,
  };
}

export function onChangeModifiersSayingsPageSize(agentId, pageSize) {
  return {
    apiCall: true,
    type: CHANGE_MODIFIER_SAYINGS_PAGE_SIZE,
    agentId,
    pageSize,
  };
}

/* Category */
export function resetCategoryData() {
  return {
    type: RESET_CATEGORY_DATA,
  };
}

export function loadCategory(id) {
  return {
    type: LOAD_CATEGORY,
    apiCall: true,
    id,
  };
}

export function loadCategoryError(error) {
  return {
    type: LOAD_CATEGORY_ERROR,
    error,
  };
}

export function loadCategorySuccess(category) {
  return {
    type: LOAD_CATEGORY_SUCCESS,
    category,
  };
}

export function createCategory() {
  return {
    type: CREATE_CATEGORY,
    apiCall: true,
  };
}

export function createCategoryError(error) {
  return {
    type: CREATE_CATEGORY_ERROR,
    error,
  };
}

export function createCategorySuccess(category) {
  return {
    type: CREATE_CATEGORY_SUCCESS,
    category,
  };
}

export function updateCategory() {
  return {
    type: UPDATE_CATEGORY,
    apiCall: true,
  };
}

export function updateCategoryError(error) {
  return {
    type: UPDATE_CATEGORY_ERROR,
    error,
  };
}

export function updateCategorySuccess(category) {
  return {
    type: UPDATE_CATEGORY_SUCCESS,
    category,
  };
}

export function changeCategoryData(payload) {
  return {
    type: CHANGE_CATEGORY_DATA,
    payload,
  };
}

export function changeActionThreshold(value) {
  return {
    type: CHANGE_CATEGORY_DATA,
    payload: {
      field: 'actionThreshold',
      value: parseInt(value),
    },
  };
}

export function deleteCategory(id) {
  return {
    type: DELETE_CATEGORY,
    id,
    apiCall: true,
  };
}

export function deleteCategoryError(error) {
  return {
    type: DELETE_CATEGORY_ERROR,
    error,
  };
}

export function deleteCategorySuccess() {
  return {
    type: DELETE_CATEGORY_SUCCESS,
  };
}

export function addNewCategoryParameter(payload) {
  return {
    type: ADD_CATEGORY_PARAMETER,
    payload,
  };
}

export function deleteCategoryParameter(parameterName) {
  return {
    type: DELETE_CATEGORY_PARAMETER,
    parameterName,
  };
}

export function changeCategoryParameterName(
  oldParameterName,
  newParameterName,
) {
  return {
    type: CHANGE_CATEGORY_PARAMETER_NAME,
    oldParameterName,
    newParameterName,
  };
}

export function changeCategoryParameterValue(parameterName, value) {
  return {
    type: CHANGE_CATEGORY_PARAMETER_VALUE,
    parameterName,
    value,
  };
}

/* Review */

export function changeReviewPageSize(agentId, pageSize) {
  return {
    apiCall: true,
    type: CHANGE_REVIEW_PAGE_SIZE,
    agentId,
    pageSize,
  };
}

/* Locale */
export function changeLocale(languageLocale) {
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  };
}

/* Connection */
export function changeConnectionData(payload) {
  return {
    type: CHANGE_CONNECTION_DATA,
    payload,
  };
}

export function loadConnection(id) {
  return {
    type: LOAD_CONNECTION,
    id,
    apiCall: true,
  };
}

export function loadConnectionError(error) {
  return {
    type: LOAD_CONNECTION_ERROR,
    error,
  };
}

export function loadConnectionSuccess(connection) {
  return {
    type: LOAD_CONNECTION_SUCCESS,
    connection,
  };
}

export function resetConnectionData() {
  return {
    type: RESET_CONNECTION_DATA,
  };
}

export function createConnection() {
  return {
    type: CREATE_CONNECTION,
    apiCall: true,
  };
}

export function createConnectionError(error) {
  return {
    type: CREATE_CONNECTION_ERROR,
    error,
  };
}

export function createConnectionSuccess(connection) {
  return {
    type: CREATE_CONNECTION_SUCCESS,
    connection,
  };
}

export function updateConnection() {
  return {
    type: UPDATE_CONNECTION,
    apiCall: true,
  };
}

export function updateConnectionError(error) {
  return {
    type: UPDATE_CONNECTION_ERROR,
    error,
  };
}

export function updateConnectionSuccess(connection) {
  return {
    type: UPDATE_CONNECTION_SUCCESS,
    connection,
  };
}

export function changeDetailValue(detail, value) {
  return {
    type: CHANGE_DETAIL_VALUE,
    detail,
    value,
  };
}

export function deleteConnection(id) {
  return {
    type: DELETE_CONNECTION,
    apiCall: true,
    id,
  };
}

export function deleteConnectionSuccess() {
  return {
    type: DELETE_CONNECTION_SUCCESS,
  };
}

export function deleteConnectionError(error) {
  return {
    type: DELETE_CONNECTION_ERROR,
    error,
  };
}

export function loginUser(username, password) {
  return {
    type: LOGIN_USER,
    apiCall: true,
    username,
    password,
  };
}

export function loginUserSuccess() {
  return {
    type: LOGIN_USER_SUCCESS,
  };
}

export function loginUserError(error) {
  return {
    type: LOGIN_USER_ERROR,
    error,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    apiCall: true,
  };
}

export function logoutUserSuccess() {
  return {
    type: LOGOUT_USER_SUCCESS,
  };
}

export function logoutUserError(error) {
  return {
    type: LOGOUT_USER_ERROR,
    error,
  };
}

export function signUpUser(name, lastName, username, password) {
  return {
    type: SIGN_UP_USER,
    apiCall: true,
    name,
    lastName,
    username,
    password,
  };
}

export function signUpUserSuccess() {
  return {
    type: SIGN_UP_USER_SUCCESS,
  };
}

export function signUpUserError(error) {
  return {
    type: SIGN_UP_USER_ERROR,
    error,
  };
}
