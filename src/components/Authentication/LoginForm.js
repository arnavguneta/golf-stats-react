import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom'

import Typography from '@mui/material/Typography';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';

import classes from './Login.module.css'

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
            navigate('/home')
        }
        console.log(message)
    };

    return (
        <div className={`${classes.modalContainer}`}>
            <div className={`${classes.root}`}>
                <div className={classes.logo}>
                    <GolfCourseIcon />
                    <div>
                        <Typography
                            variant="h6"
                            noWrap
                            component="span"
                            href="/"
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 500,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Sign in to
                        </Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 600,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            GOLF
                        </Typography>
                    </div>
                </div>

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
                        className={classes['MuiTextField-root']}
                        autoComplete="username"
                    />
                    <div>

                    </div>
                    <TextField
                        error={(error) ? true : false}
                        color={(error) ? 'error' : 'primary'}
                        label="Password"
                        variant="standard"
                        type="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className={classes['MuiTextField-root']}
                        autoComplete="current-password"
                        inputProps={{ minLength: 7 }}
                    />
                    <div>
                        {/* startIcon={<CancelIcon />} */}
                        <Button className={classes['MuiButton-root']} variant="outlined" color="error" href="/home" >
                            Cancel
                        </Button>
                        <Button className={classes['MuiButton-root']} type="submit" variant="contained" color="primary" endIcon={<LoginIcon />}>
                            Sign In
                        </Button>
                    </div>
                </form>
                {error && <p className={classes.errorText}>Invalid username or password.</p>}
            </div>

        </div>

    );
};

export default LoginForm;