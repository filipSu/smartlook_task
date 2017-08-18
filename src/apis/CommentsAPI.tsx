import Axios from "axios";
export default class CommentsAPI {

    static getByPostID(id: number) {
        return Axios.get(
            'http://jsonplaceholder.typicode.com/comments?postId=' + id,
            {responseType: 'json'})
            .then((response) => response.data);
    }

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