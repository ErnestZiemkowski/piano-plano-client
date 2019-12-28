import React, { Component } from 'react';

import ToastsWrapper from '../ToastsWrapper';

import "./styles.scss";

export default class ContentWrapper extends Component {
    render() {
        const { children, className } = this.props;

        return (
            <div className={`content-wrapper ${className}`}>
                {children}
                <ToastsWrapper />
            </div>
        );
    }
}