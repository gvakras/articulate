import Schmervice from 'schmervice';
import CreateFrame from './context/context.create-frame.service';
import Create from './context/context.create.service';
import UpdateFrameBySessionIdAndFrameId from './context/context.update-frame-by-session-and-frame.service';
import FindBySession from './context/context.find-by-session.service';
import FindDocsBySession from './context/context.find-docs-by-session.service';
import FindFramesBySession from './context/context.find-frames-by-session.service';
import FindFrameBySessionIdAndFrameId from './context/context.find-frame-by-session-and-frame.service';
import RemoveBySession from './context/context.remove-by-session.service';
import RemoveFramesBySessionId from './context/context.remove-frames-by-session.service';
import RemoveFramesBySessionIdAndFrameId from './context/context.remove-frames-by-session-and-frame.service';
import Update from './context/context.update.service';

module.exports = class ContextService extends Schmervice.Service {

    async create() {

        return await Create.apply(this, arguments);
    }

    async createFrame() {

        return await CreateFrame.apply(this, arguments);
    }

    async updateFrameBySessionAndFrame() {

        return await UpdateFrameBySessionIdAndFrameId.apply(this, arguments);
    }

    async update() {

        return await Update.apply(this, arguments);
    }

    async findBySession() {

        return await FindBySession.apply(this, arguments);
    }

    async findDocsBySession() {

        return await FindDocsBySession.apply(this, arguments);
    }

    async findFramesBySession() {

        return await FindFramesBySession.apply(this, arguments);
    }

    async findFrameBySessionAndFrame() {

        return await FindFrameBySessionIdAndFrameId.apply(this, arguments);
    }

    async createFrame() {

        return await CreateFrame.apply(this, arguments);
    }

    async removeBySession() {

        return await RemoveBySession.apply(this, arguments);
    }

    async removeFramesBySessionId() {

        return await RemoveFramesBySessionId.apply(this, arguments);
    }

    async removeFramesBySessionIdAndFrameId() {

        return await RemoveFramesBySessionIdAndFrameId.apply(this, arguments);
    }
};


