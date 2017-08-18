import Axios from "axios";

/**
 * Class including static methods used to communicate with API
 * */
export default class CommentsAPI {
    /**
     * Get all comments associated with given post ID
     * @param {number} id - Post ID
     * @return axios promise
     * */
    static getByPostID(id: number) {
        return Axios.get(
            'http://jsonplaceholder.typicode.com/comments?postId=' + id,
            {responseType: 'json'})
            .then((response) => response.data);
    }
    /**
     * Creates new comment
     * @param {number} postId - with which post should be comment associated
     * @param {string} name - commentator's name
     * @param {string} email - commentator's email
     * @param {string} body - comment message
     * @return axios promise
     * */
    static postComment(postId: number, name: string, email: string, body: string) {
        return Axios({
            method: 'post',
            url: 'http://jsonplaceholder.typicode.com/comments',
            data: {
                postId: postId,
                name: name,
                email: email,
                body: body
            }
        }).then((response) => response.data);
    }
}