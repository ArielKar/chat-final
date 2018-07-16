export function buildTree(groups, userData) {
    const roots = groups.filter(group => !group.parent);
    composeItems(roots);
    return roots.map(root => {
        return {
            type: root.isPrivate ? 'user' : 'group',
            _id: root._id,
            name: !root.isPrivate ? root.name : getNameOfPrivate(root),
            items: root.items,
            users: root.users
        }
    });

    function composeItems(groups) {
        groups.forEach(group => {
            group.items = reduceGroups(getChildren(group));
            let users = reduceUsers(group.users);
            group.items.push(...users);
            composeItems(group.items);
        });
    }

    function reduceGroups(items) {
        if (!items) return [];
        const result = items.map(item => {
            return {
                type: item.isPrivate ? 'user' : 'group',
                _id: item._id,
                name: !item.isPrivate ? item.name : getNameOfPrivate(item),
                items: reduceGroups(item.items),
                users: item.users
            }
        });
        return result || [];
    }

    function reduceUsers(items) {
        if (!items || items.length == 0) return;
        return items.map(item => {
            return {
                type: 'user',
                _id: item._id,
                name: item.name,
            }
        });
    }

    function getChildren(parent) {
        return groups.filter(group => group.parent === parent._id);
    }

    function getNameOfPrivate(group) {
        const user = group.users.filter(u => u._id !== userData._id);
        return user[0].name;
    }
}

// export function buildTree(groups, userData) {
//     console.log(groups);
//     const tree = [];
//     groups.forEach(group => {
//         decomposeGroup(group)
//     });
//     console.log(groups);
//     reduceGroups(groups);
//     console.log(tree);
//     return tree;
//
//     function decomposeGroup(group) {
//         if (group.hasOwnProperty('parent') && group.parent) {
//             const idx = groups.findIndex(g => {
//                 return g._id == group.parent;
//             });
//             if (idx !== -1) {
//                 if (groups[idx].items) {
//                     group.items.push(group);
//                 } else {
//                     groups[idx].items = [group];
//                 }
//             }
//         }
//     }
//
//     function getNameOfPrivate(group) {
//         const user = group.users.filter(u => u._id !== userData._id);
//         return user[0].name;
//     }
//
//     function reduceGroups(groups) {
//         if (!groups) return;
//         groups.forEach(group => {
//             if (!group.parent) {
//                 tree.push(
//                     {
//                         type: group.isPrivate ? 'user' : 'group',
//                         _id: group._id,
//                         name: !group.isPrivate ? group.name : getNameOfPrivate(group),
//                         items: reduceGroups(group.items),
//                         // items: group.items ? group.items.concat(reduceUsers(group.users)): [],
//                         users: [...reduceUsers(group.users)]
//                     }
//                 );
//             }
//         });
//     }
//
//     function reduceUsers(users) {
//         return users.map(user => {
//             return {
//                 type: 'user',
//                 _id: user._id,
//                 name: user.name,
//             }
//         });
//     }
// }