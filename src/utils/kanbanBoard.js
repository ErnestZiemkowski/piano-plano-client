export const sortKanbanCategoriesByPosition = kanbanCategories => {
    const sortedKanbanCategories = kanbanCategories.sort((a, b) => { return a.position - b.position });
    const sortedCards = sortedKanbanCategories.map((kanbanCategory, index) => ({
        id: kanbanCategory.id,
        title: kanbanCategory.title,
        position: kanbanCategory.position,
        cards: kanbanCategory.cards.sort((a, b) => { return a.position - b.position })
    }));

    return sortedCards;
};