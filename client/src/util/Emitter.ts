class Emitter {
    static events = {};

    static on(type: string, listener: Function) {
        this.events[type] = this.events[type] || [];
        this.events[type].push(listener);
    }

    static emit(type: string) {
        if(!this.events[type]) {
            return;
        }

        this.events[type].forEach( (listener: Function) => {
           listener();
        });
    }

    static off(type:string, listener: Function) {
        if (!this.events[type]) {
            return;
        }

        let index = this.events[type].indexOf(listener);
        if (index !== -1) {
            this.events[type].splice(index, 1);
        }
    }
}