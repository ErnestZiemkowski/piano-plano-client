import React from 'react';
import PropTypes from "prop-types";

import "./styles.scss";


const BackgroundBoard = ({ children, className }) => {
    return (
        <div className={`background-board ${className}`}>
            {children}
        </div>
    );
}

BackgroundBoard.propTypes = {
    className: PropTypes.string,
}

export default BackgroundBoard;