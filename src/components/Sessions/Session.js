import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setDisplayNewForm, setSessionsData, setActiveSessionData } from '../../store/slices/appSlice'
import { Routes, Route, Navigate } from "react-router-dom";
import NewSession from './NewSession';
import ActiveSession from './ActiveSession';

const Session = props => {
    const app = useSelector((state) => state.app)
    // const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('running effect 2')
        const fetchSessionData = async (token) => {
            try {
                // fetch all of the users session data
                const sessionsFetch = await fetch(`${app.api}/sessions`, { headers: { 'Authorization': `Bearer ${token}` } })
                const sessionData = await sessionsFetch.json()
                if (!validateResponse(sessionData)) throw new Error('No sessions found for this user')
                dispatch(setSessionsData(sessionData))

                // check for any active session from the users sessions data
                const activeSession = getActiveSession(sessionData)
                if (!validateResponse(activeSession)) throw new Error('No active session found')

                // if the last modified date was more than an hour ago on an active session, end the session
                if (Date.now() - activeSession.end >= 3600000) {
                    await fetch(`${app.api}/sessions/end/`, { method: 'PATCH', headers: { 'Authorization': `Bearer ${token}` } })
                    dispatch(setDisplayNewForm(true))
                } else {
                    dispatch(setActiveSessionData(activeSession))
                    dispatch(setDisplayNewForm(false))
                }
            } catch (error) {
                console.log('Error in validateToken', error.message)
                dispatch(setDisplayNewForm(true))
            }
        }

        const token = localStorage.getItem("login_token")
        if (app.isTokenActive) fetchSessionData(token)
        else dispatch(setDisplayNewForm(true))
    }, [app.isTokenActive, app.api, dispatch])

    // when isTokenActive false: load the home component and prompt to sign in on new session creation, 
    // else if token active and active session: load home with session data
    // else if token active and no session: load home but with new prompt
    return (
        <>
            <Routes>
                <Route path="new-session" element={<NewSession />} />
                <Route path="active-session" element={<ActiveSession />} />
                <Route path="/" element={<Navigate to={(app.isTokenActive && !app.displayNewForm) ? "active-session" : "new-session"} />} />                    
            </Routes>
        </>
    )
}

const getActiveSession = (sessions) => {
    for (let session of sessions) if (session.active) return session
    return {}
}

const validateResponse = (data) => Object.keys(data).length > 0

export default Session