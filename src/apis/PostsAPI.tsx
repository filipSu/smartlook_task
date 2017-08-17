import Axios from "axios";

export default class PostsAPI {

    static getAll() {
         return Axios.get('http://jsonplaceholder.typicode.com/posts',{responseType: 'json'})
             .then((response) => response.data);
    }

    static getByID(id: number) {
        return Axios.get('http://jsonplaceholder.typicode.com/posts/' + id,{responseType: 'json'})
            .then((response) => response.data);
    }
}