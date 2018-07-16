import {User} from "../models";

export function getAll() {
    return User.find().lean();
}

export async function getByName(name) {
    return await User.findOne({name}).lean();
}

export async function getById(_id) {
    return await User.findById(_id).lean();
}

export async function add(newUser) {
    const createdUser = await new User({...newUser}).save();
    return createdUser.toObject();
}

export async function updateById(_id, newProps) {
    await User.findByIdAndUpdate(_id, {$set: {...newProps}});
    return getById(_id);
}

export async function deleteById(_id) {
    return await User.findByIdAndRemove(_id).lean();
}