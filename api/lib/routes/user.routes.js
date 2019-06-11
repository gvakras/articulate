import _ from 'lodash';
import {
    MODEL_USER_ACCOUNT,
    MODEL_USER_IDENTITY,
    ROUTE_USER_ACCOUNT
} from '../../util/constants';
import GlobalFindAll from './global/global.find-all.route';
import GlobalFindInModelPath from './global/global.find-in-model-path.route';
import GlobalSearchByField from './global/global.search-by-field.route';

const Routes = require('require-dir')('./user');

module.exports = [
    ..._.values(Routes),
    GlobalFindAll({ ROUTE: ROUTE_USER_ACCOUNT }),
    GlobalSearchByField({ ROUTE: ROUTE_USER_ACCOUNT }),
    GlobalFindInModelPath({ models: [MODEL_USER_ACCOUNT, MODEL_USER_IDENTITY] })

];
