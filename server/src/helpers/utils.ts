export function generateTree(groups, groupsToGroups, users, groupsToUsers, userData) {
    const tree = [];
    for (let group in groups) {
        if (!groups[group].hasOwnProperty('parent') || !groups[group].parent) {
            let reducedGroup = reduceGroup(groups[group]);
            if (groupsToGroups[group]) {
                reducedGroup.items = groupsToGroups[group].map(groupId => reduceGroup(groups[groupId]));
                populateChildren(reducedGroup);
            }
            tree.push(reducedGroup);
        }
    }
    return tree;

    function populateChildren(group) {
        if (!group.items) {
            return;
        }
        group.items.forEach(item => {
            if (groupsToGroups[item.id]) {
                item.items = groupsToGroups[item.id].map(groupId => reduceGroup(groups[groupId]));
                populateChildren(item);
            }
        });
    }

    function reduceGroup({_id, name, isPrivate}) {
        return {
            id: _id,
            type: isPrivate ? "user" : "group",
            name: !isPrivate ? name : getPrivateGroupName(_id),
            items: []
        };
    }

    function getPrivateGroupName(id) {
        let userId = groupsToUsers[id].filter(uId => {
            return uId != userData.id;
        });
        if (users[userId]) {
            return users[userId].name;
        }
        return null;
    }
}

export function removePassword({_id, name, age}) {
    return {
        _id,
        name,
        age
    };
}