/* jshint esversion: 8 */

'use strict';

const winston = require('winston');
const config = require('config');
const debug = require('debug')('app:startup');
require('winston-mongodb');
require('express-async-errors');

const env = config.get('env');

module.exports = function (app) {
    const mongoDbLoggingConfig = {
        db: 'mongodb+srv://ghrib:ghribzied123@cluster0-4dyv1.mongodb.net/loggs-ghrib?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        collection: 'log'
    };

// Winston config
    winston.add(new winston.transports.File({
        filename: 'logger.log',
        level: 'debug'
    }));
    winston.add(new winston.transports.MongoDB(mongoDbLoggingConfig));

// Uncaught exceptions
    mongoDbLoggingConfig.collection = 'unhandledExceptions';
    winston.exceptions.handle(
        new winston.transports.File({filename: 'unhandledExceptions.log'}),
        new winston.transports.MongoDB(mongoDbLoggingConfig)
    );

// Unhandled Rejections
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    if (env === 'development'){
        const morgan = require('morgan');
        app.use(morgan('tiny'));
        debug('Morgan enabled...');
    }
    if (config.get('winston.enable_console') === '1') {
        winston.add(new winston.transports.Console({
            format: winston.format.combine(winston.format.simple(), winston.format.prettyPrint()),
            handleExceptions: true,
            level: 'info',
        }));
    }
};
