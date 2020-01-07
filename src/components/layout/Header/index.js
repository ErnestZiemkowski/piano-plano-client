import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'reactstrap';

import { daysNames, monthNames } from '../../../utils/dateTime';
import { toggleNavigationSidebar } from '../../../actions/layout';

import './styles.scss';


const Header = ({ userName, toggleNavigationSidebar }) => {

    const [date, setDate] = useState(new Date());
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const tick = () => {
        setDate(new Date());
    }

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => {
            clearInterval(timerID);
        };
    }, []);

    let time = date.toLocaleTimeString();
    time = time.substring(0, 5)

    return (
        <div className="header">
            <span className="text-light">
                <span 
                    id="bars"
                    onClick={() => toggleNavigationSidebar()} 
                    className="badge badge-light" 
                >
                    <FontAwesomeIcon icon={faBars} />
                </span>
                <Tooltip 
                    placement="bottom" 
                    isOpen={tooltipOpen} 
                    target="bars" 
                    toggle={() => setTooltipOpen(!tooltipOpen)} 
                >
                    Toggle sidebar
                </Tooltip>
                &nbsp;
                Hello, {userName}
            </span>
            <span className="text-light">
                { time }
            </span>                
            <span className="text-light">
                {daysNames[date.getDay()]}, {date.getDate()} {monthNames[date.getMonth()]} {date.getFullYear()}
            </span>
        </div>
    );
}    

Header.propTypes = {
    userName: PropTypes.string.isRequired, 
    toggleNavigationSidebar: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    userName: state.auth.user.sub
});

export default connect(mapStateToProps, { toggleNavigationSidebar })(Header);