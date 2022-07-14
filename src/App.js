import React from 'react'

import MainNav from './components/Navigation/MainNav'
import Session from './components/Sessions/Session'
import Login from './components/Authentication/Login'
import Logout from './components/Authentication/Logout'
import NewSession from './components/Sessions/NewSession';
import ActiveSession from './components/Sessions/ActiveSession';

import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setDisplayNewForm, setTokenActive, setFirstVisit } from './store/slices/appSlice'
import { setAccountData, setLoggedIn, setSessionsData, setActiveSessionData } from './store/slices/userSlice'

import { Routes, Route, Navigate } from "react-router-dom";

function App() {
    const app = useSelector((state) => state.app)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('running effect main')

        // validate token if one exists
        const evaluateToken = async (token) => {
            let tokenActive = false
            try {
                // fetch the users account
                const accountFetch = await fetch(`${app.api}/users/me`, { headers: { 'Authorization': `Bearer ${token}` } })
                const accountData = await accountFetch.json()
                if (accountData.error || !validateResponse(accountData)) throw new Error('Token expired')

                // store account data and mark token as active
                dispatch(setAccountData(accountData))
                dispatch(setTokenActive(true))
                dispatch(setLoggedIn(true))
                tokenActive = true
            } catch (error) {
                // on any errors, set displayNewForm to true and set active token to false
                console.log('Error in validateToken', error.message)
                dispatch(setTokenActive(false))
                dispatch(setLoggedIn(false))
            }
            return tokenActive
        }

        const fetchSessionData = async (token) => {
            try {
                // fetch all of the users session data
                const sessionsFetch = await fetch(`${app.api}/sessions`, { headers: { 'Authorization': `Bearer ${token}` } })
                const sessionData = await sessionsFetch.json()
                if (sessionData.error || !validateResponse(sessionData)) throw new Error('No sessions found for this user')
                dispatch(setSessionsData(sessionData))

                // check for any active session from the users sessions data
                const activeSession = getActiveSession(sessionData)
                if (!validateResponse(activeSession)) throw new Error('No active session found')
                // if the last modified date was more than an hour ago on an active session, end the session
                if (Date.now() - activeSession.end >= 3600000) {
                    await fetch(`${app.api}/sessions/end/`, { method: 'PATCH', headers: { 'Authorization': `Bearer ${token}` } })
                    dispatch(setDisplayNewForm(true))
                } else {
                    // an active session was found
                    dispatch(setDisplayNewForm(false))
                    // only set new active session when one doesnt exist, or the two objects are different
                    if (!validateResponse(user.activeSession) || user.activeSession.start !== activeSession.start) dispatch(setActiveSessionData(activeSession))
                }
            } catch (error) {
                console.log('Error in fetching sessions', error.message)
                dispatch(setDisplayNewForm(true))
            }
        }

        // if it is our first visit, set to false
        if (app.firstVisit) dispatch(setFirstVisit(false))
        else {
            const token = localStorage.getItem("login_token")
            // if token exists and active, fetch session data
            // if token exists and not active, displayNewForm
            if (token) evaluateToken(token).then(tokenActive => {
                if (tokenActive) fetchSessionData(token)
                else dispatch(setDisplayNewForm(true))
            })
            else {
                dispatch(setLoggedIn(false))
                dispatch(setTokenActive(false))
            } // if no token exists token is inactive, not logged in
        }
    }, [app.api, app.firstVisit, user.activeSession, dispatch])

    // manage sessions route here
    return (
        <>
            <MainNav />
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home/*" element={<Session />} />
                <Route path="/new-session" element={<NewSession />} />
                <Route path="/active-session" element={<ActiveSession />} />
                <Route path="/sessions" element={<h2>list of all sessions</h2>} />
                <Route path="/login/*" element={<Login />} />
                <Route path="/logout/*" element={<Logout />} />
            </Routes>
        </>
    );
}

export const getActiveSession = (sessions) => {
    for (let session of sessions) if (session.active) return session
    return {}
}

export const validateResponse = (data) => Object.keys(data).length > 0

export default App;
