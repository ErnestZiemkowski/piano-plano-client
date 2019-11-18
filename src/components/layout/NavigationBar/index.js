import React, { Component } from 'react'
import './styles.scss';

import NavigationItem from '../NavigationItem';

export default class NavigationBar extends Component {
    render() {
        return (
            <div className="navigation-bar-wrapper">
                <NavigationItem icon="fas fa-briefcase" itemTopic="Dashboard" />
                <NavigationItem icon="fas fa-table" itemTopic="Agile Board" />
                <NavigationItem icon="fas fa-medal" itemTopic="Daily Goals" />
                <NavigationItem icon="fas fa-user" itemTopic="Profile" /> 
            </div>
        )    
    }
}
