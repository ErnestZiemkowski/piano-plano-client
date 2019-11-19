import React, { Component } from 'react'
import "./styles.scss"

import NavigationBar from "../layout/NavigationBar";
import Header from "../layout/Header";

export default class Dashboard extends Component {
    render() {
        return (
            <div className="image-wrapper">
                <NavigationBar />
                <div className="content-wrapper">
                    <Header/>
                    <div className="background-board">
                        <span><i class="fas fa-plus-circle fa-5x"></i></span>
                    </div>
                </div>
            </div>
        )
    }
}
