import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import { acceptInvitation, removeInvitation } from '../../../actions/invitations';

import "./styles.scss";


const Invitations = ({ invitations, acceptInvitation, removeInvitation }) => {
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
                    { invitations.isLoading ? '' : invitations.data.map((invitation, index) => {
                        return <tr key={ invitation.id }>
                            <th scope="row">{ index + 1 }</th>
                            <td>{ invitation.receiverEmail }</td>
                            <td className="cell-actions">
                                <FontAwesomeIcon 
                                    icon={faCheck} 
                                    onClick={() => acceptInvitation({ id: invitation.id })} 
                                />
                                <FontAwesomeIcon 
                                    icon={faTimes} 
                                    onClick={() => removeInvitation(invitation.id)} 
                                />
                            </td>
                        </tr>
                    }) }
                </tbody>
            </Table>
        </div>
    )
}


Invitations.propTypes = {
    acceptInvitation: PropTypes.func.isRequired,
    removeInvitation: PropTypes.func.isRequired,
    invitations: PropTypes.shape({
        isLoading: PropTypes.bool.isRequired,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                creator: PropTypes.object,
                receiverEmail: PropTypes.string.isRequired,
                createdAt: PropTypes.string.isRequired,
                accepted: PropTypes.bool.isRequired,
            }),
        ),
    }),
};

const mapStateToProps = (state) => ({
    invitations: state.invitations
});

export default connect(mapStateToProps, { acceptInvitation, removeInvitation })(Invitations)