import React, { Component } from 'react'

import Header from '../../layout/Header';
import ThemeChange from '../ThemeChange';
import NavigationBar from '../../layout/NavigationBar';
import ContentWrapper from "../../layout/ContentWrapper";
import BackgroundBoard from "../../layout/BackgroundBoard";
import ImageBackground from "../../layout/ImageBackground";


export default class Settings extends Component {
    render() {
        return (
            <ImageBackground>
                <NavigationBar/>
                <ContentWrapper>
                    <Header />
                    <BackgroundBoard>
                        <ThemeChange/>
                    </BackgroundBoard>
                </ContentWrapper>
            </ImageBackground>
        )
    }
}