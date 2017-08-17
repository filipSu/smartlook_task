import * as React from "react";
import {ListItem} from "material-ui/List";
import KeyboardArrowDown from "material-ui/svg-icons/hardware/keyboard-arrow-down";

export interface IPostsListItemState {}
export interface IPostsListItemProps {
    id: number;
    title: string;
    subtitle: string;
    author: string;
}

export default class PostsListItem extends React.Component<IPostsListItemProps, IPostsListItemState> {

    constructor(props) {
        super(props);
    }

    private static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        let {id, title, subtitle, author} = this.props;
        return (
            <ListItem
                key={id}
                className="post-list-item"
                primaryText={PostsListItem.capitalizeFirstLetter(title)}
                secondaryText={
                    <div className="post-list-item-content">
                        <p>{subtitle}</p>
                        <p className="posted-by">
                            post by <span>{author}</span>
                        </p>
                    </div>
                }
                secondaryTextLines={2}
                rightIcon={<KeyboardArrowDown className="middle"/>}
            />
        );
    }
}
