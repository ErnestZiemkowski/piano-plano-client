import React, { Component, Fragment } from 'react'
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

class CreateComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
    }

    handleChange = e => this.setState({ [e.target.name] : e.target.value });

    handleSubmit = () => {
        const { content } = this.state;
        const { createComment, parentId, type } = this.props;

        const commentData = {
            content: content,
            type: type,
            parentId: parentId,
        }

        createComment(commentData);
        this.setState({ content: '' });
    }

    render() {
        const { content } = this.state;
        const { type } = this.props;

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
                            onChange={this.handleChange}
                            validate={{
                                maxLength: {value: 500}
                            }}    
                        />
                    </FormGroup>
                    <FormGroup className="comment-button-form">
                        <Button 
                            color="primary"
                            className="btn-sm"
                            onClick={this.handleSubmit}
                        >
                            Comment
                        </Button>
                    </FormGroup>
                </AvForm>
            </Fragment>
            )
    }
}
CreateComment.propTypes = {
    parentId: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    fetchComments: PropTypes.func.isRequired,
};

export default connect(null, { createComment })(CreateComment)