import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

import { openProjectDetailSidebarById } from '../../../actions/layout';
import { daysNames, monthNames } from '../../../utils/dateTime';
import { deleteProject } from '../../../actions/projects';

import './styles.scss';


const ProjectWidget = ({ deleteProject, progress, openProjectDetailSidebarById, createDateTime, name, id }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = e => {
        e.preventDefault();

        deleteProject(id);
        setIsModalOpen(!isModalOpen)
    }


    const d = new Date(Date.parse(createDateTime));

    return (
        <div className="project-wrapper">
            <div>
                <div className="project-details">
                    <h2 className="project-name">{ name }</h2>
                    <div className="project-actions">
                        <FontAwesomeIcon 
                            icon={faInfoCircle}
                            onClick={() => openProjectDetailSidebarById(id)}
                        />
                        <FontAwesomeIcon 
                            icon={faTrash}
                            onClick={() => setIsModalOpen(!isModalOpen)}
                        />
                    </div>
                </div>
                <small className="project-start-date">
                    Created at { daysNames[d.getDay()] }, { d.getDate() } { monthNames[d.getMonth()] } { d.getFullYear() 
                }</small>
            </div>
            <div className="progress">
                <div 
                    className="progress-bar progress-bar-striped bg-info" 
                    role="progressbar" 
                    aria-valuenow={progress} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                    style={{ width: `${progress}%` }}>
                </div>
            </div>
            <div className="progress-value">
                {progress} %
            </div>
            <Modal 
                isOpen={isModalOpen}
                toggle={() => setIsModalOpen(!isModalOpen)}
                backdrop={true}
            >
                <ModalHeader>Remove Project</ModalHeader>
                <ModalBody>
                    Do you really want to remove this project? This will cause 
                    irreversible effect consequences.
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger" 
                        onClick={handleDelete}
                    >
                        Remove
                    </Button>&nbsp;
                    <Button 
                        color="secondary" 
                        onClick={() => setIsModalOpen(!isModalOpen)}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

ProjectWidget.propTypes = {
    id: PropTypes.number.isRequired,
    startDate: PropTypes.string,
    name: PropTypes.string,
    deleteProject: PropTypes.func.isRequired,
    openProjectDetailSidebarById: PropTypes.func.isRequired,
    progress: PropTypes.number.isRequired,
};

export default connect(null, { deleteProject, openProjectDetailSidebarById })(ProjectWidget);