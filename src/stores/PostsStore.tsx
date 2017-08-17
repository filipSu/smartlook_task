import {EventEmitter} from "events";
import dispatcher from "../AppDispatcher";
import PostsActionsID = require('../constants/PostsActionsID');

const sample_posts = require('../assets/test_posts.json');

class PostsStore extends EventEmitter {
    private _posts;

    constructor() {
        super();
        this._posts = sample_posts;
    }

    getAll() {
        return this._posts;
    }

    get(id: number) {
        return this._posts.find((post) => post.id === id);
    }

    handleActions(action: any) {
        switch (action.type) {
            case PostsActionsID.POST_CREATE:
                this.createPost(action.title, action.body, action.userId);
                break;
            case PostsActionsID.POST_DELETE:
                this.deletePost(action.id);
                break;
        }
    }

    private createPost(title: string, body: string, userId: number){
        let lastID = this._posts[this._posts.length-1].id;
        this._posts.push({
            id: lastID +1,
            title: title,
            body: body,
            userId: userId
        });
        this.emit("change");
    }

    private deletePost(id: number) {
        let toBeDeleted = this._posts.filter((post) => post.id === id)[0];
        if (toBeDeleted) {
            let index = this._posts.indexOf(toBeDeleted);
            this._posts.splice(index,1);
            this.emit("change");
        }
    }
}

const postsStore = new PostsStore();
dispatcher.register(postsStore.handleActions.bind(postsStore));

export default postsStore;