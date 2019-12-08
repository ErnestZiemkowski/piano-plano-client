import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { openIssueDetailsModalById } from '../../../actions/layout';
import "./styles.scss";


const Card = ({ removeCard, id, cardCode, title, openIssueDetailsModalById }) => (
    <div className="card" >
        <div className="card-header">
            <span className="card-title">{ cardCode }</span>
            <span className="card-actions"  >
                <i className="fas fa-info-circle" onClick={() => openIssueDetailsModalById(id)} />
                <i className="fas fa-trash" onClick={ removeCard }/>
            </span>
        </div>
        <div className="card-content">{ title }</div>
    </div>
);

Card.propTypes = {
    removeCard: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    cardCode: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

export default connect(null, { openIssueDetailsModalById })(Card);