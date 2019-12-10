import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button, 
    Form, 
    Label, 
    CardImg
} from 'reactstrap';
import { changeThemeOptions } from '../../../utils/background';
import { updateSettings } from '../../../actions/settings';

import './styles.scss';

class ThemeChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            background: ''
        };
    }

    componentWillMount() {
        const { currentBackgroundTheme } = this.props;
        this.setState({ background: currentBackgroundTheme + '.png' });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentBackgroundTheme) this.setState({ background: nextProps.currentBackgroundTheme });
    }
    
    toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen });

    handleBackgroundThemeChange = e => {
        e.preventDefault();
        this.setState({ background: e.target.name });
    }

    handleSubmit = () => {
        const { updateSettings } = this.props;
        const { background } = this.state;
        const settingsData = {
            backgroundImageUrl: background
        };

        updateSettings(settingsData);
        this.toggleModal();
    }

    render() {
        const { isModalOpen, background } = this.state;

        return (
            <Fragment>
                <Form className="theme-change-wrapper">
                    <Label><i className="fas fa-caret-right"/> Theme:</Label>
                    <Button
                        color="info" 
                        onClick={this.toggleModal}
                        className="btn btn-sm theme-change-btn"
                    >
                        <i class="fas fa-images"/> Browse
                    </Button>
                </Form>
                <Modal 
                    isOpen={isModalOpen}
                    toggle={this.toggleModal}
                    backdrop={true}
                    className="theme-change-modal modal-dialog-scrollable"
                >
                    <ModalHeader>Change themes</ModalHeader>
                    <ModalBody>
                        {changeThemeOptions.map(theme => (
                            <CardImg
                                top
                                name={theme}
                                width="100%"
                                className={theme === background ? 'theme theme-active' : 'theme'}
                                onClick={this.handleBackgroundThemeChange}
                                src={require(`../../../images/${theme}.png`)} 
                            />))}
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            color="primary" 
                            onClick={this.handleSubmit}
                            className="btn btn-sm"
                        >
                            Save
                        </Button>{' '}
                        <Button 
                            color="secondary" 
                            onClick={this.toggleModal}
                            className="btn btn-sm"
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}
ThemeChange.propTypes = {
    currentBackgroundTheme: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    currentBackgroundTheme: state.settings.backgroundImage
})

export default connect(mapStateToProps, { updateSettings })(ThemeChange)