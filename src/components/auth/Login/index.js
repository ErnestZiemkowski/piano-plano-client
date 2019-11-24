import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

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
        if(this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    
        if (nextProps.errors) {
            this.setState({
            errors: nextProps.errors
            });
        }
    }    

    handleChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { usernameOrEmail, password } = this.state;
        const userData = {
            username: usernameOrEmail,
            password: password
        };

        this.props.login(userData);
    };

    render() {
        const { usernameOrEmail, password } = this.state;

        return (
            <div className="wrapper">
                <div className="image-background"></div>
                <div className="login-form">
                    <form className="form" onSubmit={this.handleSubmit}>
                        <h1 className="form-title">Log In</h1>
                        <div className="form-group">
                            <label htmlFor="username">Username or Email address</label>
                            <input 
                                id="username-or-email"
                                name="usernameOrEmail"
                                className="form-control"
                                type="text"
                                placeholder="Username or Email"
                                value={usernameOrEmail} 
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password" 
                                name="password"
                                className="form-control" 
                                type="password" 
                                placeholder="Password"
                                value={password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <Link to="/register" >
                                <small className="">Don't have an account? Register</small>
                            </Link>
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
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