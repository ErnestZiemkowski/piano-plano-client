import React from 'react'
import PropTypes from 'prop-types';
import "./styles.scss";

const NavigationItem = props => {
    return (
        <div className="navigation-item-wrapper">
            <i className={`text-light ${props.icon}`}></i> <span className="text-light">{` ${props.itemTopic}`}</span>
        </div>
    )
}

NavigationItem.propTypes = {
    itemTopic: PropTypes.string.isRequired,
}

export default NavigationItem;