import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Form, FormGroup, Label, Input } from 'reactstrap'

import './styles.scss';
import { updateProject } from '../../../actions/projects';
import { closeProjectDetailSidebar } from '../../../actions/layout';
import { monthNames } from '../../../utils/dateTime';


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
        const projectData = {
            [e.target.name]: e.target.value
        };

        this.props.updateProject(projectData, this.props.projectId);
    }    

    handleChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    }

    render() {
        const { name, description, createDateTime, creatorUsername } = this.state;
        const d = new Date(Date.parse(createDateTime));

        return (
            <div className="project-details-side-bar">
                <button onClick={() => this.props.closeProjectDetailSidebar()} type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h1 className="project-details-header">Project details</h1>
                <Form>
                    <FormGroup>
                        <Label>Creator: { creatorUsername }</Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>Created at: { d.getDate() } { monthNames[d.getMonth()] } { d.getFullYear() } { d.getHours() }:{ d.getMinutes() }</Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>Name</Label>
                        <Input 
                            id="name" 
                            name="name"
                            type="text"
                            value={name}
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
