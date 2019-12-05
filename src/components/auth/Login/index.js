import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'


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
        const { usernameOrEmail, password } = this.state;

        return (
            <div className="login-wrapper">
                <div className="image-background"></div>
                <div className="login-form">
                    <Form className="form" >
                        <h1 className="form-title">Log In</h1>
                        <FormGroup>
                            <Label for="username">Username or Email address</Label>
                            <Input
                                id="username-or-email"
                                name="usernameOrEmail"
                                className="form-control"
                                type="text"
                                placeholder="Username or Email"
                                value={usernameOrEmail} 
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                id="password" 
                                name="password"
                                className="form-control" 
                                type="password" 
                                placeholder="Password"
                                value={password}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
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
                    </Form>
                </div>
        </div>
        )
    }
}

Login.propTypes = {
    login: PropTypes.func,
    auth: PropTypes.object,
    errors: PropTypes.object,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { login })(Login);