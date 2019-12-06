import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import "./styles.scss";

const NavigationItem = props => {
    return (
        <Link 
            to={props.redirectTo} 
            className="navigation-item-wrapper" 
            onClick={props.onClick}
        >
            <i className={`text-light ${props.icon}`} /> 
            <span className="text-light">{` ${props.itemTopic}`}</span>
        </Link>
    )
}

NavigationItem.propTypes = {
    itemTopic: PropTypes.string.isRequired,
    onClickHandler: PropTypes.func,
    redirectTo: PropTypes.string, 
}

export default NavigationItem;