import React, { useState } from 'react'
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button, 
    FormGroup, 
    Label
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import { createCard } from "../../../actions/kanbanCategories";

import "./styles.scss";


const CreateIssueModal = ({ createCard, toggleModal, projectId, isModalOpen }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleCardCreation = e => {
        e.preventDefault();
        const cardData = {
            title: title,
            description: description,
            projectId: projectId,

        };

        createCard(cardData);
        setTitle('');
        setDescription('');
        toggleModal();
    }

    return (
        <Modal 
            isOpen={isModalOpen}
            toggle={() => toggleModal()}
            backdrop={true}
        >
            <ModalHeader>Create Issue</ModalHeader>
            <ModalBody>
                <AvForm className="create-issue-form">
                    <FormGroup>
                        <Label for="card-title">Title</Label>
                        <AvField 
                            id="card-title" 
                            name="title" 
                            type="text" 
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            validate={{
                                required: {value: true, errorMessage: 'Issue title cannot be blank'},
                                minLength: {value: 5, errorMessage: 'Issue title must be between 5 and 75 characters'},
                                maxLength: {value: 75}
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="card-description">Description</Label>
                        <AvField 
                            id="card-description" 
                            name="description" 
                            type="textarea"
                            className="card-description"
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
                <Button 
                    color="success" 
                    onClick={handleCardCreation}
                >
                    Create
                </Button>{' '}
                <Button 
                    color="secondary" 
                    onClick={toggleModal}
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

CreateIssueModal.propTypes = {
    createCard: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    projectId: PropTypes.number.isRequired,
}

export default connect(null, { createCard })(CreateIssueModal);