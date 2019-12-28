import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

import './styles.scss';

class ActionButtons extends Component {
    constructor(props) {
        super(props);
    }

    handleProjectChange = e => this.props.handleProjectChange(e);
    toggleModal = () => this.props.toggleModal();

    render() {
        const { projectsNames, currentProject, kanbanCategoriesLength } = this.props;

        return (
            <div className="agile-board-actions">
                <Button 
                    id="dropdownMenu2" 
                    className="btn btn-info dropdown-toggle action-btn" 
                    data-toggle="dropdown" 
                    type="button" 
                    aria-haspopup="true" 
                    aria-expanded="false"
                >
                    {(currentProject && currentProject.name) ? 
                        currentProject.name : "Filter By" }
                </Button>
                {kanbanCategoriesLength === 0 ? '' : 
                    <Button 
                        type="button" 
                        className="btn btn-info action-btn"
                        onClick={this.toggleModal}
                    >
                        New issue
                    </Button>}

                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    {projectsNames.map(project => 
                        (<Button 
                            key={project.id} 
                            id={project.id}
                            name={project.name} 
                            onClick={this.handleProjectChange} 
                            className="dropdown-item" 
                            type="button"
                        >
                            { project.name }
                        </Button>))}
                </div>
            </div>
        )
    }
}

ActionButtons.propTypes = {
    handleProjectChange: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    projectsNames: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,    
    })),
    currentProject: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,            
    }),
    kanbanCategoriesLength: PropTypes.number, 
}

export default ActionButtons
