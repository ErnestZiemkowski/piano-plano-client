import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import { Tooltip } from 'reactstrap';
import Loader from 'react-loaders';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from "../../layout/Header";
import ProjectInfo from '../ProjectInfo';
import NavigationBar from "../../layout/NavigationBar";
import ProjectWidget from "../ProjectWidget";
import ContentWrapper from "../../layout/ContentWrapper";
import ImageBackground from "../../layout/ImageBackground";
import BackgroundBoard from "../../layout/BackgroundBoard";
import CreateProjectModal from "../CreateProjectModal";

import { getAllProjects } from "../../../actions/projects"
import { countProgress } from '../../../utils/project';

import "./styles.scss";


const Dashboard = ({ getAllProjects, projects, projectIdSidebarDetails }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    useEffect(() => {
        getAllProjects();
    }, [])

    return (
        <ImageBackground>
            <NavigationBar />
            <ContentWrapper>
                <Header />
                <BackgroundBoard>
                    <div className="projects-board-actions">
                        <span
                            id="create-project" 
                            onClick={() => setIsModalOpen(!isModalOpen)} 
                            className="badge badge-dark" 
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </span>
                        <Tooltip 
                            placement="right" 
                            isOpen={tooltipOpen} 
                            target="create-project" 
                            toggle={() => setTooltipOpen(!tooltipOpen)}
                        >
                            Create new project
                        </Tooltip>
                    </div>
                    <div className="widgets-wrapper">
                        { projects.isLoading ?
                            <Loader type="ball-scale-multiple" className="loader-center" /> : projects.data.map(project => {
                                return <ProjectWidget 
                                    key={project.id} 
                                    id={project.id} 
                                    name={project.name} 
                                    createDateTime={project.createDateTime}  
                                    progress={countProgress(project)}    
                                />;
                            })}
                    </div>
                </BackgroundBoard>
            </ContentWrapper>
            { projectIdSidebarDetails === -1 ? '' : <ProjectInfo projectId={projectIdSidebarDetails} />}
            
            <CreateProjectModal
                isModalOpen={isModalOpen}
                toggleModal={() => setIsModalOpen(!isModalOpen)}
            />
        </ImageBackground>
    );
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
    projectIdSidebarDetails: state.layout.projectId,
});

export default connect(mapStateToProps, { getAllProjects })(Dashboard);