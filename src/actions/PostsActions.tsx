import dispatcher from "../AppDispatcher";
import PostsActionsID = require('../constants/PostsActionsID');

export function createPost(title: string, body: string, userId: number) {
    dispatcher.dispatch({
        type: PostsActionsID.POST_CREATE,
        title: title,
        body: body,
        userId: userId
    });
}

export function deletePost(id: number) {
    dispatcher.dispatch({
        type: PostsActionsID.POST_DELETE,
        id: id
    });
}