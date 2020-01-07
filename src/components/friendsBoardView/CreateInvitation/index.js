import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    FormGroup, 
    Label,
    Button
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import { createToast } from '../../../actions/toasts';
import { createInvitation } from '../../../actions/invitations';

import "./styles.scss";


const CreateInvitation = ({ createInvitation, createToast }) => {

    const [email, setEmail] = useState('');

    const handleChange = e => {
        setEmail(e.target.value);
    }

    const handleSubmit = () => {
        const invitation = {
            receiverEmail: email
        };
        const toast = {
            header: 'Success',
            body: 'Invitation has been sent. As soon as reciever accept your request, you will be friends. Being friends means you can add each other to their projects',
            type: 'success'
        };

        createInvitation(invitation);
        createToast(toast);
        setEmail('');
    }

    return (
        <AvForm className="invitation-form">
            <FormGroup>
                <Label for="email-invitation">
                    <h5>Invite friend by email</h5>
                </Label>
                <AvField 
                    name="email"
                    type="email" 
                    bsSize="sm"
                    value={email}
                    placeholder="email@email.com"
                    onChange={handleChange}
                    validate={{
                        email: {value: true, errorMessage: 'Input value must be type of email'}
                    }}
                />
            </FormGroup>
            <Button 
                color="info"
                className="btn-sm"
                onClick={handleSubmit}
            >
                Send
            </Button>
        </AvForm>
    )
};
CreateInvitation.propTypes = {
    createInvitation: PropTypes.func.isRequired,
}

export default connect(null, { createInvitation, createToast })(CreateInvitation);