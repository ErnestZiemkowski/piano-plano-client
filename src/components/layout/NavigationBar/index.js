import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavigationItem from '../NavigationItem';
import { logout } from '../../../actions/auth';

import './styles.scss';

class NavigationBar extends Component {

    handleLogout = () => {
        this.props.logout();
    }

    render() {
        return (
            <div className="navigation-bar-wrapper">
                <NavigationItem icon="fas fa-briefcase" itemTopic="Dashboard" />
                <NavigationItem icon="fas fa-table" itemTopic="Agile Board" />
                <NavigationItem icon="fas fa-medal" itemTopic="Daily Goals" />
                <NavigationItem icon="fas fa-user" itemTopic="Profile" />
                <NavigationItem onClickHandler={this.handleLogout} icon="fas fa-power-off" itemTopic="Logout" />
            </div>
        )    
    }
}

NavigationBar.propTypes = {
    logout: PropTypes.func.isRequired,
}

export default connect(null, { logout })(NavigationBar);