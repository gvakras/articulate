import _ from 'lodash';

const Routes = require('require-dir')('./user');

module.exports = [
    ..._.values(Routes)
];
