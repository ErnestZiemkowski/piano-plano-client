import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import Loader from 'react-loaders';
import KanbanBoard from '@lourenci/react-kanban';
import NewCategoryInput from "../NewCategoryInput";
import Card from "../Card";
import IssueDetailsModal from '../IssueDetailsModal';
import { 
    getKanbanCategoriesByProjectId, 
    createKanbanCategory, 
    deleteKanbanCategory, 
    updateKanbanCategory,
    rearangeKanbanBoard,
    deleteCard
} from "../../../actions/kanbanCategories";
import { sortKanbanCategoriesByPosition } from '../../../utils/kanbanBoard';

class Board extends Component {
    constructor(props) {
        super(props);
    }

    handleRemoveCategory = (board, lane) => {
        const { deleteKanbanCategory } = this.props;
        deleteKanbanCategory(lane.id);
    };

    handleRenameCategory = (board, lane) => {
        const { updateKanbanCategory } = this.props;
        const kanbanCategoryData = {
            title: lane.title
        };
        updateKanbanCategory(kanbanCategoryData, lane.id);
    };

    handleKanbanReposition = (board, source, destination) => {
        const { rearangeKanbanBoard } = this.props;
        const kanbanCategoriesData = board
            .lanes
            .map((kanbanCategory, index) => ({
                ...kanbanCategory,
                position: index
            }));
        rearangeKanbanBoard(kanbanCategoriesData);
    };

    handleCardRemove = (board, lane, card) => {
        const { deleteCard } = this.props;
        deleteCard(card.id);
    }

    render() {
        const { projectId, kanbanCategories } = this.props;
        if(kanbanCategories.isLoading) return <Loader type="ball-scale-multiple" className="loader-center" />;
        if(kanbanCategories.data.length > 0) {
            return (
                <Fragment>
                    <KanbanBoard
                        allowRemoveLane
                        allowRenameLane
                        allowRemoveCard
                        onCardRemove={(board, source, destination) => this.handleCardRemove(board, source, destination)}
                        onCardDragEnd={(board, source, destination) => this.handleKanbanReposition(board, source, destination)}
                        onLaneRemove={(board, lane) => this.handleRemoveCategory(board, lane)}
                        onLaneRename={(board, lane) => this.handleRenameCategory(board, lane)}
                        onLaneDragEnd={(board, source, destination) => this.handleKanbanReposition(board, source, destination)}
                        renderCard={({ id, cardCode, title, done }, { removeCard, dragging }) => (
                            <Card 
                                id={id} 
                                dragging={dragging} 
                                removeCard={removeCard} 
                                cardCode={cardCode} 
                                title={title}
                                done={done} 
                            />
                        )}
                        initialBoard={{lanes: sortKanbanCategoriesByPosition(kanbanCategories.data)}}
                    />
                    <NewCategoryInput projectId={projectId} />
                    <IssueDetailsModal/>
                </Fragment>
        )}
        return <NewCategoryInput projectId={projectId} />
    }
}

Board.propTypes = {
    getKanbanCategoriesByProjectId: PropTypes.func.isRequired,
    deleteKanbanCategory: PropTypes.func.isRequired,
    updateKanbanCategory: PropTypes.func.isRequired,
    createKanbanCategory: PropTypes.func.isRequired,
    rearangeKanbanBoard: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
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
        ).isRequired,}),
    projectId: PropTypes.number.isRequired,
};

export default connect(null, { 
    getKanbanCategoriesByProjectId, 
    deleteKanbanCategory, 
    updateKanbanCategory,
    createKanbanCategory,
    rearangeKanbanBoard,
    deleteCard,
})(Board);
