import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button, FormGroup, Label } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import { register } from "../../../actions/auth";

import './styles.scss';

const Register = ({ auth, history, register, errorsData }) => {

    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errors, setErrors ] = useState({});

    useEffect(() => {
        if(auth.isAuthenticated) history.push("/");
    }, []);

    useEffect(() => {
        setErrors(errors);
    }, [errorsData]);

    const handleSubmit = e => {
        e.preventDefault();

        const newUser = {
            username: username,
            email: email,
            password: password
        }

        register(newUser, history);
    };   
    
    return (
        <div className="register-wrapper">
            <div className="image-background"></div>
            <div className="register-form">
                <AvForm className="form">
                    <h1 className="form-title">Create account</h1>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <AvField 
                            id="username" 
                            name="username"
                            type="text" 
                            className="form-control" 
                            placeholder="Username"
                            value={username} 
                            onChange={e => setUsername(e.target.value)}
                            validate={{
                                required: {value: true, errorMessage: 'Username cannot be blank'},
                                minLength: {value: 3, errorMessage: 'Username must be between 5 and 75 characters'},
                                maxLength: {value: 50}
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="emai1">Email address</Label>
                        <AvField 
                            id="email" 
                            name="email"
                            type="email" 
                            className="form-control" 
                            placeholder="Enter email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                            validate={{
                                emai1: true
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <AvField 
                            id="password" 
                            name="password"
                            type="password" 
                            className="form-control" 
                            placeholder="********"
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                            validate={{
                                required: {value: true, errorMessage: 'Password cannot be blank'},
                                minLength: {value: 6, errorMessage: 'Password must be between 6 and 100 characters'},
                                maxLength: {value: 100}
                            }}
                        />
                    </FormGroup>
                    { !errors.message ? '' : <p className="text-danger">Invalid Credentials</p> }
                    <FormGroup>
                        <Link to="/login" >
                            <small className="">Already have an account? Login</small>
                        </Link>
                    </FormGroup>
                    <Button 
                        type="submit" 
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Register
                    </Button>
                </AvForm>
            </div>
        </div>
    )
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
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
  
export default connect(mapStateToProps, { register })(withRouter(Register));