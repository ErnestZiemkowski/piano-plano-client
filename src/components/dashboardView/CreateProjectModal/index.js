import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    FormGroup, 
    Label,
    Button
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

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
            description: description,
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
                    <AvForm className="create-project-modal">
                        <FormGroup>
                            <Label for="project-name">Name</Label>
                            <AvField 
                                id="project-name"
                                name="project-name" 
                                type="text"
                                value={name}
                                onChange={this.handleChange}
                                validate={{
                                    required: {value: true, errorMessage: 'Project name cannot be blank'},
                                    minLength: {value: 5, errorMessage: 'Project name must be between 5 and 75 characters'},
                                    maxLength: {value: 75}
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="project-description">Description</Label>
                            <AvField
                                id="project-description"
                                type="textarea" 
                                name="project-description"
                                className="project-description" 
                                value={description}
                                onChange={this.handleChange} 
                                validate={{
                                    maxLength: {value: 500}
                                }}
                            />
                        </FormGroup>
                    </AvForm>
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