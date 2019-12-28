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

import { toggleDailyGoal } from '../../../actions/dailyGoals';
import { closeIssueDetailsModal } from '../../../actions/layout';
import { monthNames } from '../../../utils/dateTime';
import { updateCard, getKanbanCategoriesByProjectId } from '../../../actions/kanbanCategories';
import { createToast } from '../../../actions/toasts';

import "./styles.scss";


class IssueDetailsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            isDailyGoal: false
        };
    }

    componentWillMount() {
        if(this.props.issueDetails) {
            const { title, description, dailyGoalSet } = this.props.issueDetails;
            this.setState({
                title: title,
                description: description,
                isDailyGoal: dailyGoalSet
            });    
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.issueDetails) {
            const { title, description, dailyGoalSet } = nextProps.issueDetails;
            this.setState({
                title: title,
                description: description,
                isDailyGoal: dailyGoalSet
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

    toggleIssueAsDone = () => {
        const { issueDetailsId, issueDetails } = this.props;
        const issueData = {
            done: !issueDetails.done
        };

        updateCard(issueData, issueDetailsId);
    }

    handleStatusChange = e => {
        e.preventDefault();
        const { issueDetailsId, updateCard, createToast } = this.props;
        const issueData = {
            kanbanCategoryId: e.target.value
        };
        const toast = {
            header: 'Notification',
            body: 'Board has been updated. Please reload the page.',
            type: 'info'
        };

        updateCard(issueData, issueDetailsId);
        createToast(toast);
    }

    toggleDailyGoal = () => {
        const { issueDetailsId, toggleDailyGoal } = this.props;
        const dailyGoal = {
            cardId: issueDetailsId
        };

        toggleDailyGoal(dailyGoal);
        this.setState({
            ...this.state,
            isDailyGoal: null
        });
    }

    render() {
        const { issueDetailsId, issueDetails, kanbanCategories } = this.props;
        const { title, description, isDailyGoal } = this.state;
        const d = new Date(Date.parse(issueDetails ? issueDetails.createdAt : null));
 
        return (
            <Modal
                isOpen={issueDetailsId !== -1}
                toggle={this.closeModal}
                backdrop={true}
            >
                <ModalHeader className="issue-details-header">Issue Details</ModalHeader>
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
                                <Label>Status: &nbsp;&nbsp;</Label>
                                <Button 
                                    id="dropdownMenu2" 
                                    className="btn btn-sm btn-primary dropdown-toggle action-btn" 
                                    data-toggle="dropdown" 
                                    type="button" 
                                    aria-haspopup="true" 
                                    aria-expanded="false"
                                >
                                    { issueDetails.kanbanCategoryTitle }
                                </Button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                    {kanbanCategories.map((category, index) => 
                                        (<Button 
                                            key={index} 
                                            id={category.id}
                                            value={category.id} 
                                            onClick={this.handleStatusChange} 
                                            className="dropdown-item" 
                                            type="button"
                                        >
                                            { category.title }
                                        </Button>))}
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label>Daily Goal: <input type="checkbox" onClick={this.toggleDailyGoal} checked={isDailyGoal}/></Label>
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
    toggleDailyGoal: PropTypes.func.isRequired,
    kanbanCategories: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired    
        }).isRequired,
    ),
}

const mapStateToProps = state => {
    const cards = state.kanbanCategories.data.map(category => category.cards).flat();

    return {
        issueDetailsId: state.layout.issueId,
        issueDetails: cards.find(card => card.id === state.layout.issueId),
        kanbanCategories: state.kanbanCategories.data.map(category => ({
            id: category.id,
            title: category.title
        }))
    }
};

export default connect(mapStateToProps, {
    updateCard,
    createToast,
    toggleDailyGoal, 
    closeIssueDetailsModal, 
    getKanbanCategoriesByProjectId 
})(IssueDetailsModal);