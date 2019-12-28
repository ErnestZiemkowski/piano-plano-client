import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import "./styles.scss";

import { getSettings } from '../../../actions/settings'

class ImageBackground extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getSettings();
    }
    
    render() {
        const { className, backgroundImage } = this.props;

        return (
            <div 
                className={`image-background ${backgroundImage} ${className}`} 
            >
                {this.props.children}
            </div>
        )
    }
}
ImageBackground.propTypes = {
    backgroundImage: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    backgroundImage: state.settings.backgroundImage
});

export default connect(mapStateToProps, { getSettings })(ImageBackground);