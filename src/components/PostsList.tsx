import * as React from "react";
import {List, ListItem} from "material-ui/List";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import LinearProgress from "material-ui/LinearProgress";
import PostsListItem from "./PostsListItem";
import PostsAPI from "../apis/PostsAPI";

export interface IPostsListState {
    isLoadingContent?: boolean;
    postsItems?: any[];
    posts: any[];
}
export interface IPostsListProps {}

/**
 * Creates MaterialUI List with posts.
 * */
export default class PostsList extends React.Component<IPostsListProps, IPostsListState> {
    /* subtitle is trimmed from post body to this length*/
    private static SUBTITLE_CHAR_COUNT = 120;

    constructor(props) {
        super(props);
        this.state = {
            isLoadingContent: true,
            posts: []
        };
    }
    /**
     * Gets posts from server before component mounts and saves them to state.
     * */
    componentWillMount() {
        PostsAPI.getAll()
            .then((data) => {
                this.setState({posts: data, isLoadingContent: false})
            })
            .catch((error) => {
                console.error(error);
            });
    }
    /**
     * Creates new list item from given post information
     * @return PostsListItem element
     * */
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
    /**
     * Creates MaterialUI Divider if given index is not 0.
     * Used to separate list items except the last one (0 because
     * list will be reversed)
     * */
    private getDivider(current: number) {
        //if given item is first one, return divider element
        // first one because array will be reversed
        if (current !== 0) {
            return (<Divider />);
        }else {
            return undefined;
        }
    }
    /**
     * Trims given string to PostsList.SUBTITLE_CHAR_COUNT length
     * */
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
        /* create list items and dividers for posts */
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
