import Axios from "axios";
export default class CommentsAPI {

    static getByPostID(id: number) {
        return Axios.get(
            'http://jsonplaceholder.typicode.com/comments?postId=' + id,
            {responseType: 'json'})
            .then((response) => response.data);
    }
}