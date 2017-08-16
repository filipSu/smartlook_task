import * as React from "react";
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Person from 'material-ui/svg-icons/social/person';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import Avatar from 'material-ui/Avatar';

export interface IPostsState {}
export interface IPostsProps {}

export default class Posts extends React.Component<IPostsProps, IPostsState> {

    render() {
        return (
            <div className="row top-xs posts">
                <List className="col-xs-12">
                    <Subheader>Latest posts</Subheader>
                    <ListItem
                        className="post-list-item"
                        leftAvatar={<Avatar icon={<Person />} />}
                        primaryText="Voluptas blanditiis repellendus animi ducimus error sapiente et suscipit sdsdg"
                        secondaryText={
                            <div className="post-list-item-content">
                                <p>
                                    Ut dicta possimus sint mollitia voluptas commodi quo doloremque\niste
                                </p>
                                <p className="posted-by">
                                    post by <span>John Snow</span>
                                </p>
                            </div>
                        }
                        secondaryTextLines={3}
                        rightIcon={<KeyboardArrowDown className="middle"/>}
                    />
                    <Divider inset={true} />
                </List>
            </div>
        );
    }
}
