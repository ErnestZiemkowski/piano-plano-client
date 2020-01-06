import React, { useState, useEffect } from 'react';
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

const CreateInvitation = ({ errorsData, createInvitation }) => {

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setErrors(errorsData);
    }, [errorsData])

    const handleChange = e => {
        setEmail(e.target.value);
        setErrors({});
    }

    const handleSubmit = () => {
        const invitation = {
            receiverEmail: email
        };

        createInvitation(invitation);
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
            { !errors.message ? '' : <small className="text-danger error-message">Invitation with this email already exists!</small> }
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
    errorsData: PropTypes.shape({
        timestamp: PropTypes.string,
        status: PropTypes.number,
        error: PropTypes.string,
        message: PropTypes.string,
        path: PropTypes.string,
    }),
}

const mapStateToProps = state => ({
    errorsData: state.errors
});

export default connect(mapStateToProps, { createInvitation })(CreateInvitation)