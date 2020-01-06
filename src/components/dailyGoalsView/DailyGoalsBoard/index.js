import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loader from 'react-loaders';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import Header from "../../layout/Header";
import NavigationBar from "../../layout/NavigationBar";
import ContentWrapper from "../../layout/ContentWrapper";
import ImageBackground from "../../layout/ImageBackground";
import BackgroundBoard from "../../layout/BackgroundBoard";

import { getDailyGoals } from "../../../actions/dailyGoals";

import "./styles.scss";


const DailyGoalsBoard = ({ dailyGoals, getDailyGoals }) => {

    useEffect(() => {
        getDailyGoals();
    }, [])

    return (
        <ImageBackground>
            <NavigationBar />
            <ContentWrapper>
                <Header />
                <BackgroundBoard>
                    <div className="daily-goals-header">
                        <h2>Your Daily Goals</h2>
                    </div>
                    <div className="daily-goals-wrapper">
                        { dailyGoals.isLoading ? 
                            <Loader type="ball-scale-multiple" className="loader-center" /> : dailyGoals.data.map(dailyGoal => {
                                return <div className="daily-goal" key={ dailyGoal.id }>
                                    <FontAwesomeIcon icon={faStar} />
                                    {' '}<b>{ dailyGoal.card.cardCode }</b> - <span className={ dailyGoal.card.isDone ? 'line-through' : '' }>{ dailyGoal.card.title }</span>
                                </div>
                        })}
                    </div>
                </BackgroundBoard>
            </ContentWrapper>
        </ImageBackground>
    )
};

DailyGoalsBoard.propTypes = {
    getDailyGoals: PropTypes.func.isRequired,
    dailyGoals: PropTypes.shape({
        isLoading: PropTypes.bool.isRequired,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                createdAt: PropTypes.string.isRequired,
                expiresAt: PropTypes.string.isRequired,
                card: PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    cardCode: PropTypes.string.isRequired,
                    done: PropTypes.bool.isRequired,
                    title: PropTypes.string.isRequired,    
                }).isRequired,
                user: PropTypes.object.isRequired,
            }),
        ).isRequired,
    }),
};

const mapStateToProps = state => ({
    dailyGoals: state.dailyGoals
});

export default connect(mapStateToProps, { getDailyGoals })(DailyGoalsBoard)