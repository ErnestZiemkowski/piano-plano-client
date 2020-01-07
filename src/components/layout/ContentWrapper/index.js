import React from 'react';

import ToastsWrapper from '../ToastsWrapper';

import "./styles.scss";


const ContentWrapper = ({ children, className }) => {
    return (
        <div className={`content-wrapper ${className}`}>
            {children}
            <ToastsWrapper />
        </div>
    );
};

export default ContentWrapper;