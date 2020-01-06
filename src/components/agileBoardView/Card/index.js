import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

import { toggleDailyGoal } from '../../../actions/dailyGoals';
import { openIssueDetailsModalById } from '../../../actions/layout';
import { deleteCard } from "../../../actions/kanbanCategories";

import "./styles.scss";


const Card = ({ handleCardRemove, id, cardCode, done, title, openIssueDetailsModalById }) => {
    return <div className="card" >
        <div className="card-header">
            <span className={`card-title ${done ? 'line-through': ''}`}>{ cardCode }</span>
            <span className="card-actions"  >
                <FontAwesomeIcon 
                    icon={faInfoCircle} 
                    onClick={() => openIssueDetailsModalById(id)} 
                />
                <FontAwesomeIcon 
                    icon={faTrash} 
                    onClick={() => handleCardRemove(id)} 
                />
            </span>
        </div>
        <div className="card-content">{ title }</div>
    </div>;
};

Card.propTypes = {
    removeCard: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    cardCode: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
}

export default connect(null, { openIssueDetailsModalById, toggleDailyGoal, deleteCard })(Card);