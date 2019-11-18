const backendURI = 'http://localhost:5000';

module.exports = {
    auth: {
        register: backendURI + "/api/auth/signup",
        login: backendURI + "/api/auth/signin",
        loggedUser: backendURI + "/api/auth/user/me"
    }
}