import * as React from "react";
import FlatButton from 'material-ui/FlatButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {List, ListItem} from "material-ui/List";
import Avatar from 'material-ui/Avatar';
import Person from 'material-ui/svg-icons/social/person';
import {Card, CardActions, CardHeader, CarMedia, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Comment from 'material-ui/svg-icons/communication/comment';
import Share from 'material-ui/svg-icons/social/share';
import Badge from 'material-ui/Badge';
import Theme from "../misc/Theme";
import CommentsList from "./CommentsList";
import Divider from "material-ui/Divider";
import CommentSubmitForm from "./CommentSubmitForm";
import PostsAPI from "../apis/PostsAPI";
import UsersAPI from "../apis/UsersAPI";
import CommentsAPI from "../apis/CommentsAPI";
import UserDetailDialog from "./UserDetailDialog";
import Snackbar from 'material-ui/Snackbar';

export interface IPostDetailState {
    isLoadingPost?: boolean;
    post?: any;
    commentsExpanded?: boolean;
    user?: any;
    comments?: any[];
    id?: number;
    userDetailOpened?: boolean;
    snackBarOpen?: boolean;
    snackBarMessage?: string;
}
export interface IPostDetailProps {
    history?: any;
    params:any
}
/**
 * Creates components representing detailed information about post specified in by ID in route(URL)
 * */
export default class PostDetail extends React.Component<IPostDetailProps, IPostDetailState> {
    /* error shown when server API call is not successful */
    private static LOAD_ERROR_MESSAGE = "Could not load data. Try refreshing the page";
    private static POST_ERROR_MESSAGE = "Could not post comment. Try later";

    constructor(props) {
        super(props);
        /* assign handlers*/
        this.handleBack = this.handleBack.bind(this);
        this.handleToggleComments = this.handleToggleComments.bind(this);
        this.handleUserDetailOpen = this.handleUserDetailOpen.bind(this);
        this.handleUserDetailClose = this.handleUserDetailClose.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
        /* set default state */
        this.state = {
            commentsExpanded: false,
            isLoadingPost: true,
            id: props.match.params.id,
            userDetailOpened: false,
            snackBarOpen: false,
            snackBarMessage: ''
        };
    }
    /**
     * Gets post info from server before component mounts and saves them to state.
     * Afterwards gets info about user and post comments
     * */
    componentWillMount() {
        PostsAPI.getByID(this.state.id)
            .then((data) => {
                this.setState({
                    post: data
                });
                this.loadUser(data.userId);
                this.loadComments(data.id);
            })
            .catch((error) => {
                this.showLoadError(PostDetail.LOAD_ERROR_MESSAGE);
            });
    }
    /**
     * Gets user info from server and saves them to state.
     * */
    private loadUser(userId: number) {
        UsersAPI.getByID(userId)
            .then((data) => {
                this.setState({user: data});
            })
            .catch((error) => {
                this.showLoadError(PostDetail.LOAD_ERROR_MESSAGE);
            });
    }
    /**
     * Gets comments from server and saves them to state.
     * */
    private loadComments(postId: number) {
        CommentsAPI.getByPostID(postId)
            .then((data) => {
                this.setState({
                    comments: data,
                    isLoadingPost: false
                });
            })
            .catch((error) => {
                this.showLoadError(PostDetail.LOAD_ERROR_MESSAGE);
            });
    }
    /**
     * Opens MaterialUI SnackBar and shows PostDetail.LOAD_ERROR_MESSAGE message
     * */
    private showLoadError(message: string) {
        this.setState({
            snackBarOpen: true,
            snackBarMessage: message
        });
    }
    /**
     * Shows/hides comments according to state variable
     * */
    handleToggleComments() {
        this.setState({commentsExpanded: !this.state.commentsExpanded});
    }
    /**
     * Redirects to main route
     * */
    handleBack() {
        this.props.history.push('/');
    }
    /**
     * Opens UserDetailDialog
     * */
    handleUserDetailOpen() {
        this.setState({userDetailOpened: true});
    }
    /**
     * Closes UserDetailDialog
     * */
    handleUserDetailClose() {
        this.setState({userDetailOpened: false});
    }
    /**
     * Creates new comment by calling API. If successful, new comment is pushed to other comments
     * */
    handleCommentSubmit(comment: any) {
        CommentsAPI.postComment(this.state.post.id, comment.name, comment.email, comment.body)
            .then((data) => {
                this.setState({
                    comments: this.state.comments.concat(data)
                });
            })
            .catch((error) => {
                this.showLoadError(PostDetail.POST_ERROR_MESSAGE);
            });
    }
    /**
     * Closes MaterialUI SnackBar end resets it's message
     * */
    handleSnackBarClose() {
        this.setState({
            snackBarOpen: false,
            snackBarMessage: ''
        })
    }
    /**
     * Capitalizes first letter of given string
     * */
    private static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        let post = this.state.post;
        let user = this.state.user;
        let comments = this.state.comments;
        let userDetailOpened = this.state.userDetailOpened;
        let snackBarOpen = this.state.snackBarOpen;
        let snackBarMessage = this.state.snackBarMessage;

        let title = 'Loading', body = '';
        /* if post exist, specify title and body */
        if (post) {
            title = post.title;
            body = post.body;
        }
        //TODO separate into smaller components
        return (
                <Card
                    expanded={this.state.commentsExpanded}
                    className="col-xs-12 row top-xs post-detail">
                    <div className="col-xs-12 start-xs">
                        <FlatButton
                            label="All posts"
                            onClick={this.handleBack}
                            labelPosition="after"
                            icon={<ArrowBack />}
                        />
                    </div>
                    <CardTitle
                        style={{paddingLeft: 24, paddingRight: 24}}
                        titleStyle={{fontSize: 32}}
                        className="col-xs-12"
                        title={PostDetail.capitalizeFirstLetter(title) || ''} />
                    <CardText style={{paddingLeft: 24, paddingRight: 24, fontSize: 16}}>
                        {PostDetail.capitalizeFirstLetter(body)}
                    </CardText>

                    <div className="col-xs-12 row middle-xs">
                        <div className="col-xs-12 start-xs col-sm-6 middle-xs">
                            <CardHeader
                                style={{paddingLeft: 8,cursor: 'pointer'}}
                                avatar={<Avatar icon={<Person />} />}
                                title={user ? user.name : 'John Snow'}
                                onClick={this.handleUserDetailOpen}
                                titleStyle={{color: Theme.rawTheme.palette.accent1Color}}
                                subtitle={user ? user.email : 'john.snow@example.com'}
                            />
                            <UserDetailDialog
                                user={user}
                                opened={userDetailOpened}
                                onClose={this.handleUserDetailClose}/>
                        </div>
                        <div className="col-xs-12 start-xs col-sm-6 end-sm" style={{paddingLeft: '0'}}>
                            <CardActions>
                                <Badge
                                    badgeContent={comments ? comments.length : '-'}
                                    secondary={true}
                                    badgeStyle={{top: -6, right: -6}}
                                    style={{padding: 0}}
                                >
                                    <IconButton
                                        onClick={this.handleToggleComments}
                                        tooltipPosition="top-center"
                                        tooltip={this.state.commentsExpanded ? 'Hide comments' : 'Show comments'}>
                                        <Comment
                                            hoverColor={Theme.rawTheme.palette.accent1Color}
                                            color={Theme.rawTheme.palette.buttonColor} />
                                    </IconButton>
                                </Badge>
                                <IconButton
                                    style={{padding: 0,width: 36, height: 36}}
                                    tooltipPosition="top-center"
                                    tooltip="Share post">
                                    <Share
                                        hoverColor={Theme.rawTheme.palette.accent1Color}
                                        color={Theme.rawTheme.palette.buttonColor} />
                                </IconButton>
                            </CardActions>
                        </div>
                    </div>
                    <Divider/>
                    <CardText expandable={true} className="col-xs-12 row" style={{paddingTop: 0}}>
                        <CommentSubmitForm onSubmit={this.handleCommentSubmit} />
                    </CardText>
                    <Divider/>
                    <CardText expandable={true} className="col-xs-12 row post-comments-wrapper">
                        <CommentsList comments={comments}/>
                    </CardText>
                    <Snackbar
                        open={snackBarOpen}
                        message={snackBarMessage}
                        autoHideDuration={4000}
                        onRequestClose={this.handleSnackBarClose}
                    />
                </Card>
        );
    }
}
