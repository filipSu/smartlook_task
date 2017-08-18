import Axios from "axios";
/**
 * Class including static methods used to communicate with API
 * */
export default class UsersAPI {
    /**
     * Get all users
     * @return axios promise
     * */
    static getAll() {
        return Axios.get('http://jsonplaceholder.typicode.com/users',{responseType: 'json'})
            .then((response) => response.data);
    }
    /**
     * Get user by given ID
     * @param {number} id - User's ID
     * @return axios promise
     * */
    static getByID(id: number) {
        return Axios.get('http://jsonplaceholder.typicode.com/users/'+id,{responseType: 'json'})
            .then((response) => response.data);
    }
}