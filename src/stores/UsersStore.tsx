import {EventEmitter} from "events";
import dispatcher from "../AppDispatcher";
import UsersActionsID = require('../constants/UsersActionsID');

const sample_users = require('../assets/test_users.json');

class UsersStore extends EventEmitter {
    private _users;

    constructor() {
        super();
        this._users = sample_users;
    }

    getAll() {
        return this._users;
    }

    get(id: number) {
        return this._users.find((user) => user.id === id);
    }

    handleActions(action: any) {
        switch (action.type) {

        }
    }
}

const userssStore = new UsersStore();
dispatcher.register(userssStore.handleActions.bind(userssStore));

export default userssStore;