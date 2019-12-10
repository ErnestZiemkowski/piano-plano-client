import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Loader from 'react-loaders';
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
                        <AvForm className="issue-details-form">
                            <FormGroup>
                                <Label>Creator: {issueDetails.creator.username}</Label>
                            </FormGroup>
                            <FormGroup>
                                <Label>Created at: { d.getDate() } { monthNames[d.getMonth()] } { d.getFullYear() } { d.getHours() }:{ d.getMinutes() }</Label>
                            </FormGroup>
                            <FormGroup>
                                <Label>Title</Label>
                                <AvField 
                                    id="name" 
                                    name="title"
                                    type="text"
                                    value={title}
                                    onBlur={this.handleBlur}
                                    onChange={this.handleChange}
                                    validate={{
                                        required: {value: true, errorMessage: 'Issue title cannot be blank'},
                                        minLength: {value: 5, errorMessage: 'Issue title must be between 5 and 75 characters'},
                                        maxLength: {value: 75}
                                    }}    
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Description</Label>
                                <AvField
                                    id="description" 
                                    name="description"
                                    type="textarea"
                                    className="issue-details"
                                    value={description}
                                    onBlur={this.handleBlur}
                                    onChange={this.handleChange} 
                                    validate={{
                                        maxLength: {value: 500}
                                    }}    
                                />
                            </FormGroup>
                        </AvForm>
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
