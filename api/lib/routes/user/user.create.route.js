import Boom from 'boom';
import { ROUTE_USER } from '../../../util/constants';
import UserValidator from '../../validators/user.validator';

//const logger = require('../../../util/logger')({ name: `route:agent:create` });

module.exports = {
    method: 'post',
    path: `/${ROUTE_USER}`,
    options: {
        tags: ['api'],
        validate: UserValidator.create,
        handler: async (request) => {

            const { userService } = await request.services();
            try {
                return await userService.create({ data: request.payload });
            }
            catch ({ message, statusCode }) {
                return new Boom(message, { statusCode });
            }
        }
    }
};
