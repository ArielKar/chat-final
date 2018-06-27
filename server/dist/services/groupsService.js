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
var dataHandler_1 = require("../db/dataHandler");
var uuidv4 = require("uuid/v4");
var utils_1 = require("../helpers/utils");
var GroupsService = /** @class */ (function () {
    function GroupsService() {
        this.groupsDataHandler = new dataHandler_1.default('groups');
        this.groupsToUsersDataHandler = new dataHandler_1.default('groupsToUsers');
        this.groupsToGroupsDataHandler = new dataHandler_1.default('groupsToGroups');
        this.usersDataHandler = new dataHandler_1.default('users');
    }
    GroupsService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.groupsDataHandler.readFile()];
            });
        });
    };
    GroupsService.prototype.getTree = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var groups, groupsToGroups, groupsToUsers, users, tree;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.groupsDataHandler.readFile()];
                    case 1:
                        groups = _a.sent();
                        return [4 /*yield*/, this.groupsToGroupsDataHandler.readFile()];
                    case 2:
                        groupsToGroups = _a.sent();
                        return [4 /*yield*/, this.groupsToUsersDataHandler.readFile()];
                    case 3:
                        groupsToUsers = _a.sent();
                        return [4 /*yield*/, this.usersDataHandler.readFile()];
                    case 4:
                        users = _a.sent();
                        tree = utils_1.generateTree(groups, groupsToGroups, users, groupsToUsers, userData);
                        return [2 /*return*/, tree];
                }
            });
        });
    };
    GroupsService.prototype.getGroup = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var groups;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.groupsDataHandler.readFile()];
                    case 1:
                        groups = _a.sent();
                        if (!groups[groupId]) {
                            throw new Error('Group does not exist');
                        }
                        return [2 /*return*/, groups[groupId]];
                }
            });
        });
    };
    GroupsService.prototype.getPrivateGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var groups, privateGroups;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.groupsDataHandler.readFile()];
                    case 1:
                        groups = _a.sent();
                        privateGroups = Object.keys(groups).map(function (group) { return groups[group]; }).filter(function (group) { return group.isPrivate; });
                        return [2 /*return*/, privateGroups];
                }
            });
        });
    };
    GroupsService.prototype.addGroup = function (rawNewGroup, userAuth) {
        return __awaiter(this, void 0, void 0, function () {
            var name, parent, isPrivate, usersOfNewGroup, newGroup, groups, groupsToUsers, groupsToGroups, self;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // TODO: check if already name of group exist on same level
                        console.log(rawNewGroup);
                        console.log("---------------------------");
                        name = rawNewGroup.name, parent = rawNewGroup.parent, isPrivate = rawNewGroup.isPrivate, usersOfNewGroup = rawNewGroup.users;
                        newGroup = { _id: uuidv4(), name: name, parent: parent, isPrivate: isPrivate };
                        return [4 /*yield*/, this.groupsDataHandler.readFile()];
                    case 1:
                        groups = _a.sent();
                        groups[newGroup._id] = newGroup;
                        return [4 /*yield*/, this.groupsToUsersDataHandler.readFile()];
                    case 2:
                        groupsToUsers = _a.sent();
                        groupsToUsers[newGroup._id] = usersOfNewGroup.concat([userAuth.id]);
                        return [4 /*yield*/, this.groupsToGroupsDataHandler.readFile()];
                    case 3:
                        groupsToGroups = _a.sent();
                        groupsToGroups[newGroup._id] = [];
                        self = this;
                        console.log("USERS OF NEW GROUP: ", usersOfNewGroup);
                        return [4 /*yield*/, Promise.all(usersOfNewGroup.map(function (userId) { return __awaiter(_this, void 0, void 0, function () {
                                var newPrivateGroup;
                                return __generator(this, function (_a) {
                                    // if (userId === userAuth.id) {
                                    //     return;
                                    // }
                                    // creating private group for each userId
                                    console.log(userId);
                                    newPrivateGroup = { _id: uuidv4(), isPrivate: true, name: null, parent: newGroup._id };
                                    console.log(newPrivateGroup);
                                    // const groups = await self.groupsDataHandler.readFile();
                                    groups[newPrivateGroup._id] = newPrivateGroup;
                                    // await self.groupsDataHandler.writeFile(groups);
                                    // creating association in groupsToUsers
                                    // const groupsToUsers = await self.groupsToUsersDataHandler.readFile();
                                    groupsToUsers[newPrivateGroup._id] = [userId, userAuth.id];
                                    // await self.groupsToUsersDataHandler.writeFile(groupsToUsers);
                                    // creating association between parentGroup to privateGroup in GroupsToGroups
                                    groupsToGroups[newGroup._id].push(newPrivateGroup._id);
                                    return [2 /*return*/];
                                });
                            }); }))];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, self.groupsToGroupsDataHandler.writeFile(groupsToGroups)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, self.groupsToUsersDataHandler.writeFile(groupsToUsers)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, self.groupsDataHandler.writeFile(groups)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupsService.prototype.updateGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    GroupsService.prototype.deleteGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return GroupsService;
}());
exports.default = new GroupsService();
//# sourceMappingURL=groupsService.js.map