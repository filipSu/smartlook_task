import * as React from "react";
import {ListItem} from "material-ui/List";

export interface ICommentsListItemState {}
export interface ICommentsListItemProps {
    id: number;
    name: string;
    email: string;
    body: string;
}

export default class CommentsListItem extends React.Component<ICommentsListItemProps, ICommentsListItemState> {

    constructor(props) {
        super(props);
    }

    render() {
        let {id, name, email, body} = this.props;
        return (
            <ListItem
                key={id}
                className="comments-list-item"
                disabled={true}
                primaryText={<p className="comment-primary-text">{body}</p>}
                secondaryText={
                    <p className="comment-secondary-text">
                        <span>{name}</span> <br />{email}
                    </p>
                }
                secondaryTextLines={2}
            />
        );
    }
}
