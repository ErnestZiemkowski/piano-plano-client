import React from 'react'

import { monthNames, renderMinutes } from '../../../utils/dateTime';

import "./styles.scss";

export default Comment = props => {
    const d = new Date(Date.parse(props.comment.createdAt));

    return (
        <div className="issue-comment">
            <div className="issue-creator">
                <b>{ props.comment.creator.username }</b>
                <small>{ d.getDate() } { monthNames[d.getMonth()] } { d.getFullYear() } { d.getHours() }:{ renderMinutes(d.getMinutes()) }</small>
            </div>
            <small>{ props.comment.content }</small>
        </div>
    )
}
