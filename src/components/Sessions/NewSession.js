import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import styles from './Session.module.css'
import Button from '@mui/material/Button';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useNavigate } from 'react-router';
import Title from '../UI/Title'

// just a new session form, it will render an active session once setup with login and or manual user start
// if newDisplayForm true and token not active: prompt for login on new session start
// else if newDisplayForm true and token active: create a new session
const NewSession = props => {
    const [error, setError] = useState(false)
    const app = useSelector((state) => state.app)
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (app.firstVisit) {
            navigate('/')
        } else if (app.isTokenActive && !app.displayNewForm) navigate('/active-session')
    }, [app.firstVisit, app.isTokenActive, app.displayNewForm, navigate])

    // at this point, no active session was found so create one and navigate to active session
    const showActiveSession = async () => {
        const token = localStorage.getItem("login_token")
        const createSessionAttempt = await fetch(`${app.api}/sessions/create`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, method: 'POST' })
        const activeSessionData = await createSessionAttempt.json()
        if (!createSessionAttempt.ok && activeSessionData.error.includes('A session is already in progress')) navigate('/')
        else if (!createSessionAttempt.ok) setError(true)
        else {
            console.log('created new session')
            setError(false)
            navigate('/')
        }
    }

    // when begin is clicked, prompt user to login and if they are logged in then load active session
    const onBeginHandler = (event) => {
        if (app.displayNewForm && !user.isLoggedIn) navigate('/login', { replace: true })
        else if (user.isLoggedIn) showActiveSession()
    }

    return (
        <>
            {/* <Routes>
                <Route path="/" element={<Navigate to={(app.isTokenActive && !app.displayNewForm) ? "/" : ""} />} />
            </Routes> */}

            <div className={styles.center}>
                <div className={styles.columnCenter}>
                    <div>
                        <Title>NEW SESSION</Title>
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

export default NewSession