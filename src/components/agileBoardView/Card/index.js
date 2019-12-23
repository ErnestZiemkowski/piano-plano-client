import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleDailyGoal } from '../../../actions/dailyGoals';
import { openIssueDetailsModalById } from '../../../actions/layout';

import "./styles.scss";


const Card = ({ removeCard, id, cardCode, done, title, openIssueDetailsModalById }) => (
    <div className="card" >
        <div className="card-header">
            <span className={`card-title ${done ? 'line-through': ''}`}>{ cardCode }</span>
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
    done: PropTypes.bool.isRequired,
}

export default connect(null, { openIssueDetailsModalById, toggleDailyGoal })(Card);