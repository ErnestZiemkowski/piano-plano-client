import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { AvForm, AvField } from 'availity-reactstrap-validation';

import { createKanbanCategory } from "../../../actions/kanbanCategories";

import "./styles.scss";


class NewCategoryInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newCategoryName: '',
        };
    }

    handleChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    };

    handleCreateCategory = e => {
        e.preventDefault();
        const { projectId, createKanbanCategory } = this.props;
        const { newCategoryName } = this.state;
 
        const kanbanCategoryData = {
            title: newCategoryName,
            projectId: projectId
        };

        createKanbanCategory(kanbanCategoryData);
        this.setState({ newCategoryName: '' });
    };


    render() {
        const { newCategoryName } = this.state;

        return (
            <AvForm className="create-category-form">
                <AvField 
                    name="newCategoryName"
                    className="create-category-input"
                    placeholder="New category"
                    value={newCategoryName}
                    onChange={this.handleChange}
                    validate={{
                        minLength: {value: 2, errorMessage: 'Kanban category title must be between 5 and 75 characters'},
                        maxLength: {value: 30}
                    }}
                />
                <i
                    onClick={this.handleCreateCategory} 
                    className="fas fa-plus add-column" 
                    data-toggle="tooltip" 
                    data-placement="bottom" 
                    title="Add category" 
                />
            </AvForm>
        )
    }
}

NewCategoryInput.propTypes = {
    projectId: PropTypes.number.isRequired,
    createKanbanCategory: PropTypes.func.isRequired,
}

export default connect(null, { createKanbanCategory })(NewCategoryInput)