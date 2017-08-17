import * as React from "react";
import {List, ListItem} from "material-ui/List";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import LinearProgress from "material-ui/LinearProgress";
import PostsStore from "../stores/PostsStore";
import UsersStore from "../stores/UsersStore";
import PostsListItem from "./PostsListItem";

export interface IPostsListState {
    isLoadingContent: boolean;
    posts: any[];
}
export interface IPostsListProps {}

export default class PostsList extends React.Component<IPostsListProps, IPostsListState> {

    private static SUBTITLE_CHAR_COUNT = 120;

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
            posts: PostsStore.getAll()
        });
    }

    private getPostItem(post: any) {
        //get user's info
        let user = UsersStore.get(post.userId);
        return (
            <PostsListItem
                id={post.id}
                title={post.title}
                subtitle={PostsList.trimSubtitle(post.body)}
                author={user !== undefined ? user.name : 'Unknown'}
            />
        );
    }

    private getDivider(postsCount: number, current: number) {
        //if given item is NOT last one, return divider element
        if ((postsCount - 1) !== current) {
            return (<Divider inset={true} />);
        }else {
            return undefined;
        }
    }

    private static trimSubtitle(body: string) {
        return body.slice(0, PostsList.SUBTITLE_CHAR_COUNT);
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
        let postsItems = posts.reverse().map((post,i) => [
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
