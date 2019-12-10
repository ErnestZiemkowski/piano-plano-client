import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import "./styles.scss";


export default class ContentWrapper extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { className } = this.props;

        return (
            <div className={`content-wrapper ${className}`}>
                {this.props.children}
            </div>
        );
    }
}