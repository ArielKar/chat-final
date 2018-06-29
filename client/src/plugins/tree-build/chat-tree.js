import {events} from "../../util/events";

function ChatTree(element) {
    const TREE_LEVEL = 0;
    const state = {
        // isLoaded: false,
        selectedElement: element
    };

    function load(items) {
        // if (state.isLoaded) {
        //     return;
        // }
        console.log(element);
        console.log(items);
        element.addEventListener('keydown', handleEvent);
        element.addEventListener('dblclick', handleEvent);
        render(items, element, TREE_LEVEL);
        console.log(element);
        console.log(element.firstChild);
        if (element.firstChild) {
            element.firstChild.className = 'selected';
            // state.isLoaded = true;
            setSelectedElement(element.firstChild);
        }
    }

    function render(items, appendAfter, indentLevel) {
        items.forEach(item => {
            let newElem = getNewElement('li', item, indentLevel);
            append(appendAfter, newElem);
            appendAfter = newElem;
        });
    }

    function append(appendAfter, newElem) {
        if (appendAfter === element) {
            appendAfter.appendChild(newElem);
        //     state.isLoaded = true;
            return;
        }
        appendAfter.after(newElem);
    }

    function getNewElement(tag, item, indentLevel) {
        let newElement = document.createElement(tag);
        if (item.type === 'group') {
            newElement.expandData = item.items;
            let arrowDiv = document.createElement('div');
            arrowDiv.className = 'arrow-right';
            newElement.appendChild(arrowDiv);
        }
        newElement.indentLevel = indentLevel;
        newElement.__id = item.id;
        newElement.style.textIndent = `${indentLevel}em`;
        newElement.innerHTML = item.name + newElement.innerHTML;
        return newElement;
    }

    function handleEvent(e) {

        let current = state.selectedElement;
        if (e.type === 'keydown') {
            switch (e.keyCode) {
                case 37: // left
                    fold(current);
                    break;
                case 38: // up
                    navUp(current);
                    break;
                case 39: // right
                    if (current.expanded === true || !current.expandData) {
                        return;
                    }
                    expand(current);
                    break;
                case 40: // down
                    navDown(current);
                    break;
                case 13: // enter
                    if (!current.expandData) {
                        return;
                    } else if (current.expanded === true) {
                        fold(current);
                    } else {
                        expand(current);
                    }
                    break;
            }
        }
        if (e.type === 'dblclick') {
            state.selectedElement.className = '';
            e.target.className = 'selected';
            setSelectedElement(e.target);
            if (!e.target.expandData) {
                return;
            } else if (e.target.expanded === true) {
                fold(e.target);
            } else {
                expand(e.target);
            }
        }
    }

    function fold(current) {
        if (current.expanded !== true && current.previousElementSibling) {
            let currentLevel = current.indentLevel;
            let prevElement = current.previousElementSibling;
            while (prevElement.indentLevel >= currentLevel) {
                navUp(current);
                current = state.selectedElement;
                if (current.previousElementSibling) {
                    prevElement = current.previousElementSibling;
                } else {
                    break;
                }
            }
            navUp(current);
        } else {
            current.expanded = false;
            current.firstElementChild.className = 'arrow-right';
            if (current.nextElementSibling) {
                let nextElement = current.nextElementSibling;
                while (nextElement && nextElement.indentLevel > current.indentLevel) {
                    let removeElem = nextElement;
                    nextElement = nextElement.nextElementSibling;
                    removeElem.remove();
                }
            }
        }
    }

    function navUp(current) {
        if (current.previousElementSibling) {
            current.className = '';
            current.previousElementSibling.className = 'selected';
            setSelectedElement(current.previousElementSibling);
        }
    }

    function expand(current) {
        current.expanded = true;
        current.firstElementChild.className = 'arrow-down';
        render(current.expandData, current, current.indentLevel + 1);
        navDown(current);
    }

    function navDown(current) {
        if (current.nextElementSibling) {
            current.className = '';
            current.nextElementSibling.className = 'selected';
            setSelectedElement(current.nextElementSibling);
        }
    }

    function setSelectedElement(nextElement) {
        state.selectedElement = nextElement;
        events.emit('treeElementSelected', state.selectedElement.__id);
    }

    function clear() {
        element.innerHTML = '';
        // state.isLoaded = false;
        state.selectedElement = element;
        // setSelectedElement(element);
    }

    return {
        load,
        clear,
        element,
    };
}

export default ChatTree;