import React from "react";
import { Route, Redirect } from "react-router-dom";    
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "react-loaders";


const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if(auth.isLoading) return <Loader type="ball-scale-multiple" active />;
            if(auth.isAuthenticated) return <Component {...props} />;
            return <Redirect to="/login" />;
        }}
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);