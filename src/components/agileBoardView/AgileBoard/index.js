import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import Loader from 'react-loaders';
import Board from '@lourenci/react-kanban';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import "./styles.scss";
import NavigationBar from "../../layout/NavigationBar";
import Header from "../../layout/Header";
import Card from "../Card";
import { getAllProjects } from '../../../actions/projects';
import { 
    getKanbanCategoriesByProjectId, 
    createKanbanCategory, 
    deleteKanbanCategory, 
    updateKanbanCategory,
    rearangeKanbanBoard,
    deleteCard,
    createCard
} from "../../../actions/kanbanCategories";

class AgileBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: 1,
            newCategoryName: '',
            isModalOpen: false,
            title: '',
            description: '',
        };
    }

    componentDidMount() {
        this.props.getAllProjects();
        this.props.getKanbanCategoriesByProjectId(this.state.projectId);
    };

    componentDidUpdate(prevProps, prevState) {
        if(this.state.projectId !== prevState.projectId) {
            this.props.getKanbanCategoriesByProjectId(this.state.projectId);
        }
    };

    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    handleChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    };

    handleProjectChange = e => {
        this.setState({ projectId: parseInt(e.target.id) });
    };

    handleRemoveCategory = (board, lane) => {
        this.props.deleteKanbanCategory(lane.id);
    };

    handleRenameCategory = (board, lane) => {
        const kanbanCategoryData = {
            title: lane.title
        };
        this.props.updateKanbanCategory(kanbanCategoryData, lane.id);
    };

    handleCreateCategory = e => {
        e.preventDefault();

        const kanbanCategoryData = {
            title: this.state.newCategoryName,
            projectId: this.state.projectId
        };

        this.props.createKanbanCategory(kanbanCategoryData);
        this.setState({ newCategoryName: '' });
        setTimeout(() => { this.props.getKanbanCategoriesByProjectId(this.state.projectId)}, 1000);
    };

    handleKanbanReposition = (board, source, destination) => {
        const kanbanCategoriesData = board
            .lanes
            .map((kanbanCategory, index) => ({
                ...kanbanCategory,
                position: index
            }));
        this.props.rearangeKanbanBoard(kanbanCategoriesData);
    };

    sortKanbanCategoriesByPosition = kanbanCategories => {
        const sortedKanbanCategories = kanbanCategories.sort((a, b) => { return a.position - b.position });
        const sortedCards = sortedKanbanCategories.map(kanbanCategory => ({
            id: kanbanCategory.id,
            title: kanbanCategory.title,
            position: kanbanCategory.position,
            cards: kanbanCategory.cards.sort((a, b) => { return a.position - b.position })
        }));

        return sortedCards;
    };

    handleCardRemove = (board, lane, card) => {
        this.props.deleteCard(card.id);
    }

    handleCardCreation = e => {
        e.preventDefault();
        const { title, description } = this.state;
        const cardData = {
            title: title,
            description: description,
            projectId: 1,

        };

        this.props.createCard(cardData);
        this.setState({
            title: '',
            description: ''
        });
        this.toggleModal();
    }

    renderBoard = kanbanCategories => {
        if(kanbanCategories.isLoading) {
            <Loader type="ball-scale-multiple" className="loader-center" />;
        } else {
            if(kanbanCategories.data.length > 0) {
                return (
                    <Fragment>
                        <Board
                            allowRemoveLane
                            allowRenameLane
                            allowRemoveCard
                            onCardRemove={(board, source, destination) => this.handleCardRemove(board, source, destination)}
                            onCardDragEnd={(board, source, destination) => this.handleKanbanReposition(board, source, destination)}
                            onLaneRemove={(board, lane) => this.handleRemoveCategory(board, lane)}
                            onLaneRename={(board, lane) => this.handleRenameCategory(board, lane)}
                            onLaneDragEnd={(board, source, destination) => this.handleKanbanReposition(board, source, destination)}
                            renderCard={({ id, title, description }, { removeCard, dragging }) => (
                                <Card dragging={dragging} removeCard={removeCard} id={id} title={title} description={description} />
                            )}
                            initialBoard={{lanes: this.sortKanbanCategoriesByPosition(kanbanCategories.data)}}
                        />
                        <Input 
                            name="newCategoryName"
                            className="create-category-input"
                            placeholder="New category"
                            value={this.state.newCategoryName}
                            onChange={this.handleChange}
                        />
                        <i
                            onClick={this.handleCreateCategory} 
                            className="fas fa-plus add-column" 
                            data-toggle="tooltip" 
                            data-placement="bottom" 
                            title="Add category" 
                        />
                    </Fragment>
                );                
            } else {
                return <i className="fas fa-plus add-column" data-toggle="tooltip" data-placement="bottom" title="Add category" />;
            }
        }
    }

    render() {
        const { projectId, title, description, isModalOpen } = this.state;
        const { projectsNames, kanbanCategories } = this.props;
        const currentProject = projectsNames.find(project => project.id === projectId);
        
        return (
            projectsNames.isLoading ? <Loader type="ball-scale-multiple" className="loader-center" /> : (
                <div className="image-wrapper kanban-board-background-width">
                    <NavigationBar />
                    <div className="content-wrapper">
                        <Header/>
                        <div className="background-board">
                            <div className="agile-board-actions">
                                <button 
                                    id="dropdownMenu2" 
                                    className="btn btn-info dropdown-toggle action-btn" 
                                    data-toggle="dropdown" 
                                    type="button" 
                                    aria-haspopup="true" 
                                    aria-expanded="false"
                                >
                                    {(currentProject && currentProject.name) ? currentProject.name : "Filter By" }
                                </button>
                                {kanbanCategories.data.length === 0 ? '' : 
                                    <button 
                                        type="button" 
                                        className="btn btn-info action-btn"
                                        onClick={this.toggleModal}
                                    >
                                        New issue
                                    </button>
                                }

                                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                    {projectsNames.map(project => 
                                        (<button 
                                            key={project.id} 
                                            id={project.id}
                                            name={project.name} 
                                            onClick={this.handleProjectChange} 
                                            className="dropdown-item" 
                                            type="button">{ project.name }</button>))}
                                </div>
                            </div>
                            
                            <div className="loader-wrapper">
                                {this.renderBoard(kanbanCategories)}
                            </div>
                        </div>
                    </div>
                    <Modal 
                        isOpen={isModalOpen}
                        toggle={this.toggleModal}
                        backdrop={true}
                    >
                        <ModalHeader>Create Issue</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="card-title">Title</Label>
                                    <Input 
                                        onChange={this.handleChange}
                                        value={title} 
                                        type="text" 
                                        name="title" 
                                        id="card-title" 
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="card-description">Description</Label>
                                    <Input 
                                        onChange={this.handleChange} 
                                        value={description}
                                        type="textarea" 
                                        name="description" 
                                        id="card-description" 
                                    />
                                </FormGroup>
                            </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.handleCardCreation}>Create</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                </div>
            )
        )
    }
}

AgileBoard.propTypes = {
    getKanbanCategoriesByProjectId: PropTypes.func.isRequired,
    getAllProjects: PropTypes.func.isRequired,
    deleteKanbanCategory: PropTypes.func.isRequired,
    updateKanbanCategory: PropTypes.func.isRequired,
    createKanbanCategory: PropTypes.node.isRequired,
    rearangeKanbanBoard: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
    createCard: PropTypes.func.isRequired,
    projectsNames: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,    
    })),
    kanbanCategories: PropTypes.shape({
        isLoading: PropTypes.bool.isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                cards: PropTypes.arrayOf().isRequired,
            }),
        ).isRequired,})
};

const mapStateToProps = state => ({
    projectsNames: state.projects.data.map(project => ({ id: project.id, name: project.name })),
    kanbanCategories: state.kanbanCategories
});

export default connect(mapStateToProps, { 
    getKanbanCategoriesByProjectId, 
    getAllProjects, 
    deleteKanbanCategory, 
    updateKanbanCategory,
    createKanbanCategory,
    rearangeKanbanBoard,
    deleteCard,
    createCard
})(AgileBoard);
