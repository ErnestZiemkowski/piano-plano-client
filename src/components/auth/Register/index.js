import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    
    

    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { username, email, password } = this.state;
        const { history } = this.props;

        const newUser = {
            username: username,
            email: email,
            password: password
        }

        this.props.register(newUser, history);
    };   
    
    render() {
        const { username, email, password } = this.state;

        return (
            <div className="wrapper">
                <div className="image-background"></div>
                <div className="register-form">
                    <form className="form" onSubmit={this.handleSubmit}>
                        <h1 className="form-title">Create account</h1>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input 
                                id="username" 
                                name="username"
                                type="text" 
                                className="form-control" 
                                placeholder="Username"
                                value={username} 
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emai1">Email address</label>
                            <input 
                                id="email" 
                                name="email"
                                type="email" 
                                className="form-control" 
                                placeholder="Enter email" 
                                value={email} 
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                id="password" 
                                name="password"
                                type="password" 
                                className="form-control" 
                                placeholder="Password"
                                value={password} 
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <Link to="/login" >
                                <small className="">Already have an account? Login</small>
                            </Link>
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
  
export default connect(mapStateToProps, { register })(withRouter(Register));