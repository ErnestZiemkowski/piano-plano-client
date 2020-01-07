import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Tooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

import { openIssueDetailsModalById } from '../../../actions/layout';

import "./styles.scss";


const Card = ({ handleCardRemove, id, cardCode, done, title, openIssueDetailsModalById }) => {

    const [tooltipInfoOpen, setTooltipInfoOpen] = useState(false);
    const [tooltipRemoveOpen, setTooltipRemoveOpen] = useState(false);

    return <div className="card" >
        <div className="card-header">
            <span className={`card-title ${done ? 'line-through': ''}`}>{ cardCode }</span>
            <span className="card-actions"  >
                <FontAwesomeIcon 
                    id="icon-issue-info"
                    className="icon-card"
                    icon={faInfoCircle} 
                    onClick={() => openIssueDetailsModalById(id)} 
                />
                <FontAwesomeIcon
                    id="icon-issue-remove"
                    className="icon-card"
                    icon={faTrash} 
                    onClick={() => handleCardRemove(id)} 
                />
                <Tooltip 
                    placement="top" 
                    isOpen={tooltipInfoOpen} 
                    target="icon-issue-info" 
                    toggle={() => setTooltipInfoOpen(!tooltipInfoOpen)}
                >
                    Issue details
                </Tooltip>
                <Tooltip 
                    placement="top" 
                    isOpen={tooltipRemoveOpen} 
                    target="icon-issue-remove" 
                    toggle={() => setTooltipRemoveOpen(!tooltipRemoveOpen)}
                >
                    Remove issue
                </Tooltip>
            </span>
        </div>
        <div className="card-content">{ title }</div>
    </div>;
};
Card.propTypes = {
    handleCardRemove: PropTypes.func.isRequired,
    openIssueDetailsModalById: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    cardCode: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
};

export default connect(null, { openIssueDetailsModalById })(Card);