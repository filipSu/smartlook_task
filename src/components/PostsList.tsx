import * as React from "react";
import {List, ListItem} from "material-ui/List";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import Person from "material-ui/svg-icons/social/person";
import KeyboardArrowDown from "material-ui/svg-icons/hardware/keyboard-arrow-down";
import LinearProgress from "material-ui/LinearProgress";
import Avatar from "material-ui/Avatar";
import PostsAPI from "../services/PostsAPI";
import Post from "../models/Post";
import Utilities from "../misc/Utilities"

export interface IPostsListState {
    isLoadingContent: boolean;
    posts: Post[]; //TODO change to POST object
}
export interface IPostsListProps {}

export default class PostsList extends React.Component<IPostsListProps, IPostsListState> {

    constructor(props) {
        super(props);
        this.state = {
            isLoadingContent: true,
            posts: []
        };
    }

    componentWillMount() {
        this.setState({
            isLoadingContent: false,
            posts: PostsAPI.getPosts()
        })
    }

    private getPostItem(post: Post) {
        return (
            <ListItem
                key={post.id}
                className="post-list-item"
                primaryText={Utilities.capitalizeFirstLetter(post.title)}
                secondaryText={
                    <div className="post-list-item-content">
                        <p>{post.body}</p>
                        <p className="posted-by">
                            post by <span>{post.userId}</span>
                        </p>
                    </div>
                }
                secondaryTextLines={2}
                rightIcon={<KeyboardArrowDown className="middle"/>}
            />
        );
    }

    private getDivider(postsCount: number, current: number) {
        if ((postsCount - 1) !== current) {
            return (<Divider inset={true} />);

        }else {
            return null;
        }
    }

    render() {
        let loadingProgressBar = null;
        let isLoadingContent = this.state.isLoadingContent;
        /* if content is loaded, show progress bar on the top of the posts list*/
        if (isLoadingContent) {
            loadingProgressBar = <LinearProgress secondary={true} mode="indeterminate" className="col-xs-12"/>;
        }
        /* define posts list items rendering */
        let posts = this.state.posts;
        let postsItems = posts.map((post,i) => [
            this.getPostItem(post), //render list item
            this.getDivider(posts.length, i)
        ]);
        return (
            <div className="row top-xs posts">
                {loadingProgressBar}
                <List className="col-xs-12 posts-list">
                    <Subheader className="col-xs-12">Latest posts</Subheader>
                    {postsItems}
                </List>
            </div>
        );
    }
}
