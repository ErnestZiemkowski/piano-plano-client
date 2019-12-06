import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import Loader from 'react-loaders';

import "./styles.scss";
import NavigationBar from "../../layout/NavigationBar";
import Header from "../../layout/Header";
import ProjectWidget from "../ProjectWidget";
import CreateProjectModal from "../CreateProjectModal";
import ProjectInfo from '../ProjectInfo';
import { getAllProjects } from "../../../actions/projects"


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        }
    }

    componentDidMount() {
        this.props.getAllProjects();
    }

    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    handleChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    }

    render() {
        const { projects, projectIdSidebarDetails } = this.props;
        const { isModalOpen } = this.state;
        return (
            <div className="image-wrapper">
                <NavigationBar />
                <div className="content-wrapper">
                    <Header />
                    <div className="background-board">
                        <div className="projects-board-actions">
                            <span onClick={this.toggleModal} className="badge badge-dark" data-toggle="tooltip" data-placement="bottom" title="Create new project">
                                <i className="fas fa-plus" />
                            </span>
                        </div>
                        <div className="widgets-wrapper">
                            { projects.isLoading ?
                                <Loader type="ball-scale-multiple" className="loader-center" /> : projects.data.map(project => 
                                    (<ProjectWidget key={project.id} id={project.id} name={project.name} createDateTime={project.createDateTime} />)
                                )}
                        </div>
                    </div>
                </div>
                { projectIdSidebarDetails === -1 ? '' : <ProjectInfo projectId={projectIdSidebarDetails} />}
                
                <CreateProjectModal
                    isModalOpen={isModalOpen}
                    toggleModal={this.toggleModal}
                />
            </div>
        )
    }
}

Dashboard.propTypes = {
    getAllProjects: PropTypes.func.isRequired,
    projects: PropTypes.shape({
        isLoading: PropTypes.bool.isRequired,
        data: PropTypes.array,
    }).isRequired,
    projectIdSidebarDetails: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
    projects: state.projects,
    projectIdSidebarDetails: state.layout.projectId
});

export default connect(mapStateToProps, { getAllProjects })(Dashboard);