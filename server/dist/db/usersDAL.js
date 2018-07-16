"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
function getAll() {
    models_1.User.find()
        .then(function (res) { return console.log(res); })
        .catch(function (err) { return console.log(err); });
}
exports.getAll = getAll;
function getByName(name) {
    models_1.User.findOne({ name: name })
        .then(function (res) { return console.log(res); })
        .catch(function (err) { return console.log(err); });
}
exports.getByName = getByName;
function getById(id) {
    return models_1.User.findById(id)
        .then(function (res) { return console.log(res); })
        .catch(function (err) { return console.log(err); });
}
exports.getById = getById;
function add(newUser) {
    new models_1.User(newUser)
        .save()
        .then(function (res) { return console.log(res); })
        .catch(function (err) { return console.log(err); });
}
exports.add = add;
function updateById(id, newProps) {
    models_1.User.findByIdAndUpdate(id, __assign({}, newProps))
        .then(function (res) { return console.log(res); })
        .catch(function (err) { return console.log(err); });
}
exports.updateById = updateById;
function deleteById(id) {
    models_1.User.findByIdAndRemove(id)
        .then(function (res) { return console.log(res); })
        .catch(function (err) { return console.log(err); });
}
exports.deleteById = deleteById;
//# sourceMappingURL=usersDAL.js.map