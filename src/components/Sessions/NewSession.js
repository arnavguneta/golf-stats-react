import { useSelector } from 'react-redux'

import styles from './Session.module.css'
import Button from '@mui/material/Button';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';

// just a new session form, it will render an active session once setup with login and or manual user start
    // if newDisplayForm true and token not active: prompt for login on new session start
    // else if newDisplayForm true and token active: create a new session
const NewSession = props => {
    const app = useSelector((state) => state.app)
    const navigate = useNavigate()

    const onBeginHandler = (event) => {
        if (app.displayNewForm && !app.isTokenActive) navigate('/login', { replace: true })
        
    }

    return (
        <div className={styles.center}>
            <div className={styles.columnCenter}>
                <div>
                    <Typography
                        variant="h3"
                        noWrap
                        component="h1"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        NEW SESSION
                    </Typography>
                    <Typography
                        variant="h4"
                        noWrap
                        component="h1"
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '1px',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        NEW SESSION
                    </Typography>
                </div>
                <div>
                    <Button endIcon={<PlayCircleFilledIcon />} variant="contained" onClick={onBeginHandler}
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            textDecoration: 'none',
                            minWidth: '200px', 
                            minHeight: '60px', 
                            fontSize: '1.25rem'
                        }}>BEGIN</Button>
                        <Button endIcon={<PlayCircleFilledIcon />} variant="contained" onClick={onBeginHandler}
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            textDecoration: 'none',
                            minWidth: '125px', 
                            minHeight: '50px', 
                            fontSize: '1rem'
                        }}>BEGIN</Button>
                        

                </div>
            </div>

        </div>
    )
}

export default NewSession