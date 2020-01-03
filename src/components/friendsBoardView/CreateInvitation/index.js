import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    FormGroup, 
    Label,
    Button
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import { createInvitation } from '../../../actions/invitations';

import "./styles.scss";

export class CreateInvitation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errors: {}
        };
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) this.setState({ errors: nextProps.errors });
    }

    handleClick = () => this.setState({ errors: {} });

    handleChange = e => this.setState({[e.target.name]: e.target.value});

    handleSubmit = () => {
        const { email } = this.state;
        const { createInvitation } = this.props;

        const invitation = {
            receiverEmail: email
        };

        createInvitation(invitation);
        this.setState({email: ''})
    } 

    render() {
        const { email, errors } = this.state;
        return (
            <AvForm className="invitation-form">
                <FormGroup>
                    <Label for="email-invitation">
                        <h5>
                            Invite friend by email
                        </h5>
                    </Label>
                    <AvField 
                        name="email"
                        type="email" 
                        bsSize="sm"
                        value={email}
                        placeholder="email@email.com"
                        onClick={this.handleClick}
                        onChange={this.handleChange}
                        validate={{
                            email: {value: true, errorMessage: 'Input value must be type of email'}
                        }}
                    />
                </FormGroup>
                { !errors.message ? '' : <small className="text-danger error-message">Invitation with this email already exists!</small> }
                <Button 
                    color="info"
                    className="btn-sm"
                    onClick={this.handleSubmit}
                >
                    Send
                </Button>
            </AvForm>
        )
    }
}

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, { createInvitation })(CreateInvitation)