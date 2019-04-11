import { MODEL_USER_IDENTITY } from '../../../util/constants';
import RedisErrorHandler from '../../errors/redis.error-handler';

module.exports = async function ({ data, parent = null, returnModel = false }) {

    const { redis } = this.server.app;
    const model = await redis.factory(MODEL_USER_IDENTITY);
    try {
        await model.createInstance({ data });
        //TODO: Check if account already have an identity of that provider
        await parent.link(model, MODEL_USER_IDENTITY);
        await parent.save();
        return returnModel ? model : model.allProperties();
    }
    catch (error) {
        throw RedisErrorHandler({ error });
    }
};
