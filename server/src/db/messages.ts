import {Message} from '../models';

export async function getAllByGroup(groupId) {
    return await Message.find({'recipient': groupId})
        .populate('sender', '_id name age')
        .populate('recipient')
        .lean();
}

export async function add(newMessage) {
    const createdMsg = await new Message({...newMessage}).save();
    return Message.findById(createdMsg._id).populate('sender', '_id name age').populate('recipient').lean();
}