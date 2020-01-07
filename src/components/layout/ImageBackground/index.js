import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import { getSettings } from '../../../actions/settings'

import "./styles.scss";


const ImageBackground = ({ className, children, backgroundImage, getSettings }) => {

    useEffect(() => {
        getSettings();
    }, []);
    
    return (
        <div 
            className={`image-background ${backgroundImage} ${className}`} 
        >
            {children}
        </div>
    )
}

ImageBackground.propTypes = {
    backgroundImage: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    backgroundImage: state.settings.backgroundImage
});

export default connect(mapStateToProps, { getSettings })(ImageBackground);