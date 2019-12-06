import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { createProject } from "../../../actions/projects"
import "./styles.scss";

class CreateProjectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
        };
    }

    toggleModal = () => this.props.toggleModal();

    handleChange = e => this.setState({ [e.target.name] : e.target.value });

    handleProjectCreation = e => {
        e.preventDefault();
        const { name, description } = this.state;
        const { createProject } = this.props;

        const projectData = {
            name: name,
            description: description
        };
        
        createProject(projectData);
        this.toggleModal();
    }

    render() {
        const { name, description } = this.state;
        const { isModalOpen } = this.props;

        return (
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
        )
    }
}
CreateProjectModal.propTypes = {
    createProject: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
};

export default connect(null, { createProject })(CreateProjectModal)