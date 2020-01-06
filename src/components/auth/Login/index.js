import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Button, FormGroup, Label } from 'reactstrap'
import { AvForm, AvField } from 'availity-reactstrap-validation';

import { login } from "../../../actions/auth";

import './styles.scss';


const Login = ({ login, auth, history, errorsData }) => {

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if(auth.isAuthenticated) history.push("/");
    }, []);
    
    useEffect(() => {
        if (auth.isAuthenticated) history.push("/");
    }, [auth.isAuthenticated]);

    useEffect(() => {
        setErrors(errors);
    }, [errorsData]);

    const handleSubmit = e => {
        e.preventDefault();
        const userData = {
            username: usernameOrEmail,
            password: password
        };

        login(userData);
    };

    return (
        <div className="login-wrapper">
            <div className="image-background"></div>
            <div className="login-form">
                <AvForm className="form" >
                    <h1 className="form-title">Log In</h1>
                    <FormGroup>
                        <Label for="username">Username or Email address</Label>
                        <AvField
                            id="username-or-email"
                            type="text"
                            name="usernameOrEmail"
                            className="form-control"
                            placeholder="Username or Email"
                            value={usernameOrEmail} 
                            onChange={e => setUsernameOrEmail(e.target.value)}
                            validate={{
                                required: {value: true, errorMessage: 'Username or email cannot be blank'},
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <AvField
                            id="password" 
                            type="password" 
                            name="password"
                            className="form-control" 
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            validate={{
                                required: {value: true, errorMessage: 'Password cannot be blank'},
                            }}
                        />
                    </FormGroup>
                    { !errors.message ? '' : <p className="text-danger">Invalid Credentials</p> }
                    <FormGroup>
                        <Link to="/register" >
                            <small className="">Don't have an account? Register</small>
                        </Link>
                    </FormGroup>
                    <Button 
                        type="button" 
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Login
                    </Button>
                </AvForm>
            </div>
    </div>
    )
};

Login.propTypes = {
    login: PropTypes.func,
    auth: PropTypes.object,
    history: PropTypes.object.isRequired,
    errorsData: PropTypes.shape({
        timestamp: PropTypes.string,
        status: PropTypes.number,
        error: PropTypes.string,
        message: PropTypes.string,
        path: PropTypes.string,
    }),
};

const mapStateToProps = state => ({
    auth: state.auth,
    errorsData: state.errors
});

export default connect(mapStateToProps, { login })(Login);