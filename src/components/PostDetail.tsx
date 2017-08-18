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
import Dialog from 'material-ui/Dialog';

export interface IPostDetailState {
    isLoadingPost?: boolean;
    post?: any;
    commentsExpanded?: boolean;
    user?: any;
    comments?: any[];
    id?: number;
    userDetailOpened?: boolean;
}
export interface IPostDetailProps {
    history?: any;
    params:any
}

export default class PostDetail extends React.Component<IPostDetailProps, IPostDetailState> {

    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
        this.handleToggleComments = this.handleToggleComments.bind(this);
        this.handleUserDetailOpen = this.handleUserDetailOpen.bind(this);
        this.handleUserDetailClose = this.handleUserDetailClose.bind(this);
        this.state = {
            commentsExpanded: false,
            isLoadingPost: true,
            id: props.match.params.id,
            userDetailOpened: false
        };
    }

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
                console.error(error);
            });
    }

    private loadUser(userId: number) {
        UsersAPI.getByID(userId)
            .then((data) => {
                this.setState({user: data});
            })
            .catch((error) => {
                console.error(error);
            });
    }

    private loadComments(postId: number) {
        CommentsAPI.getByPostID(postId)
            .then((data) => {
                this.setState({
                    comments: data,
                    isLoadingPost: false
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleToggleComments() {
        this.setState({commentsExpanded: !this.state.commentsExpanded});
    }

    handleBack() {
        this.props.history.push('/');
    }

    handleUserDetailOpen() {
        this.setState({userDetailOpened: true});
    }

    handleUserDetailClose() {
        this.setState({userDetailOpened: false});
    }

    private static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        let post = this.state.post;
        let user = this.state.user;
        let comments = this.state.comments;
        let userDetailOpened = this.state.userDetailOpened;

        let title = 'Loading', body = '';
        if (post) {
            title = post.title;
            body = post.body;
        }
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
                        <CommentSubmitForm/>
                    </CardText>
                    <Divider/>
                    <CardText expandable={true} className="col-xs-12 row post-comments-wrapper">
                        <CommentsList comments={comments}/>
                    </CardText>
                </Card>
        );
    }
}
