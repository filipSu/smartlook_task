import Axios from "axios";
import * as UsersActions from "../actions/UsersActions";

export default class UsersAPI {
    static getAll() {
        Axios.get('http://jsonplaceholder.typicode.com/users',{responseType: 'json'})
            .then((response) => response.data)
            .then((data) => {
                UsersActions.receiveUsers(data);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    static getAllSimple() {
        return Axios.get('http://jsonplaceholder.typicode.com/users',{responseType: 'json'})
            .then((response) => response.data);
    }

    static getByID(id: number) {
        return Axios.get('http://jsonplaceholder.typicode.com/users/'+id,{responseType: 'json'})
            .then((response) => response.data);
    }
}