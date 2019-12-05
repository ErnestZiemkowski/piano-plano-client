import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import Loader from 'react-loaders';

import "./styles.scss";
import NavigationBar from "../../layout/NavigationBar";
import Header from "../../layout/Header";
import ProjectWidget from "../ProjectWidget";
import ProjectInfo from '../ProjectInfo';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { getAllProjects, createProject } from "../../../actions/projects"

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            name: '',
            description: '',
        }
    }

    componentDidMount() {
        this.props.getAllProjects();
    }

    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    handleChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    }

    handleProjectCreation = e => {
        e.preventDefault();
        const { name, description } = this.state;
        const projectData = {
            name: name,
            description: description
        };

        this.props.createProject(projectData);
        this.toggleModal();
    }

    render() {
        const { projects, projectIdSidebarDetails } = this.props;
        const { name, description, isModalOpen } = this.state;
        return (
            <div className="image-wrapper">
                <NavigationBar />
                <div className="content-wrapper">
                    <Header />
                    <div className="background-board">
                        <div className="projects-board-actions">
                            <span onClick={this.toggleModal} className="badge badge-dark" data-toggle="tooltip" data-placement="bottom" title="Create new project">
                                <i className="fas fa-plus" />
                            </span>
                        </div>
                        <div className="widgets-wrapper">
                            { projects.isLoading ?
                                <Loader type="ball-scale-multiple" className="loader-center" /> : projects.data.map(project => 
                                    (<ProjectWidget key={project.id} id={project.id} name={project.name} createDateTime={project.createDateTime} />)
                                )}
                        </div>
                    </div>
                </div>
                { projectIdSidebarDetails === -1 ? '' : <ProjectInfo projectId={projectIdSidebarDetails} />}

                <Modal 
                    isOpen={isModalOpen}
                    toggle={this.toggleModal}
                    backdrop={true}
                >
                    <ModalHeader>Create Project</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="project-name">Name</Label>
                                <Input 
                                    onChange={this.handleChange}
                                    value={name} 
                                    type="text" 
                                    name="name" 
                                    id="project-name" 
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="project-description">Description</Label>
                                <Input 
                                    onChange={this.handleChange} 
                                    value={description}
                                    type="textarea" 
                                    name="description" 
                                    id="project-description" 
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.handleProjectCreation}>Create</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

Dashboard.propTypes = {
    createProject: PropTypes.func.isRequired,
    getAllProjects: PropTypes.func.isRequired,
    projects: PropTypes.shape({
        isLoading: PropTypes.bool.isRequired,
        data: PropTypes.array,
    }).isRequired,
    projectIdSidebarDetails: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
    projects: state.projects,
    projectIdSidebarDetails: state.layout.projectId
});

export default connect(mapStateToProps, { getAllProjects, createProject })(Dashboard);