import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import Modal from '../UI/Authentication/Modal'
import ModalContent from '../UI/Authentication/ModalContent'
import Logo from '../UI/Authentication/Logo'
import ButtonDrawer from '../UI/Authentication/ButtonDrawer'
import PromptText from '../UI/Authentication/PromptText'

import { useNavigate, Link } from 'react-router-dom'

import styles from '../UI/Authentication/Authentication.module.css'

const LoginForm = ({ handleSubmit }) => {
    const navigate = useNavigate()

    // create state variables for each input
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmitEvent = async e => {
        e.preventDefault();

        const message = await handleSubmit(username, password);
        if (message.error) setError(message.error)
        else {
            console.log('setting token')
            setError('')
            localStorage.setItem("login_token", message.token)
            navigate('/')
        }
        console.log(message)
    };

    return (
        <Modal>
            <ModalContent>
                <Logo promptField="Sign in to" logo="GOLF" />
                <form onSubmit={handleSubmitEvent}>
                    <TextField
                        error={(error) ? true : false}
                        color={(error) ? 'error' : 'primary'}
                        label="Username"
                        variant="standard"
                        type="username"
                        required
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className={styles['MuiTextField-root']}
                        autoComplete="username"
                    />

                    <TextField
                        error={(error) ? true : false}
                        color={(error) ? 'error' : 'primary'}
                        label="Password"
                        variant="standard"
                        type="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className={styles['MuiTextField-root']}
                        autoComplete="current-password"
                        inputProps={{ minLength: 7 }}
                        sx={{ marginBottom: '16px' }}
                    />
                    <ButtonDrawer cancelText="Cancel" enterText="Sign In" enterIcon={<LoginIcon />} />
                </form>
                {error && <p className={styles.errorText}>Invalid username or password.</p>}
            </ModalContent>
            <ModalContent>
                <div className={styles.sub}>
                    <PromptText>
                        Need an account?
                        <Link className={styles.signup} to="/signup">Sign up.</Link>
                    </PromptText>
                </div>
            </ModalContent>
        </Modal >

    );
};

export default LoginForm;