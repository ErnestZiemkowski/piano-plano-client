import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Table, Tooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { removeFriend } from '../../../actions/friends';

import "./styles.scss";


const Friends = ({ friends, removeFriend }) => {

    const [tooltipOpen, setTooltipOpen] = useState(false);

    return (
        <div className="friends-list">
            <h5>Friends</h5>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th className="cell-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { friends.isLoading ? '' : friends.data.map((friend, index) => (
                        <tr key={friend.id}>
                            <th scope="row">{ index + 1 }</th>
                            <td>{ friend.username }</td>
                            <td className="cell-actions">
                                <FontAwesomeIcon 
                                    id="icon-remove-friend"
                                    icon={faTimes}
                                    onClick={() => removeFriend(friend.id)}
                                />
                                <Tooltip
                                    placement="right" 
                                    isOpen={tooltipOpen} 
                                    target="icon-remove-friend" 
                                    toggle={() => setTooltipOpen(!tooltipOpen)}
                                >
                                    Remove Friend
                                </Tooltip>
                            </td>
                        </tr> 
                    )) }
                </tbody>
            </Table>
        </div>
    )
}
Friends.propTypes = {
    removeFriend: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    friends: state.friends
});

export default connect(mapStateToProps, { removeFriend })(Friends)