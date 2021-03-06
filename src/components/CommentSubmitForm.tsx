import * as React from "react";
import FlatButton from 'material-ui/FlatButton';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

export interface ICommentSubmitFormState {
    name?: string;
    email?: string;
    body?: string;
}
export interface ICommentSubmitFormProps {
    onSubmit: any;
}
/**
 * Creates form using MaterialUI form elements and validates them using react-material-ui-form-validator
 * */
export default class CommentSubmitForm extends React.Component<ICommentSubmitFormProps, ICommentSubmitFormState> {

    constructor(props) {
        super(props);
        /* assign handlers */
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        /* setup default state*/
        this.state = {
            name: '',
            email: '',
            body: ''
        };
    }
    /**
     * Set state's name variable, if validator thinks it is acceptable
     * */
    handleNameChange(event) {
        const name = event.target.value;
        this.setState({ name: name });
    }
    /**
     * Set state's email variable, if validator thinks it is acceptable
     * */
    handleEmailChange(event) {
        const email = event.target.value;
        this.setState({ email: email });
    }
    /**
     * Set state's body variable, if validator thinks it is acceptable
     * */
    handleBodyChange(event) {
        const body = event.target.value;
        this.setState({ body: body });
    }
    /**
     * Pass information from form to onSubmit function given in props
     * */
    handleSubmit() {
        this.props.onSubmit({
            name: this.state.name,
            email: this.state.email,
            body: this.state.body
        });
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
