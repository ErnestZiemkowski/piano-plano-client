import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { createCard } from "../../../actions/kanbanCategories";
import "./styles.scss";


class CreateIssueModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
        };
    }

    handleCardCreation = e => {
        e.preventDefault();
        const { createCard, toggleModal, projectId } = this.props;
        const { title, description } = this.state;
        
        const cardData = {
            title: title,
            description: description,
            projectId: projectId,

        };

        createCard(cardData);
        this.setState({
            title: '',
            description: ''
        });
        toggleModal();
    }

    toggleModal = () => this.props.toggleModal();

    handleChange = e => this.setState({ [e.target.name] : e.target.value });

    render() {
        const { isModalOpen } = this.props;
        const { title, description } = this.state;

        return (
            <Modal 
                isOpen={isModalOpen}
                toggle={this.toggleModal}
                backdrop={true}
            >
                <ModalHeader>Create Issue</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="card-title">Title</Label>
                            <Input 
                                onChange={this.handleChange}
                                value={title} 
                                type="text" 
                                name="title" 
                                id="card-title" 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="card-description">Description</Label>
                            <Input 
                                onChange={this.handleChange} 
                                value={description}
                                type="textarea" 
                                name="description" 
                                id="card-description" 
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="success" 
                        onClick={this.handleCardCreation}
                    >
                        Create
                    </Button>{' '}
                    <Button 
                        color="secondary" 
                        onClick={this.toggleModal}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

CreateIssueModal.propTypes = {
    createCard: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    projectId: PropTypes.number.isRequired,
}

export default connect(null, { createCard })(CreateIssueModal);