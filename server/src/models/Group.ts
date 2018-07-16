import {Schema, model} from 'mongoose';

const groupSchema = new Schema({
    name: String,
    isPrivate: Boolean,
    parent: {type: Schema.Types.ObjectId, ref: 'Group'},
    users: [
        {type: Schema.Types.ObjectId, ref: 'User'}
    ]
});

export default model('Group', groupSchema);