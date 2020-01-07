import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { 
    Button,
    FormGroup, 
    Label
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import { createComment } from '../../../actions/comments';
import { COMMENT_PROJECT } from '../../../actions/types';


import "./styles.scss";

const CreateComment = ({ createComment, parentId, type }) => {

    const [content, setContent] = useState('');

    const handleSubmit = () => {
        const commentData = {
            content: content,
            type: type,
            parentId: parentId,
        }

        createComment(commentData);
        setContent('');
    }

    return (
        <Fragment>
            <AvForm>
                <FormGroup className={type === COMMENT_PROJECT ? 'comment-project-form' : 'comment-issue-form'}>
                    <Label>Comments</Label>
                    <AvField
                        id="comment" 
                        name="content"
                        type="textarea"
                        className={type === COMMENT_PROJECT ? 'comment-project-input' : 'comment-issue-input'}
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        validate={{
                            maxLength: {value: 500}
                        }}    
                    />
                </FormGroup>
                <FormGroup className="comment-button-form">
                    <Button 
                        color="primary"
                        className="btn-sm"
                        onClick={handleSubmit}
                    >
                        Comment
                    </Button>
                </FormGroup>
            </AvForm>
        </Fragment>
    )
}

CreateComment.propTypes = {
    parentId: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    createComment: PropTypes.func.isRequired,
};

export default connect(null, { createComment })(CreateComment)