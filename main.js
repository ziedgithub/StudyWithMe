/*jshint esversion: 8 */
'use strict';

const express = require('express');
const debug = require('debug')('app:startup');
const winston = require('winston');

const app = express();

//Importing startup config
require('./startup/logging')(app);
require('./startup/config').init();
require('./startup/routes')(app);
require('./startup/db')();


//voir Helmet.md
//const tls = require('spdy'); http2 + https (tls) app deployed to heroku so no need for tls
const http = require('http');
const fs = require('fs');

/*const options = {
    key: fs.readFileSync('./tls/test-key.pem'),
    cert: fs.readFileSync('./tls/test-cert.pem')
};*/

const configuration = require('./env.config.js');

const Port = process.env.PORT || configuration.port;

http.createServer(app).listen(Port, () => {
    winston.info(`Server listening on port: ${Port}...`);
    debug(`Server listening on port: ${Port}...`);
});

