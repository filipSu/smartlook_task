import Post from "../models/Post";

const sample_posts = require('../assets/test_posts.json');

export default class PostsAPI {

    static getPosts() {
        let posts = [];
        sample_posts.map( post => {
            posts.push(new Post(post.id, post.title, post.body, post.userId));
        });
        return posts;
    }

    static getPost(id: number) {
        let posts = sample_posts;
        return posts.find((post) => post.id === id);
    }
}