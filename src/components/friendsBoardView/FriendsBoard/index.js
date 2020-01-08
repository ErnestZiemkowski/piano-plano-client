import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from "prop-types";

import Friends from '../Friends';
import Invitations from '../Invitations';
import Header from "../../layout/Header";
import NavigationBar from "../../layout/NavigationBar";
import ContentWrapper from "../../layout/ContentWrapper";
import ImageBackground from "../../layout/ImageBackground";
import BackgroundBoard from "../../layout/BackgroundBoard";
import CreateInvitation from "../../friendsBoardView/CreateInvitation";

import { getFriends } from '../../../actions/friends';
import { getInvitations } from '../../../actions/invitations';
import { createToast } from '../../../actions/toasts';

import "./styles.scss";


const FriendsBoard = ({ createToast, getFriends, getInvitations }) => {

    const errors = useSelector(store => store.errors);
    const invitations = useSelector(store => store.invitations);

    useEffect(() => {
        getFriends()
        getInvitations();
    }, []);

    useEffect(() => {
        getFriends()
    }, [invitations.data]);
    
    useEffect(() => {
        if (errors.message) {
            const toast = {
                header: `Error - ${errors.status}`,
                body: errors.message,
                type: 'danger' 
            };
            createToast(toast);    
        }
    }, [errors.message]);

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
    errors: PropTypes.shape({
        timestamp: PropTypes.string,
        status: PropTypes.number,
        error: PropTypes.string,
        message: PropTypes.string,
        path: PropTypes.string,
    }),
};

export default connect(null, { createToast, getFriends, getInvitations })(FriendsBoard);