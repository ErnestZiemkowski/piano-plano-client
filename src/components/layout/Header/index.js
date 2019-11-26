import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import './styles.scss';
import { daysNames, monthNames } from '../../../utils/dateTime';
import { toggleNavigationSidebar } from '../../../actions/layout';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    
    render() {
        const { userName } = this.props;
        const { date } = this.state;
        let time = date.toLocaleTimeString();
        time = time.substring(0, 5)

        return (
            <div className="header">
                <span className="text-light">
                    <span onClick={() => this.props.toggleNavigationSidebar()} className="badge badge-light" data-toggle="tooltip" data-placement="bottom" title="Create new project">
                        <i className="fas fa-bars" />
                    </span> {' '}
                    Welcome back, {userName}
                </span>
                <span className="text-light">{ time }</span>                
                <span className="text-light">{daysNames[date.getDay()]}, {date.getDate()} {monthNames[date.getMonth()]} {date.getFullYear()}</span>
            </div>
        );
    }    
}

Header.propTypes = {
    toggleNavigationBar: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired, 
    toggleNavigationSidebar: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    userName: state.auth.user.sub
});

export default connect(mapStateToProps, { toggleNavigationSidebar })(Header);
