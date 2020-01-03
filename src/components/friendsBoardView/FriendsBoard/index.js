import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import Loader from 'react-loaders';

import Header from "../../layout/Header";
import NavigationBar from "../../layout/NavigationBar";
import ContentWrapper from "../../layout/ContentWrapper";
import ImageBackground from "../../layout/ImageBackground";
import BackgroundBoard from "../../layout/BackgroundBoard";
import CreateInvitation from "../../friendsBoardView/CreateInvitation";
import Friends from '../Friends';
import Invitations from '../Invitations';

import { getInvitations } from '../../../actions/invitations';
import { getFriends } from '../../../actions/friends';

import "./styles.scss";


class FriendsBoard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { getFriends, getInvitations } = this.props;
        getFriends();
        getInvitations();
    }

    render() {
        return (
            <ImageBackground>
                <NavigationBar />
                <ContentWrapper>
                    <Header />
                    <BackgroundBoard>
                        <CreateInvitation />
                        <div className="friends-board">
                            <Friends />
                            <Invitations />
                        </div>
                    </BackgroundBoard>
                </ContentWrapper>            
            </ImageBackground>
        )
    }
}

const mapStateToProps = state => ({
    
});

export default connect(mapStateToProps, { getFriends, getInvitations })(FriendsBoard)