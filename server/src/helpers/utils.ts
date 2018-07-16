// export function generateTree(groups, groupsToGroups, users, groupsToUsers, userData) {
//     const tree = [];
//     for (let group in groups) {
//         if (!groups[group].hasOwnProperty('parent') || !groups[group].parent) {
//             let reducedGroup = reduceGroup(groups[group]);
//             if (groupsToGroups[group]) {
//                 reducedGroup.items = groupsToGroups[group].map(groupId => reduceGroup(groups[groupId]));
//                 populateChildren(reducedGroup);
//             }
//             tree.push(reducedGroup);
//         }
//     }
//     return tree;
//
//     function populateChildren(group) {
//         if (!group.items) {
//             return;
//         }
//         group.items.forEach(item => {
//             if (groupsToGroups[item.id]) {
//                 item.items = groupsToGroups[item.id].map(groupId => reduceGroup(groups[groupId]));
//                 populateChildren(item);
//             }
//         });
//     }
//
//     function reduceGroup({_id, name, isPrivate}) {
//         return {
//             id: _id,
//             type: isPrivate ? "user" : "group",
//             name: !isPrivate ? name : getPrivateGroupName(_id),
//             items: []
//         };
//     }
//
//     function getPrivateGroupName(id) {
//         let userId = groupsToUsers[id].filter(uId => {
//             return uId != userData.id;
//         });
//         if (users[userId]) {
//             return users[userId].name;
//         }
//         return null;
//     }
// }

export function removePassword({_id, name, age}) {
    return {
        _id,
        name,
        age
    };
}

export function buildTree(groups, userData) {
    const tree = [];
    groups.forEach(group => {
        if (group.hasOwnProperty('parent') && group.parent) {
            const idx = groups.findIndex(g => {
                return g._id.str == group.parent.str
            });
            if (idx !== -1) {
                groups[idx].items ? group.items.push(group) : groups[idx].items = [group];
            }
        }
    });
    groups.forEach(group => {
        if (!group.parent) {
            tree.push({
                type: group.isPrivate ? 'user' : 'group',
                _id: group._id,
                name: !group.isPrivate ? group.name : getNameOfPrivate(group),
                items: group.items,
                users: [...group.users]
            });
        }
    });
    return tree;

    function getNameOfPrivate(group) {
        const user = group.users.filter(u => u._id.toString() !== userData.id.toString());
        return user[0].name;
    }
}