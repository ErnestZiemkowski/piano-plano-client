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
        const { isNavigationSidebarOpen } = this.props;
        
        return (
            <div className={`navigation-bar-wrapper ${isNavigationSidebarOpen ? '' : 'd-none'}`}>
                <NavigationItem redirectTo="/" icon="fas fa-briefcase" itemTopic="Dashboard" />
                <NavigationItem redirectTo="/agile-board" icon="fas fa-table" itemTopic="Agile Board" />
                <NavigationItem redirectTo="/daily-goals" icon="fas fa-medal" itemTopic="Daily Goals" />
                <NavigationItem redirectTo="/friends" icon="fas fa-user-alt" itemTopic="Friends" />
                <NavigationItem redirectTo="/settings" icon="fas fa-cog" itemTopic="Settings" />
                <NavigationItem onClick={this.handleLogout} redirectTo="/login" icon="fas fa-power-off" itemTopic="Logout" />
            </div>
        )    
    }
}

NavigationBar.propTypes = {
    isNavigationSidebarOpen: PropTypes.bool,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isNavigationSidebarOpen: state.layout.isNavigatonSidebarOpen
});

export default connect(mapStateToProps, { logout })(NavigationBar);