import * as React from "react";
import FlatButton from 'material-ui/FlatButton';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

export interface ICommentSubmitFormState {
    name?: string;
    email?: string;
    body?: string;
}
export interface ICommentSubmitFormProps {}

export default class CommentSubmitForm extends React.Component<ICommentSubmitFormProps, ICommentSubmitFormState> {

    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: '',
            email: '',
            body: ''
        };
    }

    handleNameChange(event) {
        const name = event.target.value;
        this.setState({ name: name });
    }

    handleEmailChange(event) {
        const email = event.target.value;
        this.setState({ email: email });
    }

    handleBodyChange(event) {
        const body = event.target.value;
        this.setState({ body: body });
    }

    handleSubmit() {
    }

    render() {
        let {name, email, body} = this.state;
        return (
            <ValidatorForm
                ref="form"
                className="col-xs-12 row"
                onSubmit={this.handleSubmit}
                onError={errors => console.error(errors)}
            >
                <div className="col-xs-12 col-sm-6">
                    <TextValidator
                        floatingLabelText="Name"
                        onChange={this.handleNameChange}
                        name="name"
                        hintText="John Snow"
                        value={name}
                        validators={['required']}
                        errorMessages={['Don\'t be anonymous']}
                    />
                </div>
                <div className="col-xs-12 col-sm-6">
                    <TextValidator
                        floatingLabelText="Email"
                        onChange={this.handleEmailChange}
                        name="email"
                        hintText="john.snow@example.com"
                        value={email}
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'Email is not valid']}
                    />

                </div>
                <div className="col-xs-12">
                    <TextValidator
                        floatingLabelText="Message"
                        multiLine={true}
                        fullWidth={true}
                        onChange={this.handleBodyChange}
                        name="body"
                        hintText="Tell others, what do you think"
                        value={body}
                        validators={['required']}
                        errorMessages={['Didn\'t you forget to write something?' ]}
                    />
                </div>
                <div className="col-xs-12 end-xs">
                    <FlatButton type="submit" label="Post comment" primary={true} />
                </div>
            </ValidatorForm>
        );
    }
}
