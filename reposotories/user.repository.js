/* jshint esversion: 8 */

'use strict';

const models= require('../Models');

exports.isUserActive = (email) => {
    return models.User.findOne({
        where: {
            email: email
        },
        attributes: ['is_active']
    });
};

exports.findUserById = (id) => {
    return models.User.findByPk(id);
};

exports.getAllPayments = async (id) => {
    let user = await models.User.findByPk(id);
    return user.getPayments();
};

exports.getAllUserTests = async (id) => {
    let user = await models.User.findByPk(id);
    return user.getUserTests();
};

exports.getAllResponses = async (id) => {
    let user = await models.User.findByPk(id);
    return user.getResponses();
};

exports.findAll = (perPage, page) => {
    return models.User.findAll({
        limit: perPage,
        offset: page*perPage,
        raw: true
    });
};

exports.findUserByEmail = (email) => {
    return models.User.findOne({
        where: {
            email: email
        }
    });
};

exports.getSchoolInfos = async (id) => {
    let user = await models.User.findByPk(id);
    return user.getSchool();
};

exports.addUser = (userData) => {
    return models.User.create(userData);
};

exports.removeUserById = (id) => {
    return models.User.destroy({
        where: {
            id: id
        }
    });
};

exports.updateUser = async (id, userData) => {
    const user = await models.User.findByPk(id);
    return user.update(userData);
};

exports.updatePassword = async (id, password) => {
    return models.User.update({password: password}, {
        where: {
            id: id
        }
    });
};

exports.getNumberOfUsers = function () {
    return models.User.count();
};

exports.deleteUsers = async function (ids) {
    let nbrOfDestroyedDocuments = 0;
    for(const id of ids) {
        const user = await models.User.findByPk(id);
        if (user) {
            const destroyed = await user.destroy();
            if (destroyed) {
                nbrOfDestroyedDocuments++;
            }
        }
    }
    return nbrOfDestroyedDocuments;
};
