import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Loader from 'react-loaders';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import Header from "../../layout/Header";
import NavigationBar from "../../layout/NavigationBar";
import ContentWrapper from "../../layout/ContentWrapper";
import ImageBackground from "../../layout/ImageBackground";
import BackgroundBoard from "../../layout/BackgroundBoard";
import Card from '../../agileBoardView/Card';

import { getDailyGoals } from "../../../actions/dailyGoals";

import "./styles.scss";

export class DailyGoalsBoard extends Component {

    componentDidMount() {
        const { getDailyGoals } = this.props;
        getDailyGoals();
    }

    render() {
        const { dailyGoals } = this.props;

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
                                    return <div className="daily-goal">
                                        <FontAwesomeIcon
                                            icon={faStar}
                                        >
                                            <b>{ dailyGoal.card.cardCode }</b> - <span className={ dailyGoal.card.isDone ? 'line-through' : '' }>{ dailyGoal.card.title }</span>
                                        </FontAwesomeIcon>
                                    </div>
                            })}
                        </div>
                    </BackgroundBoard>
                </ContentWrapper>
            </ImageBackground>
        )
    }
}
DailyGoalsBoard.propTypes = {

};

const mapStateToProps = state => ({
    dailyGoals: state.dailyGoals
});

export default connect(mapStateToProps, { getDailyGoals })(DailyGoalsBoard)