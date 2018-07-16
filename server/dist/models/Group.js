"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var groupSchema = new mongoose_1.Schema({
    name: String,
    isPrivate: Boolean,
    parent: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Group' },
    users: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }
    ]
});
exports.default = mongoose_1.model('Group', groupSchema);
//# sourceMappingURL=Group.js.map