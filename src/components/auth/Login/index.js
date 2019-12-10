import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Button, FormGroup, Label } from 'reactstrap'
import { AvForm, AvField } from 'availity-reactstrap-validation';

import './styles.scss';

import { login } from "../../../actions/auth";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            usernameOrEmail: '',
            password: '',
            errors: {}
        };
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) this.props.history.push("/");
    }
    
    componentWillReceiveProps(nextProps) {
        const { history } = this.props;
        if (nextProps.auth.isAuthenticated) history.push("/");
        if (nextProps.errors) this.setState({ errors: nextProps.errors });
    }    

    handleChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { usernameOrEmail, password } = this.state;
        const { login } = this.props;
        const userData = {
            username: usernameOrEmail,
            password: password
        };

        login(userData);
    };

    render() {
        const { usernameOrEmail, password, errors } = this.state;

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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
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
                            onClick={this.handleSubmit}
                        >
                            Login
                        </Button>
                    </AvForm>
                </div>
        </div>
        )
    }
}

Login.propTypes = {
    login: PropTypes.func,
    auth: PropTypes.object,
    history: PropTypes.object.isRequired,
    errors: PropTypes.object,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { login })(Login);