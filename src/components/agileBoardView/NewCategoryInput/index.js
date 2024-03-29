import React, { useState } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Tooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import { createKanbanCategory } from "../../../actions/kanbanCategories";

import "./styles.scss";


const NewCategoryInput = ({ projectId, createKanbanCategory, kanbanCategoriesCount }) => {

    const [categoryName, setCategoryName] = useState('');
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const handleCreateCategory = e => {
        e.preventDefault(); 
        const kanbanCategoryData = {
            title: categoryName,
            projectId: projectId,
            position: kanbanCategoriesCount + 1
        };

        createKanbanCategory(kanbanCategoryData);
        setCategoryName('');
    };

    return projectId === 0 ?  <p className="no-existing-project-info">Please, choose your project</p> : (
        <AvForm className="create-category-form">
            <AvField 
                name="newCategoryName"
                className="create-category-input"
                placeholder="New category"
                value={categoryName}
                onChange={e => setCategoryName(e.target.value)}
                validate={{
                    minLength: {value: 2, errorMessage: 'Kanban category title must be between 5 and 75 characters'},
                    maxLength: {value: 30}
                }}
            />
            <FontAwesomeIcon
                id="add-category-icon" 
                icon={faPlus} 
                onClick={handleCreateCategory} 
                className="add-column"
            />
            <Tooltip 
                placement="top" 
                isOpen={tooltipOpen} 
                target="add-category-icon" 
                toggle={() => setTooltipOpen(!tooltipOpen)}
            >
                Add category
            </Tooltip>
        </AvForm>
    );
};

NewCategoryInput.propTypes = {
    projectId: PropTypes.number.isRequired,
    createKanbanCategory: PropTypes.func.isRequired,
    kanbanCategoriesCount: PropTypes.number.isRequired,
};

export default connect(null, { createKanbanCategory })(NewCategoryInput)