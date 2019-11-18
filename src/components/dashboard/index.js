import React, { Component } from 'react'
import "./styles.scss"

import NavigationBar from "../layout/NavigationBar";


export default class Dashboard extends Component {
    render() {
        return (
            <div className="image-wrapper">
                <NavigationBar />
            </div>
        )
    }
}
