import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import Loader from 'react-loaders';

import "./styles.scss";
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


class AgileBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: 1,
            isModalOpen: false,
        };
    }

    componentDidMount = () => {
        const { getAllProjects, getKanbanCategoriesByProjectId } = this.props;
        getAllProjects();
        getKanbanCategoriesByProjectId(this.state.projectId);
    };

    componentDidUpdate = (prevProps, prevState) => {
        const { getKanbanCategoriesByProjectId } = this.props;
        const { projectId } = this.state;
        if(projectId !== prevState.projectId) getKanbanCategoriesByProjectId(projectId);
    };

    handleProjectChange = e => {
        this.setState({ projectId: parseInt(e.target.id) });
    };

    toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen });

    render() {
        const { projectId, isModalOpen } = this.state;
        const { projectsNames, kanbanCategories } = this.props;
        const currentProject = projectsNames.find(project => project.id === projectId);
        
        return (
            projectsNames.isLoading ? <Loader type="ball-scale-multiple" className="loader-center" /> : (
                <ImageBackground className="kanban-board-background-width">
                    <NavigationBar />
                    <ContentWrapper>
                        <Header/>
                        <BackgroundBoard>
                            <ActionButtons 
                                handleProjectChange={this.handleProjectChange}
                                projectsNames={projectsNames}
                                currentProject={currentProject}
                                kanbanCategoriesLength={kanbanCategories.data.lenght}
                                toggleModal={this.toggleModal}
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
                        toggleModal={this.toggleModal} 
                    />
                </ImageBackground>
            )
        )
    }
}

AgileBoard.propTypes = {
    getKanbanCategoriesByProjectId: PropTypes.func.isRequired,
    getAllProjects: PropTypes.func.isRequired,
    projectsNames: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,    
    })),
    kanbanCategories: PropTypes.shape({
        isLoading: PropTypes.bool.isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                cards: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.number.isRequired,
                        createDateTime: PropTypes.string.isRequired,
                        title: PropTypes.string.isRequired,
                        description: PropTypes.string.isRequired,
                        position: PropTypes.number.isRequired,
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
                        }),
                    }),
                ),
            }),
        ).isRequired,})
};

const mapStateToProps = state => ({
    projectsNames: state.projects.data.map(project => ({ id: project.id, name: project.name })),
    kanbanCategories: state.kanbanCategories
});

export default connect(mapStateToProps, { getKanbanCategoriesByProjectId, getAllProjects })(AgileBoard);
