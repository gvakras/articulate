import Boom from 'boom';
import {
    PARAM_SESSION,
    ROUTE_CONTEXT
} from '../../../util/constants';
import ContextValidator from '../../validators/context.validator';

module.exports = {
    method: 'delete',
    path: `/${ROUTE_CONTEXT}/{${PARAM_SESSION}}`,
    options: {
        tags: ['api'],
        validate: ContextValidator.removeBySession,
        handler: async (request) => {

            const { contextService } = await request.services();
            const { [PARAM_SESSION]: sessionId } = request.params;
            try {
                return await contextService.removeBySession({ sessionId });
            }
            catch ({ message, statusCode }) {

                return new Boom(message, { statusCode });
            }
        }
    }
};

