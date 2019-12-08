export const countProgress = project => {
    if (project.kanbanCategories.length === 0) return 0;
    const cardsPerProject = project.kanbanCategories.map(kanbanCategory => kanbanCategory.cards).flat();
    const cardsPerProjectLength = cardsPerProject.length;
    const cardsDoneLength = cardsPerProject.filter(card => card.done == true).length;

    return parseFloat(cardsDoneLength * 100 / cardsPerProjectLength);
}