function Events() {
    const events = {};

    function off(name, listener) {
        const listeners = events[name];
        if(!listeners) {
            return;
        }

        const index = listeners.indexOf(listener);
        if(index != -1) {
            listeners.splice(index, 1);
        }
    }

    function on(name, listener) {
        const listeners = events[name] = events[name] || [];
        listeners.push(listener);
    }

    function emit(name, args) {
        const listeners = events[name];
        if(!listeners) {
            return;
        }

        for(var listener of listeners) {
            listener(args);
        }
    }

    return {
        on,
        off,
        emit,
    };
}

export const events = Events();
