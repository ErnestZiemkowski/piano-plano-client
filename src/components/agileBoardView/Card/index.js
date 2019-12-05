import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./styles.scss";

export default class Card extends Component {
    constructor(props) {
        super(props); 
    }

    render() {
        const { removeCard, id, title, description } = this.props;

        return (
        <div className="card" >
            <div className="card-header">
                <span className="card-title">{ title }</span>
                <span className="card-actions"  >
                    <i className="fas fa-info-circle"/>
                    <i className="fas fa-trash" onClick={ removeCard }/>
                </span>
            </div>
            <div className="card-content">{ description }</div>
        </div>
        )
    }
}

Card.propTypes = {
    dragging: PropTypes.bool.isRequired,
    removeCard: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}