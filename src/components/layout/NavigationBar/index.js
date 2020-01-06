import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavigationItem from '../NavigationItem';
import { logout } from '../../../actions/auth';
import { faBriefcase, faTable, faMedal, faUserAlt, faCog, faPowerOff } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

class NavigationBar extends Component {

    handleLogout = () => {
        this.props.logout();
    }

    render() {
        const { isNavigationSidebarOpen } = this.props;
        
        return (
            <div className={`navigation-bar-wrapper ${isNavigationSidebarOpen ? '' : 'd-none'}`}>
                <NavigationItem 
                    redirectTo="/" 
                    icon={faBriefcase} 
                    itemTopic="Dashboard" 
                />
                <NavigationItem 
                    redirectTo="/agile-board" 
                    icon={faTable} 
                    itemTopic="Agile Board" 
                />
                <NavigationItem 
                    redirectTo="/daily-goals" 
                    icon={faMedal} 
                    itemTopic="Daily Goals" 
                />
                <NavigationItem 
                    redirectTo="/friends" 
                    icon={faUserAlt} 
                    itemTopic="Friends" 
                />
                <NavigationItem 
                    redirectTo="/settings" 
                    icon={faCog} 
                    itemTopic="Settings" 
                />
                <NavigationItem 
                    redirectTo="/login" 
                    icon={faPowerOff} 
                    itemTopic="Logout" 
                    onClick={this.handleLogout} 
                />
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