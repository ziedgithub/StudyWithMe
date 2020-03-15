/* jshint esversion: 8 */

'use strict';

const config = require('config');

module.exports = {
    "port": 8443,
    "refresh_secret": config.get('jwt.refresh_secret'),
    "jwtValidityTimeInSeconds": 1020,
    "permissionLevels": {
        "Surfer": 1,
        "Member": 32768,
        "Master": 1073741824
    },
    "actualRefreshSecret": null,
    "initRefreshSecret": function () {
        this.actualRefreshSecret = this.refresh_secret.concat('$' + (new Date(Date.now())).toISOString());
    }
};
