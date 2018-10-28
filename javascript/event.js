'use strict';

class Event{

    constructor(sender){
        this._sender = sender;
        this._callbacks = [];
    }

    attach(callback){
        this._callbacks.push(callback);
    }

    notify(args){
        this._callbacks.forEach(callback => callback(this._sender, args));
    }
}

module.exports = Event;