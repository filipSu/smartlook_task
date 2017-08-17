import * as React from "react";
import {List, ListItem} from "material-ui/List";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import LinearProgress from "material-ui/LinearProgress";
import PostsStore from "../stores/PostsStore";
import * as PostsActions from "../actions/PostsActions";
import PostsListItem from "./PostsListItem";
import PostsAPI from "../apis/PostsAPI";
import UsersAPI from "../apis/UsersAPI";

export interface IPostsListState {
    isLoadingContent?: boolean;
    postsItems?: any[];
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
        PostsAPI.getAllSimple()
            .then((data) => {
                this.setState({posts: data, isLoadingContent: false})
            })
            .catch((error) => {
                console.error(error);
            });
    }

    private getPostItem(post: any) {
        return (
            <PostsListItem
                {...this.props}
                id={post.id}
                title={post.title}
                userId={post.userId}
                subtitle={PostsList.trimSubtitle(post.body)}
            />
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

    private static trimSubtitle(body: string) {
        return body.slice(0, PostsList.SUBTITLE_CHAR_COUNT);
    }

    render() {
        let loadingProgressBar;
        let isLoadingContent = this.state.isLoadingContent;
        /* if content is loaded, show progress bar on the top of the posts list*/
        if (isLoadingContent) {
            loadingProgressBar = <LinearProgress secondary={true} mode="indeterminate" className="col-xs-12"/>;
        }
        /* define posts list items rendering */
        let posts = this.state.posts || [];
        let postsItems = posts.map((post,i) => [
            this.getPostItem(post), //render list item
            this.getDivider(i)
        ]).reverse();
        return (
            <div className="row top-xs posts">
                {loadingProgressBar}
                <List className="col-xs-12 posts-list top-xs">
                    <Subheader className="col-xs-12">Latest posts</Subheader>
                    {postsItems}
                </List>
            </div>
        );
    }
}
