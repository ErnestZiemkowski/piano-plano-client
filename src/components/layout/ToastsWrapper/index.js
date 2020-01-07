import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import { Toast, ToastBody, ToastHeader } from 'reactstrap';

import { deleteToast } from '../../../actions/toasts';

import "./styles.scss";


const ToastsWrapper = props => {
    return (
        <div className="toasts-wrapper">
            { props.toasts.map((toast, index) => (
                <Toast 
                    key={ index }
                    isOpen={ true }    
                >
                    <ToastHeader 
                        icon={ toast.type }
                        toggle={() => props.deleteToast(toast.id)}
                    >
                        { toast.header }
                    </ToastHeader>
                    <ToastBody>
                        { toast.body }
                    </ToastBody>
                </Toast>))}
        </div>
    );
}

const mapStateToProps = state => ({
    toasts: state.toasts.data
});

export default connect(mapStateToProps, { deleteToast })(ToastsWrapper);