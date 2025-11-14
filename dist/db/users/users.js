"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersWithAddressLeftJoin = exports.getUsers = exports.getUsersCount = void 0;
const connection_1 = require("../connection");
const query_templates_1 = require("./query-templates");
const getUsersCount = () => new Promise((resolve, reject) => {
    connection_1.connection.get(query_templates_1.selectCountOfUsersTemplate, (error, results) => {
        if (error) {
            reject(error);
        }
        resolve(results.count);
    });
});
exports.getUsersCount = getUsersCount;
const getUsers = (pageNumber, pageSize) => new Promise((resolve, reject) => {
    connection_1.connection.all(query_templates_1.selectUsersTemplate, [(pageNumber - 1) * pageSize, pageSize], (error, results) => {
        if (error) {
            reject(error);
        }
        resolve(results);
    });
});
exports.getUsers = getUsers;
const getUsersWithAddressLeftJoin = (pageNumber, pageSize) => new Promise((resolve, reject) => {
    connection_1.connection.all(query_templates_1.selectUsersWithAddressLeftJoinTemplate, [(pageNumber - 1) * pageSize, pageSize], (error, results) => {
        if (error) {
            reject(error);
        }
        resolve(results);
    });
});
exports.getUsersWithAddressLeftJoin = getUsersWithAddressLeftJoin;
