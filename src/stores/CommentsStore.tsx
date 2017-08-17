import {EventEmitter} from "events";
import dispatcher from "../AppDispatcher";
import CommentsActionsID = require('../constants/CommentsActionsID');

const sample_comments = require('../assets/test_comments.json');

class CommentsStore extends EventEmitter {
    private _comments;

    constructor() {
        super();
        this._comments = sample_comments;
    }

    getAll() {
        return this._comments;
    }

    get(id: number) {
        return this._comments.find((comment) => comment.id === id);
    }

    getByPostID(postId: number) {
        return this._comments.filter((comment) => comment.postId === postId);
    }

    handleActions(action: any) {
        switch (action.type) {
            case CommentsActionsID.COMMENT_CREATE:
                this.createComment(action.name, action.email, action.body, action.postId);
                break;
            case CommentsActionsID.COMMENT_DELETE:
                this.deleteComment(action.id);
                break;
        }
    }

    private createComment(name: string, email: string, body: string, postId: number){
        let lastID = this._comments[this._comments.length-1].id;
        this._comments.push({
            id: lastID +1,
            name: name,
            email: email,
            body: body,
            postId: postId
        });
        this.emit("change");
    }

    private deleteComment(id: number) {
        let toBeDeleted = this._comments.find((comment) => comment.id === id);
        if (toBeDeleted) {
            let index = this._comments.indexOf(toBeDeleted);
            this._comments.splice(index,1);
            this.emit("change");
        }
    }
}

const commentsStore = new CommentsStore();
dispatcher.register(commentsStore.handleActions.bind(commentsStore));

export default commentsStore;