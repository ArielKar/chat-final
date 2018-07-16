import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    name: String,
    age: Number,
    password: String
});

export default model('User', userSchema);