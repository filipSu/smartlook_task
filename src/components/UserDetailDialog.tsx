import * as React from "react";
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Theme from "../misc/Theme";
import Close from 'material-ui/svg-icons/navigation/close';
import Email from 'material-ui/svg-icons/communication/email';
import Phone from 'material-ui/svg-icons/communication/phone';
import Web from 'material-ui/svg-icons/av/web';
import Home from 'material-ui/svg-icons/action/home';
import Avatar from 'material-ui/Avatar';
import Person from 'material-ui/svg-icons/social/person';
import {List, ListItem} from 'material-ui/List';

export interface IUserDetailDialogState {
}
export interface IUserDetailDialogProps {
    opened: boolean;
    onClose: any;
    user: any;
}

const customContentStyle = {
    width: '350px',
    maxWidth: 'none',
};

export default class UserDetailDialog extends React.Component<IUserDetailDialogProps, IUserDetailDialogState> {

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.onClose();
    }

    render() {
        let {opened, user} = this.props;
        let name, email, phone, website, city;
        if (user) {
            name = user.name;
            email = user.email;
            phone = user.phone;
            website = user.website;
            city = user.address.city;
        }
        return (
            <Dialog
                modal={false}
                overlayStyle={{padding: 0}}
                paperClassName="user-dialog-wrapper container"

                contentStyle={customContentStyle}
                onRequestClose={this.handleClose}

                open={opened}
            >
                <div className="row top-xs dialog">
                    <div className="col-xs-12 row user-dialog-content">
                        <div className="col-xs-12 row middle-xs start-xs">
                            <div className="col-xs-2">
                                <IconButton
                                    onClick={this.handleClose}
                                    iconStyle={{color: Theme.rawTheme.palette.alternateTextColor}}

                                    tooltip="Close">
                                    <Close />
                                </IconButton>
                            </div>
                            <div className="col-xs-8">
                                <span className="header-text">Profile</span>
                            </div>
                        </div>
                        <div className="col-xs-12 row middle-xs center-xs">
                            <div className="col-xs-12">
                                <Avatar
                                    icon={<Person />}
                                    size={88}
                                />
                            </div>
                        </div>
                        <div className="col-xs-12 row middle-xs center-xs">
                            <p className="col-xs-12">{name}</p>
                        </div>
                        <div className="col-xs-12 row user-info">

                            <List className="col-xs-12">
                                <ListItem disabled={true} primaryText={email} leftIcon={<Email />} />
                                <ListItem disabled={true} primaryText={phone} leftIcon={<Phone />} />
                                <ListItem disabled={true} primaryText={website} leftIcon={<Web />} />
                                <ListItem disabled={true} primaryText={city} leftIcon={<Home />} />
                            </List>
                        </div>
                    </div>

                </div>
            </Dialog>
        );
    }
}
