import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./styles.scss";
import { connect } from 'react-redux';


const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const dayOfWeek = today.getDay();

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Header = props => (
    <div className="header">
        <span className="text-light">Welcome back, {props.userName}</span>                
        <span className="text-light">{daysNames[dayOfWeek]}, {dd} {monthNames[mm - 1]} {yyyy}</span>
    </div>
);

Header.propTypes = {
    userName: PropTypes.string.isRequired, 
}

const mapStateToProps = state => ({
    userName: state.auth.user.sub
});

export default connect(mapStateToProps)(Header);
