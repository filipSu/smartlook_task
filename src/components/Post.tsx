import * as React from "react";

export interface IPostState {}
export interface IPostProps {}

export default class Post extends React.Component<IPostProps, IPostState> {
    render() {
        return (
            <div>
                <h1>I'm a post</h1>
            </div>
        );
    }
}
