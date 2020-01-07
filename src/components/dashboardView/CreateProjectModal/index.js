import React, { useState } from 'react'
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

const CreateProjectModal = ({ createProject, isModalOpen, toggleModal }) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleProjectCreation = e => {
        e.preventDefault();
        const projectData = {
            name: name,
            description: description,
        };
        
        createProject(projectData);
        toggleModal();
        setName('');
        setDescription('');
    }


    return (
        <Modal 
            isOpen={isModalOpen}
            toggle={() => toggleModal()}
            backdrop={true}
        >
            <ModalHeader>Create Project</ModalHeader>
            <ModalBody>
                <AvForm className="create-project-modal">
                    <FormGroup>
                        <Label for="project-name">Name</Label>
                        <AvField 
                            id="project-name"
                            name="name" 
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
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
                            name="description"
                            className="project-description" 
                            value={description}
                            onChange={e => setDescription(e.target.value)} 
                            validate={{
                                maxLength: {value: 500}
                            }}
                        />
                    </FormGroup>
                </AvForm>
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={handleProjectCreation}>Create</Button>&nbsp;
                <Button color="secondary" onClick={() => toggleModal()}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

CreateProjectModal.propTypes = {
    createProject: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
};

export default connect(null, { createProject })(CreateProjectModal)