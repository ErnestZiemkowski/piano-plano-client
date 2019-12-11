import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Loader from 'react-loaders';

import Header from "../../layout/Header";
import NavigationBar from "../../layout/NavigationBar";
import ContentWrapper from "../../layout/ContentWrapper";
import ImageBackground from "../../layout/ImageBackground";
import BackgroundBoard from "../../layout/BackgroundBoard";

import "./styles.scss";

export class DailyGoalsBoard extends Component {
    render() {
        return (
            <ImageBackground>
                <NavigationBar />
                <ContentWrapper>
                    <Header />
                    <BackgroundBoard>

                    </BackgroundBoard>
                </ContentWrapper>
            </ImageBackground>
        )
    }
}


const mapStateToProps = state => ({
    
});

export default connect(mapStateToProps, {  })(DailyGoalsBoard)