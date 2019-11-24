import React from 'react'
import PropTypes from 'prop-types';
import "./styles.scss";

const NavigationItem = props => {
        
    const handleLogout = () => {
        props.onClickHandler();
    }
    
    return (
        <div onClick={handleLogout} className="navigation-item-wrapper">
            <i className={`text-light ${props.icon}`}></i> <span className="text-light">{` ${props.itemTopic}`}</span>
        </div>
    )
}

NavigationItem.propTypes = {
    itemTopic: PropTypes.string.isRequired,
    onClickHandler: PropTypes.func,
}

export default NavigationItem;