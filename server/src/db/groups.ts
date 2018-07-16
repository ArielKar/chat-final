import * as mongoose from 'mongoose';
import {Group} from '../models';

export async function getAll() {
    return await Group.find({}).populate('users', '_id name age').lean();
}

export async function getById(_id) {
    return await Group.findOne({_id}).populate('users', '_id name age').lean();
}

export async function getGroupsOfParent(_id) {
    return await Group.find({'parent': _id}).populate('users', '_id name age').lean();
}

export async function getPrivateGroups() {
    return await Group.find({isPrivate: true}).populate('users', '_id name age').lean();
}

export async function getRoots() {
    return await Group.find({}).where('parent', undefined).lean();
}

export async function add(newGroup) {
    const createdGroup = await new Group({...newGroup}).save();
    return createdGroup.populate('users', '_id name age').toObject();
}

export async function updateById(_id, newProps) {
    await Group.findByIdAndUpdate(_id, {...newProps});
    return getById(_id);
}

export async function deleteById(_id) {
    return await Group.findByIdAndRemove(_id).lean();
}

export function deleteUserFromAll(userId) {
    Group.updateMany({'users': userId}, {$pull: {'users': userId}})
        .exec()
        .then(res => console.log(res))
        .catch(err => console.log(err));
}