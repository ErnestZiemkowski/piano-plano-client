import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

import CreateComment from '../../layout/CreateComment';
import Comment from '../../layout/Comment';

import { monthNames } from '../../../utils/dateTime';
import { createToast } from '../../../actions/toasts';
import { COMMENT_CARD } from '../../../actions/types';
import { toggleDailyGoal } from '../../../actions/dailyGoals';
import { getCommentsByIssueId } from '../../../actions/comments';
import { closeIssueDetailsModal } from '../../../actions/layout';
import { updateCard, getKanbanCategoriesByProjectId } from '../../../actions/kanbanCategories';

import "./styles.scss";


const IssueDetailsModal = props => {
    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [isDailyGoal, setDailyGoal] = useState(false); 

    useEffect(() => {
        props.getCommentsByIssueId(props.issueDetailsId);
    }, [props.issueDetailsId]);

    useEffect(() => {
        if (props.issueDetails) {
            const { title, description, dailyGoalSet } = props.issueDetails;
            setTitle(title);
            setDescription(description);
            setDailyGoal(dailyGoalSet);    
        }
    }, [props.issueDetails]);

    const handleBlur = e => {
        e.preventDefault();
        const issueData = {
            [e.target.name]: e.target.value
        };

        props.updateCard(issueData, props.issueDetailsId);
    };

    const handleStatusChange = e => {
        e.preventDefault();
        const issueData = {
            kanbanCategoryId: e.target.value
        };
        const toast = {
            header: 'Notification',
            body: 'Board has been updated. Please reload the page.',
            type: 'info'
        };

        props.updateCard(issueData, props.issueDetailsId);
        props.createToast(toast);
    };

    const toggleDailyGoal = () => {
        const dailyGoal = {
            cardId: props.issueDetailsId
        };

        props.toggleDailyGoal(dailyGoal);
        setDailyGoal(!isDailyGoal);
    };

    const d = new Date(Date.parse(props.issueDetails ? props.issueDetails.createdAt : null));

    return (
        <Modal
            isOpen={props.issueDetailsId !== -1}
            toggle={() => props.closeIssueDetailsModal()}
            backdrop={true}
            className="modal-issue-details modal-dialog-scrollable modal-lg"
        >
            <ModalHeader className="issue-details-header">Issue Details</ModalHeader>
            <ModalBody>
                {!props.issueDetails ? <Loader type="ball-scale-multiple" /> :
                    <AvForm className="issue-details-form">
                        <FormGroup>
                            <Label>Creator: { props.issueDetails.creator.username }</Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>Assignee: &nbsp;&nbsp;</Label>
                            <Button 
                                id="dropdownMenuTaskAssignee" 
                                className="btn btn-sm btn-primary dropdown-toggle action-btn" 
                                data-toggle="dropdown" 
                                type="button" 
                                aria-haspopup="true" 
                                aria-expanded="false"
                            >
                                { props.issueDetails.assignee ? props.issueDetails.assignee.username : 'Unassigned' }
                            </Button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuTaskAssignee">
                                { props.issueDetails.projectMembers.map(member => 
                                    (<Button 
                                        key={member.id} 
                                        id={member.id}
                                        name="assignee"
                                        value={member.username} 
                                        onClick={handleBlur} 
                                        className="dropdown-item" 
                                        type="button"
                                    >
                                        { member.username }&nbsp;&nbsp;&nbsp;&nbsp;
                                    </Button>))}
                                    <Button 
                                        name="assignee"
                                        value="unassigned" 
                                        onClick={handleBlur} 
                                        className="dropdown-item"  
                                        type="button"
                                    >
                                        Unassigned
                                    </Button>
                            </div>
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
                                { props.issueDetails.kanbanCategoryTitle }
                            </Button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                { props.kanbanCategories.map(category => 
                                    (<Button 
                                        key={category.id} 
                                        id={category.id}
                                        value={category.id} 
                                        onClick={handleStatusChange} 
                                        className="dropdown-item" 
                                        type="button"
                                    >
                                        { category.title }
                                    </Button>))}
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label>Daily Goal: <input type="checkbox" onClick={toggleDailyGoal} checked={isDailyGoal}/></Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>Title</Label>
                            <AvField 
                                id="name" 
                                name="title"
                                type="text"
                                value={title}
                                onBlur={handleBlur}
                                onChange={e => setTitle(e.target.value)}
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
                                onBlur={handleBlur}
                                onChange={e => setDescription(e.target.value)} 
                                validate={{
                                    maxLength: {value: 500}
                                }}    
                            />
                        </FormGroup>
                    </AvForm>
                }
                <CreateComment 
                    type={COMMENT_CARD} 
                    parentId={props.issueDetailsId}
                />
                <div className="comments-wrapper">
                    { props.comments.isLoading ? <p>Loading comments...</p> : props.comments.data.map(comment => {
                        return <Comment key={comment.id} comment={comment} />
                    })}
                </div>
            </ModalBody>
            <ModalFooter>
                <Button 
                    color="secondary"
                    className="btn-sm"
                    onClick={() => props.closeIssueDetailsModal()}
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

IssueDetailsModal.propTypes = {
    toggleDailyGoal: PropTypes.func.isRequired,
    kanbanCategories: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired    
        }).isRequired,
    ),
    comments: PropTypes.shape({
        isLoading: PropTypes.bool.isRequired,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                content: PropTypes.string.isRequired,
                createdAt: PropTypes.string.isRequired,
                updatedAt:PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
    updateCard: PropTypes.func.isRequired,
    createToast: PropTypes.func.isRequired,
    closeIssueDetailsModal: PropTypes.func.isRequired,
    getKanbanCategoriesByProjectId: PropTypes.func.isRequired,
    getCommentsByIssueId: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const cards = state.kanbanCategories.data.map(category => category.cards).flat();

    return {
        issueDetailsId: state.layout.issueId,
        issueDetails: cards.find(card => card.id === state.layout.issueId),
        kanbanCategories: state.kanbanCategories.data.map(category => ({
            id: category.id,
            title: category.title
        })),
        comments: state.comments
    };
};

export default connect(mapStateToProps, {
    updateCard,
    createToast,
    toggleDailyGoal, 
    closeIssueDetailsModal, 
    getKanbanCategoriesByProjectId,
    getCommentsByIssueId
})(IssueDetailsModal);