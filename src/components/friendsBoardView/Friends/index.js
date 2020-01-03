import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Table } from 'reactstrap';
import Loader from 'react-loaders';

import { removeFriend } from '../../../actions/friends';

import "./styles.scss";

export class Friends extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { friends, removeFriend } = this.props;
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
                        { friends.isLoading ? <Loader type="ball-scale-multiple" className="loader-center" /> : friends.data.map((friend, index) => {
                            return <tr key={ index }>
                                <th scope="row">{ index + 1 }</th>
                                <td>{ friend.username }</td>
                                <td className="cell-actions">
                                    <i onClick={() => removeFriend(friend.id)} className="fas fa-times"/>
                                </td>
                            </tr>;
                        }) }
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    friends: state.friends
})

export default connect(mapStateToProps, { removeFriend })(Friends)