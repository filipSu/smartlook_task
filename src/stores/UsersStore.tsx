import {EventEmitter} from "events";
import dispatcher from "../AppDispatcher";
import UsersActionsID = require('../constants/UsersActionsID');

const sample_users = require('../assets/test_users.json');

class UsersStore extends EventEmitter {
    private _users;

    constructor() {
        super();
        this._users = [];
    }

    getAll() {
        return this._users;
    }

    get(id: number) {
        if (!this._users) {
            this._users = [];
        }
        return this._users.find((user) => user.id === id);
    }

    handleActions(action: any) {
        switch (action.type) {
            case UsersActionsID.USER_FETCH_ALL_RESPONSE:
                this._users = action.users;
                this.emit("change");
                break;
        }
    }
}

const userssStore = new UsersStore();
dispatcher.register(userssStore.handleActions.bind(userssStore));

export default userssStore;