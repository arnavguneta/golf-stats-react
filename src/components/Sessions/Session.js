import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setDisplayNewForm, setSessionsData, setActiveSessionData } from '../../store/slices/appSlice'
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import NewSession from './NewSession';
import ActiveSession from './ActiveSession';

const Session = props => {
    const app = useSelector((state) => state.app)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        const getSessionData = async (token) => {
            try {
                // fetch all of the users session data
                const sessionsFetch = await fetch(`${app.api}/sessions`, { headers: { 'Authorization': `Bearer ${token}` } })
                if (!sessionsFetch) throw new Error('No sessions found for this user')
                const sessionData = await sessionsFetch.json()
                dispatch(setSessionsData(sessionData))

                // check for any active session from the users sessions data
                const activeSession = getActiveSession(sessionData)
                if (!activeSession) throw new Error('No active session found')
                dispatch(setDisplayNewForm(false))
                dispatch(setActiveSessionData(activeSession))
            } catch (error) {
                console.log('Error in getSessionData', error.message)
                dispatch(setDisplayNewForm(true))
            }
        }
        if (app.isTokenActive) getSessionData(user.token)
        else dispatch(setDisplayNewForm(true))
    }, [dispatch, user.token, app.isTokenActive, app.api])

    // when isTokenActive false: load the home component and prompt to sign in on new session creation, 
    // else if token active and active session: load home with session data
    // else if token active and no session: load home but with new prompt
    return (
        <>
            {/* {(!app.isTokenActive || app.setDisplayNewForm) && <h2>Load new session component, ask for login as well</h2>} */}
            {/* {(app.isTokenActive && !app.setDisplayNewForm) && <h2>Token Active and Session Found, load existing session</h2>} */}
            {(!app.isTokenActive || app.setDisplayNewForm) && <NewSession />}
            {(app.isTokenActive && !app.setDisplayNewForm) && <ActiveSession />}

        </>
    )
}

const getActiveSession = (sessions) => {
    for (let session of sessions) if (session.active) return session
    return {}
}

export default Session