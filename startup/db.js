/* jshint esversion: 8 */

'use strict';
// Packages imports
const debug = require('debug')('app:db');
const winston = require('winston');

// Models imports
const models = require('../Models');

module.exports = function() {
    models.sequelize.sync({force: false})
        .then(() => {
            debug(`Connected to the database...`);
            winston.info('Connected to the database...');
        });
};
