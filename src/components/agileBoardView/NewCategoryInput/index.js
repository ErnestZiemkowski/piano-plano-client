import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Input } from 'reactstrap';

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
            <Fragment>
                <Input 
                    name="newCategoryName"
                    className="create-category-input"
                    placeholder="New category"
                    value={newCategoryName}
                    onChange={this.handleChange}
                />
                <i
                    onClick={this.handleCreateCategory} 
                    className="fas fa-plus add-column" 
                    data-toggle="tooltip" 
                    data-placement="bottom" 
                    title="Add category" 
                />
            </Fragment>
        )
    }
}

NewCategoryInput.propTypes = {
    projectId: PropTypes.number.isRequired,
    createKanbanCategory: PropTypes.func.isRequired,
}

export default connect(null, { createKanbanCategory })(NewCategoryInput)