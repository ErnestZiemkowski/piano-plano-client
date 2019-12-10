import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FormGroup, Label, Button } from 'reactstrap'
import { AvForm, AvField } from 'availity-reactstrap-validation';

import { closeProjectDetailSidebar } from '../../../actions/layout';
import { updateProject } from '../../../actions/projects';
import { monthNames } from '../../../utils/dateTime';

import './styles.scss';


class ProjectInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            createDateTime: '',
            creatorUsername: '',
        };
    }

    componentWillMount() {
        this.setState({
            name: this.props.project.name,
            description: this.props.project.description,
            createDateTime: this.props.project.createDateTime,
            creatorUsername: this.props.project.creator.username,
        })            
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.project) {
            this.setState({
                name: nextProps.project.name,
                description: nextProps.project.description,
                createDateTime: nextProps.project.createDateTime,
                creatorUsername: nextProps.project.creator.username,
            });
        }
    }

    handleBlur = e => {
        const { updateProject, projectId } = this.props;
        const projectData = {
            [e.target.name]: e.target.value
        };

        updateProject(projectData, projectId);
    }    

    handleChange = e => this.setState({ [e.target.name] : e.target.value });

    render() {
        const { name, description, createDateTime, creatorUsername } = this.state;
        const d = new Date(Date.parse(createDateTime));

        return (
            <div className="project-details-side-bar">
                <Button 
                    className="close" 
                    type="button" 
                    aria-label="Close"
                    onClick={() => this.props.closeProjectDetailSidebar()} 
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
                            onBlur={this.handleBlur}
                            onChange={this.handleChange} 
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
                            onBlur={this.handleBlur}
                            onChange={this.handleChange} 
                            validate={{
                                maxLength: {value: 500}
                            }}
                        />
                    </FormGroup>
                </AvForm>
            </div>
        )
    }
}
ProjectInfo.propTypes = {
    project: PropTypes.object,
    projectId: PropTypes.number.isRequired,
    updateProject: PropTypes.func.isRequired,
    closeProjectDetailSidebar: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    project: state.projects.data.find(project => project.id === props.projectId)
});

export default connect(mapStateToProps, { updateProject, closeProjectDetailSidebar })(ProjectInfo);
