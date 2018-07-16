import {Schema, model} from 'mongoose';

const messageSchema = new Schema({
    sender: {type: Schema.Types.ObjectId, ref: 'User'},
    recipient: {type: Schema.Types.ObjectId, ref: 'Group'},
    body: String,
    time: String
});

export default model('Message', messageSchema);