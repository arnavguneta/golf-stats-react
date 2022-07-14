import React from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import Modal from '../UI/Authentication/Modal'
import ModalContent from '../UI/Authentication/ModalContent'
import Logo from '../UI/Authentication/Logo'
import ButtonDrawer from '../UI/Authentication/ButtonDrawer'
import PromptText from '../UI/Authentication/PromptText'

const LogoutForm = ({ handleSubmit }) => {

    const handleSubmitEvent = async e => {
        e.preventDefault();
        await handleSubmit();
    };

    return (
        <Modal>
            <ModalContent>
                <Logo promptField="Sign out of" logo="GOLF" />
                <form onSubmit={handleSubmitEvent}>
                    <PromptText>Leaving already?</PromptText>
                    <ButtonDrawer cancelText="Cancel" enterText="Sign Out" enterIcon={<LogoutIcon />} />
                </form>
            </ModalContent>
        </Modal>

    );
};

export default LogoutForm;