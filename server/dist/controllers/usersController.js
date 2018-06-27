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
var services = require("../services");
//TODO: req.body and params validation
var UsersController = /** @class */ (function () {
    function UsersController() {
    }
    UsersController.getAllUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services.UserService.getAll()];
                    case 1:
                        data = _a.sent();
                        res.status(200).json({
                            message: 'Fetched all users',
                            data: data
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log('In getAllUsers', err_1.message);
                        res.status(500).json({
                            error: err_1.message
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.getUserById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services.UserService.getUser(req.params.userId)];
                    case 1:
                        data = _a.sent();
                        res.status(200).json({
                            message: 'Fetched one user',
                            data: data
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.log('In getUserById', err_2.message);
                        res.status(500).json({
                            error: err_2.message
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.addUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var addedUser, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services.UserService.addUser(req.body)];
                    case 1:
                        addedUser = _a.sent();
                        res.status(200).json({
                            message: 'Added user',
                            data: addedUser
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        console.log('In add user: ', err_3.message);
                        res.status(500).json({
                            error: err_3.message
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.updateUserById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedUser, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services.UserService.updateUser(req.params.userId, req.body)];
                    case 1:
                        updatedUser = _a.sent();
                        res.status(200).json({
                            message: 'User updated',
                            data: updatedUser
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        console.log('In updateUserById: ', err_4.message);
                        res.status(500).json({
                            error: err_4.message
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.deleteUserById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services.UserService.deleteUser(req.params.userId)];
                    case 1:
                        result = _a.sent();
                        res.status(200).json({
                            message: 'User deleted'
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        console.log("In deleteUserById", err_5.message);
                        res.status(500).json({
                            error: err_5.message
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.loginUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services.UserService.authenticate(req.body)];
                    case 1:
                        result = _a.sent();
                        res.status(200).json({
                            message: 'Logged in successfully',
                            user: result.foundUser,
                            token: result.token
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        res.status(err_6.status || 500).json({
                            message: err_6.message
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UsersController;
}());
exports.default = UsersController;
//# sourceMappingURL=usersController.js.map