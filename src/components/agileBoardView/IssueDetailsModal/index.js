import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Loader from 'react-loaders';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { closeIssueDetailsModal } from '../../../actions/layout';
import { monthNames } from '../../../utils/dateTime';
import { updateCard } from '../../../actions/kanbanCategories';
import "./styles.scss";


class IssueDetailsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
        };
    }

    componentWillMount() {
        if(this.props.issueDetails) {
            const { title, description } = this.props.issueDetails;
            this.setState({
                title: title,
                description: description
            });    
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.issueDetails) {
            const { title, description } = nextProps.issueDetails;
            this.setState({
                title: title,
                description: description
            });
    
        }
    }

    closeModal = () => this.props.closeIssueDetailsModal();

    handleChange = e => this.setState({ [e.target.name] : e.target.value });

    handleBlur = e => {
        e.preventDefault();
        const { issueDetailsId, updateCard } = this.props;
        const issueData = {
            [e.target.name]: e.target.value
        };

        updateCard(issueData, issueDetailsId);        
    }    

    render() {
        const { issueDetailsId, issueDetails } = this.props;
        const { title, description } = this.state;
        const d = new Date(Date.parse(issueDetails ? issueDetails.createDateTime : null));

        return (
            <Modal
                isOpen={issueDetailsId !== -1}
                toggle={this.closeModal}
                backdrop={true}
            >
                <ModalHeader>Issue Details</ModalHeader>
                <ModalBody>
                    {!issueDetails ? <Loader type="ball-scale-multiple" /> :
                        <Form>
                            <FormGroup>
                                <Label>Creator: {issueDetails.creator.username}</Label>
                            </FormGroup>
                            <FormGroup>
                                <Label>Created at: { d.getDate() } { monthNames[d.getMonth()] } { d.getFullYear() } { d.getHours() }:{ d.getMinutes() }</Label>
                            </FormGroup>
                            <FormGroup>
                                <Label>Title</Label>
                                <Input 
                                    id="name" 
                                    name="title"
                                    type="text"
                                    value={title}
                                    onBlur={this.handleBlur}
                                    onChange={this.handleChange} 
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Description</Label>
                                <Input 
                                    id="description" 
                                    name="description"
                                    type="textarea"
                                    value={description}
                                    onBlur={this.handleBlur}
                                    onChange={this.handleChange} 
                                />
                            </FormGroup>
                        </Form>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="secondary" 
                        onClick={this.closeModal}
                    >
                        Cancel
                    </Button>
                </ModalFooter>

            </Modal>

        )
    }
}
IssueDetailsModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
    const cards = state.kanbanCategories.data.map(category => category.cards).flat();

    return {
        issueDetailsId: state.layout.issueId,
        issueDetails: cards.find(card => card.id === state.layout.issueId)
    }
};

export default connect(mapStateToProps, { closeIssueDetailsModal, updateCard })(IssueDetailsModal)
