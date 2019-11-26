const backendURI = 'http://localhost:5000';

module.exports = {
    auth: {
        register: backendURI + "/api/auth/signup",
        login: backendURI + "/api/auth/signin",
        loggedUser: backendURI + "/api/auth/user/me"
    },
    projects: {
        getAll: backendURI + "/api/projects",
        deleteById: backendURI + "/api/projects",
        create: backendURI + "/api/projects",
        update: id => (backendURI + "/api/projects/" + id), 
    }
}