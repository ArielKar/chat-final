"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateTree(groups, groupsToGroups, users, groupsToUsers, userData) {
    var tree = [];
    for (var group in groups) {
        console.log("working on a group in groups of id: " + group);
        console.log("===============================");
        if (!groups[group].hasOwnProperty('parent') || !groups[group].parent) {
            console.log("raw group in db is :", groups[group]);
            var reducedGroup = reduceGroup(groups[group]);
            if (groupsToGroups[group]) {
                console.log(reducedGroup);
                reducedGroup.items = groupsToGroups[group].map(function (groupId) { return reduceGroup(groups[groupId]); });
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
        group.items.forEach(function (item) {
            if (groupsToGroups[item.id]) {
                item.items = groupsToGroups[item.id].map(function (groupId) { return reduceGroup(groups[groupId]); });
                populateChildren(item);
            }
        });
    }
    function reduceGroup(_a) {
        var _id = _a._id, name = _a.name, isPrivate = _a.isPrivate;
        return {
            id: _id,
            type: isPrivate ? "user" : "group",
            name: !isPrivate ? name : getPrivateGroupName(_id),
            items: []
        };
    }
    function getPrivateGroupName(id) {
        var userId = groupsToUsers[id].filter(function (uId) {
            return uId != userData.id;
        });
        if (users[userId]) {
            return users[userId].name;
        }
        return null;
    }
}
exports.generateTree = generateTree;
function removePassword(_a) {
    var _id = _a._id, name = _a.name, age = _a.age;
    return {
        _id: _id,
        name: name,
        age: age
    };
}
exports.removePassword = removePassword;
//# sourceMappingURL=utils.js.map