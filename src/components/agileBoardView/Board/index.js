import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import Loader from 'react-loaders';
import KanbanBoard, { moveLane, moveCard } from '@lourenci/react-kanban';

import NewCategoryInput from "../NewCategoryInput";
import Card from "../Card";
import IssueDetailsModal from '../IssueDetailsModal';

import { 
    getKanbanCategoriesByProjectId, 
    deleteKanbanCategory, 
    updateKanbanCategory,
    rearangeKanbanBoard,
    deleteCard
} from "../../../actions/kanbanCategories";
import { sortKanbanCategoriesByPosition } from '../../../utils/kanbanBoard';

const Board = ({ deleteCard, deleteKanbanCategory, updateKanbanCategory, rearangeKanbanBoard, kanbanCategories, projectId }) => {

    const [board, setBoard] = useState({lanes: sortKanbanCategoriesByPosition(kanbanCategories.data)});

    useEffect(() => {
        setBoard({ lanes: sortKanbanCategoriesByPosition(kanbanCategories.data) });
    }, []);

    useEffect(() => {
        setBoard({ lanes: sortKanbanCategoriesByPosition(kanbanCategories.data) });
    }, [kanbanCategories.data]);

    const handleRemoveCategory = lane => {
        deleteKanbanCategory(lane.id);
    };

    const handleRenameCategory = (lane, laneTitle) => {
        const kanbanCategory = {
            title: laneTitle
        };
        updateKanbanCategory(kanbanCategory, lane.id);
    };

    const handleKanbanReposition = (source, destination, removedItemType) => {
        let newBoard;
        if(removedItemType === 'lane') newBoard = moveLane(board, source, destination); 
        if(removedItemType === 'card') newBoard = moveCard(board, source, destination); 

        const kanbanCategoriesData = newBoard
            .lanes
            .map((kanbanCategory, index) => ({
                ...kanbanCategory,
                position: index
            }));
        rearangeKanbanBoard(kanbanCategoriesData);
        setBoard({lanes: kanbanCategoriesData});
    };

    const handleCardRemove = id => {
        const newBoard = board.lanes.map(lane => {
            const cards = lane.cards.filter(card => card.id !== id)
            return {
                ...lane,
                cards    
            };
        });
        setBoard({lanes: newBoard});
        deleteCard(id);
    }

    if(kanbanCategories.isLoading) return <Loader type="ball-scale-multiple" className="loader-center" />;
    if(board) {
        return (
            <Fragment>
                <KanbanBoard
                    allowRemoveLane
                    allowRenameLane
                    allowAddLane
                    allowRemoveCard
                    onLaneRemove={lane => handleRemoveCategory(lane)}
                    onLaneRename={(lane, laneTitle) => handleRenameCategory(lane, laneTitle)}
                    onLaneDragEnd={(source, destination) => handleKanbanReposition(source, destination, 'lane')}
                    onCardDragEnd={(source, destination) => handleKanbanReposition(source, destination, 'card')}
                    renderLaneAdder={() => <NewCategoryInput projectId={projectId} kanbanCategoriesCount={0} />}
                    renderCard={({ id, cardCode, title, done }) => (
                        <Card 
                            id={id}
                            handleCardRemove={handleCardRemove}
                            cardCode={cardCode}
                            title={title}
                            done={done}
                        />)}
                >
                    {board}
                </KanbanBoard>
                <IssueDetailsModal/>
            </Fragment>
    )}
}

Board.propTypes = {
    getKanbanCategoriesByProjectId: PropTypes.func.isRequired,
    deleteKanbanCategory: PropTypes.func.isRequired,
    updateKanbanCategory: PropTypes.func.isRequired,
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
                cards: PropTypes.array.isRequired,
                // cards: PropTypes.arrayOf(
                //     PropTypes.shape({
                //         id: PropTypes.number.isRequired,
                //         createDateTime: PropTypes.string.isRequired,
                //         title: PropTypes.string.isRequired,
                //         description: PropTypes.string.isRequired,
                //         position: PropTypes.number.isRequired,
                //         creator: PropTypes.shape({
                //             id: PropTypes.number.isRequired,
                //             username: PropTypes.string.isRequired,
                //             email: PropTypes.string.isRequired,
                //             roles: PropTypes.arrayOf(
                //                 PropTypes.shape({
                //                     id: PropTypes.number.isRequired,
                //                     name: PropTypes.string.isRequired,
                //                 }),
                //             ).isRequired,
                //         }),
                //     }),
                // ),
            }),
        ).isRequired,}),
    projectId: PropTypes.number.isRequired,
};

export default connect( null, {
    getKanbanCategoriesByProjectId, 
    deleteKanbanCategory, 
    updateKanbanCategory,
    rearangeKanbanBoard,
    deleteCard,
} )(Board);