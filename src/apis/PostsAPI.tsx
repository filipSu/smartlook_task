import Axios from "axios";

/**
 * Class including static methods used to communicate with API
 * */
export default class PostsAPI {
    /**
     * Get all posts
     * @return axios promise
     * */
    static getAll() {
         return Axios.get('http://jsonplaceholder.typicode.com/posts',{responseType: 'json'})
             .then((response) => response.data);
    }
    /**
     * Get post by given ID
     * @param {number} id - Post ID
     * @return axios promise
     * */
    static getByID(id: number) {
        return Axios.get('http://jsonplaceholder.typicode.com/posts/' + id,{responseType: 'json'})
            .then((response) => response.data);
    }
}