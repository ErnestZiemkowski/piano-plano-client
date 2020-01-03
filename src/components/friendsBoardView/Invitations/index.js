import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Table } from 'reactstrap';
import Loader from 'react-loaders';

import { acceptInvitation, removeInvitation } from '../../../actions/invitations';

import "./styles.scss";

export class Invitations extends Component {
    render() {
        const { invitations, acceptInvitation, removeInvitation } = this.props;
        return (
            <div className="invitations-list">
                <h5>Invitations</h5>
                <Table>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th className="cell-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { invitations.isLoading ? <Loader type="ball-scale-multiple" className="loader-center" /> : invitations.data.map((invitation, index) => {
                            return <tr key={ index }>
                                <th scope="row">{ index + 1 }</th>
                                <td>{ invitation.receiverEmail }</td>
                                <td className="cell-actions">
                                    <i onClick={() => acceptInvitation({ id: invitation.id })} className="fas fa-check"/>
                                    <i onClick={() => removeInvitation(invitation.id)} className="fas fa-times"/>
                                </td>
                            </tr>;
                        }) }
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    invitations: state.invitations
});

export default connect(mapStateToProps, { acceptInvitation, removeInvitation })(Invitations)