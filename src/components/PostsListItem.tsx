import * as React from "react";
import {ListItem} from "material-ui/List";
import KeyboardArrowDown from "material-ui/svg-icons/hardware/keyboard-arrow-down";
import UsersAPI from "../apis/UsersAPI";

export interface IPostsListItemState {
    userName: string;
}
export interface IPostsListItemProps {
    id: number;
    title: string;
    subtitle: string;
    userId: number;
    history?: any;
}

export default class PostsListItem extends React.Component<IPostsListItemProps, IPostsListItemState> {

    contextTypes = {
        router: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {userName: ''};
    }

    componentWillMount() {
        UsersAPI.getByID(this.props.userId)
            .then((data) => {
                this.setState({userName: data.name});
            })
            .catch((error) => {
                console.error(error);
            });
    }

    private static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    handleClick() {
        this.props.history.push('/post/'+this.props.id);
    }

    render() {
        let {id, title, subtitle} = this.props;
        let author = this.state.userName;
        return (
            <ListItem
                key={id}
                className="post-list-item"
                onClick={this.handleClick}
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
