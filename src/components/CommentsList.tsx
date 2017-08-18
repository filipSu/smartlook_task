import * as React from "react";
import {List, ListItem} from "material-ui/List";
import Subheader from "material-ui/Subheader";
import CommentsListItem from "./CommentsListItem";
import Divider from "material-ui/Divider";

export interface ICommentsListState {}
export interface ICommentsListProps {
    comments: any[];
}

export default class CommentsList extends React.Component<ICommentsListProps, ICommentsListState> {

    constructor(props) {
        super(props);
    }

    getCommentItem(comment: any) {
        return (
            <CommentsListItem
                id={comment.id}
                name={comment.name}
                email={comment.email}
                body={comment.body}/>
        );
    }

    private getDivider(current: number) {
        //if given item is first one, return divider element
        // first one because array will be reversed
        if (current !== 0) {
            return (<Divider />);
        }else {
            return undefined;
        }
    }

    render() {
        let comments = this.props.comments;
        let commentsItems;
        if (comments) {
            commentsItems = comments.map((comment,i) => [
                this.getCommentItem(comment), //render list item
                this.getDivider(i)
            ]).reverse();
        }
        return (
            <List className="col-xs-12 comments-list" style={{padding: 0}}>
                <Subheader className="col-xs-12">Comments</Subheader>
                {commentsItems}
            </List>
        );
    }
}
