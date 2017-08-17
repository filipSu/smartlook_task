import Axios from "axios";

export default class UsersAPI {

    static getAll() {
        return Axios.get('http://jsonplaceholder.typicode.com/users',{responseType: 'json'})
            .then((response) => response.data);
    }

    static getByID(id: number) {
        return Axios.get('http://jsonplaceholder.typicode.com/users/'+id,{responseType: 'json'})
            .then((response) => response.data);
    }
}