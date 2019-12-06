import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import './styles.scss';
import { daysNames, monthNames } from '../../../utils/dateTime';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { deleteProject } from '../../../actions/projects';
import { openProjectDetailSidebarById } from '../../../actions/layout';


class ProjectWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
    }

    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    handleDelete = e => {
        const { deleteProject } = this.props;
        e.preventDefault();

        deleteProject(this.props.id);
        this.toggleModal();
    }

    render() {
        const { openProjectDetailSidebarById ,createDateTime, name, id } = this.props;
        const { isModalOpen } = this.state;
        const d = new Date(Date.parse(createDateTime));

        return (
            <div className="project-wrapper">
                <div>
                    <div className="project-details">
                        <h2 className="project-name">{ name }</h2>
                        <div className="project-actions">
                            <i 
                                onClick={() => openProjectDetailSidebarById(id)} 
                                className="fas fa-info-circle" 
                                data-toggle="tooltip" 
                                data-placement="top" 
                                title="Show details about project"
                            />
                            <i 
                                className="fas fa-arrow-circle-right" 
                                data-toggle="tooltip" 
                                data-placement="top" 
                                title="Go to project agile board"
                            />
                            <i
                                onClick={this.toggleModal} 
                                className="fas fa-trash" 
                                data-toggle="tooltip" 
                                data-placement="top" 
                                title="Delete project"
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
                        aria-valuenow="75" 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                        style={{ width: '75%' }}>
                    </div>
                </div>
                <div></div>
                <Modal 
                    isOpen={isModalOpen}
                    toggle={this.toggleModal}
                    backdrop={true}
                >
                    <ModalHeader>Remove Project</ModalHeader>
                    <ModalBody>
                        Do you really want to remove this project? This will cause 
                        irreversible effect consequences.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.handleDelete}>Remove</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

ProjectWidget.propTypes = {
    id: PropTypes.number.isRequired,
    startDate: PropTypes.string,
    name: PropTypes.string,
    deleteProject: PropTypes.func.isRequired,
    openProjectDetailSidebarById: PropTypes.func.isRequired,
};

export default connect(null, { deleteProject, openProjectDetailSidebarById })(ProjectWidget);