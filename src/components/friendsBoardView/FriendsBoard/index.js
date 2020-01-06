import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

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


const FriendsBoard = ({ getFriends, getInvitations }) => {

    useEffect(() => {
        getFriends();
        getInvitations();
    }, []);

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
FriendsBoard.propTypes = {
    getFriends: PropTypes.func.isRequired,
    getInvitations: PropTypes.func.isRequired,
};

export default connect(null, { getFriends, getInvitations })(FriendsBoard)