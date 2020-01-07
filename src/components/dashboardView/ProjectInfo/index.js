import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FormGroup, Label, Button } from 'reactstrap'
import { AvForm, AvField } from 'availity-reactstrap-validation';

import CreateComment from '../../layout/CreateComment';
import Comment from '../../layout/Comment';

import { COMMENT_PROJECT } from '../../../actions/types';
import { getCommentsByProjectId } from '../../../actions/comments';
import { closeProjectDetailSidebar } from '../../../actions/layout';
import { updateProject } from '../../../actions/projects';
import { monthNames } from '../../../utils/dateTime';

import './styles.scss';


const ProjectInfo = ({ getCommentsByProjectId, project, projectId, updateProject, comments, closeProjectDetailSidebar }) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [createDateTime, setCreateDateTime] = useState('')
    const [creatorUsername, setCreatorUsername] = useState('')

    useEffect(() => {
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

    const d = new Date(Date.parse(createDateTime));

    return (
        <div className="project-details-side-bar">
            <Button 
                className="close" 
                type="button" 
                aria-label="Close"
                onClick={() => closeProjectDetailSidebar()} 
            >
                <span aria-hidden="true">&times;</span>
            </Button>
            <h1 className="project-details-header">Project details</h1>
            <AvForm>
                <FormGroup>
                    <Label>Creator: { creatorUsername }</Label>
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
});

export default connect(mapStateToProps, { 
    updateProject, 
    closeProjectDetailSidebar, 
    getCommentsByProjectId
 })(ProjectInfo);