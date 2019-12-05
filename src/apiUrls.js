const backendURI = 'http://localhost:5000';

module.exports = {
    auth: {
        register: backendURI + "/api/auth/signup",
        login: backendURI + "/api/auth/signin",
        loggedUser: backendURI + "/api/auth/user/me"
    },
    projects: {
        getAll: backendURI + "/api/projects",
        create: backendURI + "/api/projects",
        deleteById: id => (backendURI + "/api/projects/" + id),
        updateById: id => (backendURI + "/api/projects/" + id),
        kanbanCategories: {
            getByProjectId: id => (backendURI + `/api/projects/${id}/kanban-categories`),
        }
    },
    kanbanCategories: {
        create: backendURI + "/api/kanban-category",
        deleteById: id => (backendURI + `/api/kanban-category/${id}`),
        updateById: id => (backendURI + `/api/kanban-category/${id}`),
        rearangePosition: backendURI + "/api/kanban-category/rearange-position",
    },
    cards: {
        create: backendURI + "/api/cards",
        deleteById: id => (backendURI + `/api/cards/${id}`),
    }
}