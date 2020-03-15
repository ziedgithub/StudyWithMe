/* jshint esversion: 8 */

'use strict';

const Joi = require('@hapi/joi');

module.exports = function (input) {
    const schema = Joi.object(
        {
            password: Joi.string().required(),
            email: Joi.string().email().required(),
            is_active: Joi.number().required().equal(0).equal(1).allow(true).allow(false),
            roles: Joi.array().required(),
            firstname: Joi.string(),
            lastname: Joi.string()
        }
    );

    return schema.validate(input, {
        allowUnknown: true
    });
};
