import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FormGroup, Label, Button, Tooltip } from 'reactstrap'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CreateComment from '../../layout/CreateComment';
import Comment from '../../layout/Comment';

import { COMMENT_PROJECT } from '../../../actions/types';
import { getCommentsByProjectId } from '../../../actions/comments';
import { closeProjectDetailSidebar } from '../../../actions/layout';
import { updateProject, toggleFriendAsMember } from '../../../actions/projects';
import { monthNames } from '../../../utils/dateTime';
import { getFriends } from '../../../actions/friends';

import './styles.scss';


const ProjectInfo = ({ 
    getCommentsByProjectId, 
    getFriends, 
    updateProject, 
    toggleFriendAsMember,
    project, 
    projectId, 
    comments, 
    closeProjectDetailSidebar, 
    friends
}) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [createDateTime, setCreateDateTime] = useState('')
    const [creatorUsername, setCreatorUsername] = useState('')
    const [tooltipOpen, setTooltipOpen] = useState(false);

    useEffect(() => {
        getFriends();
        getCommentsByProjectId(projectId);
    }, []);

    useEffect(() => {
        getCommentsByProjectId(projectId);
    }, [ projectId ]);

    useEffect(() => {
        const { name, description, createDateTime, creator } = project;
        setName(name);
        setDescription(description);
        setCreateDateTime(createDateTime);
        setCreatorUsername(creator.username);
    }, [project])

    const handleBlur = e => {
        const projectData = {
            [e.target.name]: e.target.value
        };

        updateProject(projectData, projectId);
    }    

    const handleAddFriendToProject = e => {
        const projectData = {
            friendToAddId: parseInt(e.target.id)
        };

        toggleFriendAsMember(projectData, projectId);
    };

    const checkIfFriendIsAlsoAMember = (members, friendId) => {
        const index = members.findIndex(member => member.id === friendId);
        return index === -1 ? false : true;
    }

    const d = new Date(Date.parse(createDateTime));

    return (
        <div className="project-details-side-bar">
            <Button 
                id="close-project-sidebar-icon"
                className="close" 
                type="button" 
                aria-label="Close"
                onClick={() => closeProjectDetailSidebar()} 
            >
                <span aria-hidden="true">&times;</span>
            </Button>
            <Tooltip 
                placement="left" 
                isOpen={tooltipOpen} 
                target="close-project-sidebar-icon" 
                toggle={() => setTooltipOpen(!tooltipOpen)}
            >
                Close sidebar
            </Tooltip>
            <h1 className="project-details-header">Project details</h1>
            <AvForm>
                <FormGroup>
                    <Label>Creator: { creatorUsername }</Label>
                </FormGroup>
                <FormGroup>
                    <Label>Members: &nbsp;&nbsp;</Label>
                    <Button 
                        id="dropdownMenuAssignee" 
                        className="btn btn-sm btn-primary dropdown-toggle action-btn" 
                        data-toggle="dropdown" 
                        type="button" 
                        aria-haspopup="true" 
                        aria-expanded="false"
                    >
                        Friends
                    </Button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuAssignee">
                        { friends.data.map(friend => 
                            (<Button 
                                key={friend.id} 
                                id={friend.id}
                                value={friend.id} 
                                onClick={handleAddFriendToProject} 
                                className="dropdown-item" 
                                type="button"
                            >
                                { friend.username }&nbsp;&nbsp;&nbsp;&nbsp;
                                {checkIfFriendIsAlsoAMember(project.members, friend.id) ? <FontAwesomeIcon icon={faCheck} /> : ''}
                            </Button>))}
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label>Created at: { d.getDate() } { monthNames[d.getMonth()] } { d.getFullYear() } { d.getHours() }:{ d.getMinutes() }</Label>
                </FormGroup>
                <FormGroup>
                    <Label>Name</Label>
                    <AvField 
                        id="name" 
                        name="name"
                        type="text"
                        value={name}
                        onBlur={handleBlur}
                        onChange={e => setName(e.target.value)} 
                        validate={{
                            required: {value: true, errorMessage: 'Project name cannot be blank'},
                            minLength: {value: 5, errorMessage: 'Project name must be between 5 and 75 characters'},
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
                        value={description}
                        onBlur={handleBlur}
                        onChange={e => setDescription(e.target.value)} 
                        validate={{
                            maxLength: {value: 500}
                        }}
                    />
                </FormGroup>
            </AvForm>
            <CreateComment
                type={COMMENT_PROJECT}
                parentId={projectId}
            />
            <div className="comments-project-wrapper">
                { comments.isLoading ? <p>Loading comments...</p> : comments.data.map(comment => {
                    return <Comment key={comment.id} comment={comment} />
                })}
            </div>
        </div>
    )
};

ProjectInfo.propTypes = {
    project: PropTypes.object,
    projectId: PropTypes.number.isRequired,
    updateProject: PropTypes.func.isRequired,
    closeProjectDetailSidebar: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    project: state.projects.data.find(project => project.id === props.projectId),
    comments: state.comments,
    friends: state.friends,
});

export default connect(mapStateToProps, { 
    getFriends,
    updateProject, 
    closeProjectDetailSidebar, 
    getCommentsByProjectId,
    toggleFriendAsMember
 })(ProjectInfo);