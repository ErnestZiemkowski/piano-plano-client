import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import Loader from 'react-loaders';

import Board from '../Board';
import Header from "../../layout/Header";
import ActionButtons from '../ActionButtons';
import NavigationBar from "../../layout/NavigationBar";
import ContentWrapper from "../../layout/ContentWrapper";
import ImageBackground from "../../layout/ImageBackground";
import CreateIssueModal from '../CreateIssueModal';
import BackgroundBoard from "../../layout/BackgroundBoard";

import { getAllProjects } from '../../../actions/projects';
import { getKanbanCategoriesByProjectId } from "../../../actions/kanbanCategories";

import "./styles.scss";


const AgileBoard = ({ getAllProjects, getKanbanCategoriesByProjectId, projectsNames, kanbanCategories }) => {
    const [projectId, setProjectId] = useState(1);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        getAllProjects();
        getKanbanCategoriesByProjectId(projectId);
    }, []);

    useEffect(() => {
        getKanbanCategoriesByProjectId(projectId);
    }, projectId);


    const handleProjectChange = e => setProjectId(parseInt(e.target.id));
    const toggleModal = () => setModalOpen(!isModalOpen);
    const currentProject = projectsNames.find(project => project.id === projectId);
    
    return (
        projectsNames.isLoading ? <Loader type="ball-scale-multiple" className="loader-center" /> : (
            <ImageBackground className="kanban-board-background-width">
                <NavigationBar />
                <ContentWrapper>
                    <Header/>
                    <BackgroundBoard>
                        <ActionButtons 
                            projectsNames={projectsNames}
                            currentProject={currentProject}
                            kanbanCategoriesLength={kanbanCategories.data.length}
                            handleProjectChange={handleProjectChange}
                            toggleModal={toggleModal}
                        />
                        <div className={`board-wrapper ${kanbanCategories.isLoading ? 'position-center': 'position-left'}`}>
                            <Board 
                                projectId={projectId} 
                                kanbanCategories={kanbanCategories} 
                            />
                        </div>
                    </BackgroundBoard>
                </ContentWrapper>
                <CreateIssueModal 
                    projectId={projectId} 
                    isModalOpen={isModalOpen} 
                    toggleModal={toggleModal} 
                />
            </ImageBackground>
        )
    );
};

AgileBoard.propTypes = {
    getKanbanCategoriesByProjectId: PropTypes.func.isRequired,
    getAllProjects: PropTypes.func.isRequired,
    projectsNames: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,    
        })
    ),
    kanbanCategories: PropTypes.shape({
        isLoading: PropTypes.bool.isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                position: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                cards: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.number.isRequired,
                        done: PropTypes.bool.isRequired,
                        cardCode: PropTypes.string.isRequired,
                        comments: PropTypes.array.isRequired,
                        createdAt: PropTypes.string.isRequired,
                        updatedAt: PropTypes.string.isRequired,
                        title: PropTypes.string.isRequired,
                        description: PropTypes.string.isRequired,
                        position: PropTypes.number.isRequired,
                        dailyGoalSet: PropTypes.bool.isRequired,
                        kanbanCategoryTitle: PropTypes.string.isRequired,
                        creator: PropTypes.shape({
                            id: PropTypes.number.isRequired,
                            username: PropTypes.string.isRequired,
                            email: PropTypes.string.isRequired,
                            roles: PropTypes.arrayOf(
                                PropTypes.shape({
                                    id: PropTypes.number.isRequired,
                                    name: PropTypes.string.isRequired,
                                }),
                            ).isRequired,
                            friends: PropTypes.array.isRequired,
                        }),
                    }),
                ),
            }),
        ).isRequired,
    })
};

const mapStateToProps = state => ({
    projectsNames: state.projects.data.map(project => ({ id: project.id, name: project.name })),
    kanbanCategories: state.kanbanCategories
});

export default connect( mapStateToProps, {
    getAllProjects,
    getKanbanCategoriesByProjectId
} )(AgileBoard);