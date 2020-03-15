/* jshint esversion: 8 */
'use strict';
const configuration = require('../env.config.js');
const config = require('config');

module.exports.init = function () {
    configuration.initRefreshSecret();

    if (!config.get('jwt.refresh_secret')) {
        throw new Error('REFRESH_SECRET environment variable doesn\'t exist');
    }
};

module.exports.keys = function () {

    let privateKey;
    let publicKey;

    if (config.get('env') === 'development') {
        const fs = require('fs');
        privateKey = fs.readFileSync('tls/token-key.pem');
        publicKey = fs.readFileSync('tls/token-public-key.pem');
    } else {
        privateKey = config.get('jwt.jwt_private_key');
        publicKey = config.get('jwt.jwt_public_key');
    }

    return {
        jwt_private_key: privateKey,
        jwt_public_key: publicKey
    };
};
