import dispatcher from "../AppDispatcher";
import UsersActionsID = require('../constants/UsersActionsID');
import UsersAPI from "../apis/UsersAPI";

export function reloadUsers() {
    dispatcher.dispatch({
        type: UsersActionsID.USER_FETCH_ALL
    });
    UsersAPI.getAll();
}

export function receiveUsers(response) {
    dispatcher.dispatch({
        type: UsersActionsID.USER_FETCH_ALL_RESPONSE,
        users: response
    });
}