import Axios from "axios";
import * as PostsActions from "../actions/PostsActions";

export default class PostsAPI {
    static getAll() {
        Axios.get('http://jsonplaceholder.typicode.com/posts',{responseType: 'json'})
            .then((response) => response.data)
            .then((data) => {
                PostsActions.receivePosts(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    static getAllSimple() {
         return Axios.get('http://jsonplaceholder.typicode.com/posts',{responseType: 'json'})
             .then((response) => response.data);
    }

    static getByID(id: number) {
        return Axios.get('http://jsonplaceholder.typicode.com/posts/' + id,{responseType: 'json'})
            .then((response) => response.data);
    }
}