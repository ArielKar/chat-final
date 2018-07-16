"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var messageSchema = new mongoose_1.Schema({
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    recipient: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Group' },
    body: String,
    time: String
});
exports.default = mongoose_1.model('Message', messageSchema);
//# sourceMappingURL=Message.js.map