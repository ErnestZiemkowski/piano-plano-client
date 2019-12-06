import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

import './styles.scss';

import { register } from "../../../actions/auth";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            errors: {}
        };
    }

    componentDidMount() {
        const { history } = this.props;
        if(this.props.auth.isAuthenticated) history.push("/");
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) this.setState({ errors: nextProps.errors });
    }

    handleChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { username, email, password } = this.state;
        const { history, register } = this.props;

        const newUser = {
            username: username,
            email: email,
            password: password
        }

        register(newUser, history);
    };   
    
    render() {
        const { username, email, password } = this.state;

        return (
            <div className="register-wrapper">
                <div className="image-background"></div>
                <div className="register-form">
                    <Form className="form" >
                        <h1 className="form-title">Create account</h1>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input 
                                id="username" 
                                name="username"
                                type="text" 
                                className="form-control" 
                                placeholder="Username"
                                value={username} 
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="emai1">Email address</Label>
                            <Input 
                                id="email" 
                                name="email"
                                type="email" 
                                className="form-control" 
                                placeholder="Enter email" 
                                value={email} 
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input 
                                id="password" 
                                name="password"
                                type="password" 
                                className="form-control" 
                                placeholder="Password"
                                value={password} 
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Link to="/login" >
                                <small className="">Already have an account? Login</small>
                            </Link>
                        </FormGroup>
                        <Button 
                            type="submit" 
                            color="primary"
                            onClick={this.handleSubmit}
                        >
                            Register
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
  
export default connect(mapStateToProps, { register })(withRouter(Register));