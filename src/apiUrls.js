import backendURI from '../config';

const apiUrls = {
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
        },
        toggleFriendAsMemberByProjectId: id => (backendURI + `/api/projects/${id}/members`)
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
        updateById: id => (backendURI + `/api/cards/${id}`),
    },
    settings: {
        get: backendURI + "/api/settings",
        update: backendURI + "/api/settings",
    },
    dailyGoals: {
        toggle: backendURI + "/api/daily-goals",
        getAll: backendURI + "/api/daily-goals",
    },
    comments: {
        projectById: id => (backendURI + `/api/comments/project/${id}`),
        issueById: id => (backendURI + `/api/comments/card/${id}`),
        create: backendURI + "/api/comments"
    },
    friends: {
        getAll: backendURI + "/api/user/friends",
        removeFriendById: id => (backendURI + `/api/user/remove-friend/${id}`)
    },
    invitations: {
        getAll: backendURI + "/api/invitations",
        accept: backendURI + "/api/invitations/accept",
        create: backendURI + "/api/invitations/create",
        removeById: id => (backendURI + `/api/invitations/remove/${id}`)
    }
}

export default apiUrls;