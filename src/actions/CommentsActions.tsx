import dispatcher from "../AppDispatcher";
import CommentsActionsID = require('../constants/CommentsActionsID');

export function createComment(name: string, email: string, body: string, postId: number) {
    dispatcher.dispatch({
        type: CommentsActionsID.COMMENT_CREATE,
        name: name,
        email: email,
        body: body,
        postId: postId
    });
}

export function deleteComment(id: number) {
    dispatcher.dispatch({
        type: CommentsActionsID.COMMENT_DELETE,
        id: id
    });
}