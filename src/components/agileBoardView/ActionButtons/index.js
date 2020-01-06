import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

import './styles.scss';


const ActionButtons = ({ projectsNames, currentProject, kanbanCategoriesLength, toggleModal, handleProjectChange }) => (
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
                onClick={() => toggleModal()}
            >
                New issue
            </Button>}
        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            {projectsNames.map(project => 
                (<Button 
                    key={project.id} 
                    id={project.id}
                    name={project.name} 
                    onClick={e => handleProjectChange(e)} 
                    className="dropdown-item" 
                    type="button"
                >
                    { project.name }
                </Button>))}
        </div>
    </div>
);
ActionButtons.propTypes = {
    currentProject: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,            
    }),
    handleProjectChange: PropTypes.func.isRequired,
    kanbanCategoriesLength: PropTypes.number, 
    projectsNames: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,    
    })),
    toggleModal: PropTypes.func.isRequired,
}

export default ActionButtons;