import { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import styles from './Session.module.css'
import Button from '@mui/material/Button';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useNavigate } from 'react-router';
import Title from '../UI/Title'

// just a new session form, it will render an active session once setup with login and or manual user start
// if newDisplayForm true and token not active: prompt for login on new session start
// else if newDisplayForm true and token active: create a new session
const ActiveSession = props => {
    const [error, setError] = useState(false)
    const app = useSelector((state) => state.app)
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (app.firstVisit) {
            navigate('/')
        } else if (!app.isTokenActive || app.displayNewForm) navigate('/new-session')
    }, [app.firstVisit, app.isTokenActive, app.displayNewForm, navigate])
    
    // when begin is clicked, prompt user to login and if they are logged in then load active session
    const onBeginHandler = (event) => {
        
    }

    return (
        <>
            {/* <Routes>
                <Route path="/" element={<Navigate to={(app.isTokenActive && !app.displayNewForm) ? "/" : ""} />} />
            </Routes> */}
            <div className={styles.center}>
                <div className={styles.columnCenter}>
                    <div>
                        <Title>ACTIVE SESSION</Title>
                    </div>
                    <div>
                        <Button endIcon={<PlayCircleFilledIcon />} color={(error) ? "error" : "primary"} variant="contained" onClick={onBeginHandler}
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                textDecoration: 'none',
                                minWidth: '200px',
                                minHeight: '60px',
                                fontSize: '1.25rem'
                            }}>BEGIN</Button>
                        <Button endIcon={<PlayCircleFilledIcon />} variant="contained" color={(error) ? "error" : "primary"} onClick={onBeginHandler}
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
        </>
    )
}

export default ActiveSession