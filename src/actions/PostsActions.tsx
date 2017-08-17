import dispatcher from "../AppDispatcher";
import PostsActionsID = require('../constants/PostsActionsID');
import PostAPI from "../apis/PostsAPI";

export function reloadPosts() {
    dispatcher.dispatch({
        type: PostsActionsID.POST_FETCH_ALL
    });
    PostAPI.getAll();
}

export function receivePosts(response) {
    dispatcher.dispatch({
        type: PostsActionsID.POST_FETCH_ALL_RESPONSE,
        posts: response
    });
}