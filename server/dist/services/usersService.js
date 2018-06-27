"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var config = require("config");
var dataHandler_1 = require("../db/dataHandler");
var customError_1 = require("../helpers/customError");
var UserService = /** @class */ (function () {
    function UserService() {
        this.usersDataHandler = new dataHandler_1.default('users');
    }
    UserService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users, usersArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersDataHandler.readFile()];
                    case 1:
                        users = _a.sent();
                        usersArr = Object.keys(users).map(function (user) { return users[user]; });
                        return [2 /*return*/, usersArr];
                }
            });
        });
    };
    UserService.prototype.getUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersDataHandler.readFile()];
                    case 1:
                        users = _a.sent();
                        if (!users[userId]) {
                            throw new Error('Invalid request: user does not exist');
                        }
                        return [2 /*return*/, users[userId]];
                }
            });
        });
    };
    UserService.prototype.addUser = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var name, age, password, hashedPassword, newUser, users, writingResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = data.name, age = data.age, password = data.password;
                        return [4 /*yield*/, bcrypt.hash(password, 10)];
                    case 1:
                        hashedPassword = _a.sent();
                        newUser = Object.assign({ _id: Date.now().toString() }, { name: name, age: age, password: hashedPassword });
                        return [4 /*yield*/, this.usersDataHandler.readFile()];
                    case 2:
                        users = _a.sent();
                        // TODO: check if username / email is taken
                        users[newUser._id] = newUser;
                        return [4 /*yield*/, this.usersDataHandler.writeFile(users)];
                    case 3:
                        writingResult = _a.sent();
                        if (!writingResult) {
                            throw new Error('Something went wrong writing the file');
                        }
                        return [2 /*return*/, newUser];
                }
            });
        });
    };
    UserService.prototype.updateUser = function (userId, newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var users, userToUpdate, prop, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersDataHandler.readFile()];
                    case 1:
                        users = _a.sent();
                        userToUpdate = users[userId];
                        if (!userToUpdate) {
                            throw new Error('Invalid request: user does not exist');
                        }
                        for (prop in newProps) {
                            if (userToUpdate.hasOwnProperty(prop)) {
                                userToUpdate[prop] = newProps[prop];
                            }
                        }
                        return [4 /*yield*/, this.usersDataHandler.writeFile(users)];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            return [2 /*return*/, userToUpdate];
                        }
                        else {
                            throw new Error('something went wrong writing the file');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.deleteUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var users, writeResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersDataHandler.readFile()];
                    case 1:
                        users = _a.sent();
                        if (!users[userId]) {
                            throw new Error('Invalid request: user does not exist');
                        }
                        delete users[userId];
                        return [4 /*yield*/, this.usersDataHandler.writeFile(users)];
                    case 2:
                        writeResult = _a.sent();
                        if (!!writeResult) {
                            return [2 /*return*/, true];
                        }
                        else {
                            throw new Error('something went wrong writing the file');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.authenticate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var users, foundUser, user, result, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersDataHandler.readFile()];
                    case 1:
                        users = _a.sent();
                        for (user in users) {
                            if (users[user].name === data.name) {
                                foundUser = users[user];
                            }
                        }
                        if (!!foundUser) return [3 /*break*/, 2];
                        // when no such user
                        throw new customError_1.default('Invalid user credentials', 401);
                    case 2: return [4 /*yield*/, bcrypt.compare(data.password, foundUser.password)];
                    case 3:
                        result = _a.sent();
                        if (!result) {
                            // when user found but password wont match
                            throw new customError_1.default('Invalid user credentials', 401);
                        }
                        token = jwt.sign({
                            id: foundUser._id,
                            name: foundUser.name
                        }, config.get('JWT_SECRET'), { expiresIn: '1h' });
                        return [2 /*return*/, { foundUser: foundUser, token: token }];
                }
            });
        });
    };
    return UserService;
}());
exports.default = new UserService();
//# sourceMappingURL=usersService.js.map