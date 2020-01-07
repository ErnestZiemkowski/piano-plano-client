import React, { Fragment, useState, useEffect } from 'react'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faCaretRight } from '@fortawesome/free-solid-svg-icons';

import { changeThemeOptions } from '../../../utils/background';
import { updateSettings } from '../../../actions/settings';

import './styles.scss';

const ThemeChange = ({ currentBackgroundTheme, updateSettings }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [background, setBackground] = useState('');

    useEffect(() => {
        setBackground(currentBackgroundTheme + '.png');
    }, [currentBackgroundTheme])


    const handleBackgroundThemeChange = e => {
        setBackground(e.target.name);
    }

    const handleSubmit = () => {
        const settingsData = {
            backgroundImageUrl: background
        };

        updateSettings(settingsData);
        setIsModalOpen(!isModalOpen);
    }


    return (
        <Fragment>
            <Form className="theme-change-wrapper">
                <Label>
                    <FontAwesomeIcon icon={faCaretRight} /> Theme:
                </Label>
                <Button
                    color="info" 
                    onClick={() => setIsModalOpen(!isModalOpen)}
                    className="btn btn-sm theme-change-btn"
                >
                    <FontAwesomeIcon icon={faImages} /> Browse
                </Button>
            </Form>
            <Modal 
                isOpen={isModalOpen}
                toggle={() => setIsModalOpen(!isModalOpen)}
                backdrop={true}
                className="theme-change-modal modal-dialog-scrollable"
            >
                <ModalHeader>Change themes</ModalHeader>
                <ModalBody>
                    {changeThemeOptions.map((theme, index) => (
                        <CardImg
                            key={index}
                            top
                            name={theme}
                            width="100%"
                            className={theme === background ? 'theme theme-active' : 'theme'}
                            onClick={handleBackgroundThemeChange}
                            src={require(`../../../images/${theme}.png`)} 
                        />))}
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="primary" 
                        onClick={handleSubmit}
                        className="btn btn-sm"
                    >
                        Save
                    </Button>{' '}
                    <Button 
                        color="secondary" 
                        onClick={() => setIsModalOpen(!isModalOpen)}
                        className="btn btn-sm"
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    )
};

ThemeChange.propTypes = {
    currentBackgroundTheme: PropTypes.string.isRequired,
    updateSettings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    currentBackgroundTheme: state.settings.backgroundImage
})

export default connect(mapStateToProps, { updateSettings })(ThemeChange)