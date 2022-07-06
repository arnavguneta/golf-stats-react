import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
import { setAccountData, setLoggedIn } from './store/slices/userSlice'
import { setTokenActive } from './store/slices/appSlice'

import MainNav from './components/Navigation/MainNav'
import Session from './components/Sessions/Session'
import Login from './components/Authentication/Login'

function App() {
    const user = useSelector((state) => state.user)
    const app = useSelector((state) => state.app)

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('running effect 1')

        // validate token if one exists
        const evaluateToken = async (token) => {
            try {
                // fetch the users account
                const accountFetch = await fetch(`${app.api}/users/me`, { headers: { 'Authorization': `Bearer ${token}` } })
                const accountData = await accountFetch.json()
                if (!validateResponse(accountData)) throw new Error('Token expired')

                // store account data and mark token as active
                dispatch(setAccountData(accountData))
                dispatch(setTokenActive(true))
                dispatch(setLoggedIn(true))
            } catch (error) {
                // on any errors, set displayNewForm to true and set active token to false
                console.log('Error in validateToken', error.message)
                dispatch(setTokenActive(false))
            }
        }

        const token = localStorage.getItem("login_token")

        if (token) evaluateToken(token) // validate token if one exists
        else dispatch(setTokenActive(false)) // else set token active as false, and display new form
    }, [app.api, dispatch, user.isLoggedIn])

    // manage sessions route here too
    return (
        <>
            <MainNav />
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home/*" element={<Session />} />
                <Route path="/sessions" element={<h2>list of all sessions</h2>} />
                <Route path="/login/*" element={<Login />} />

            </Routes>
        </>
    );
}

const validateResponse = (data) => Object.keys(data).length > 0

// const getActiveSession = (sessions) => {
//     for (let session of sessions) if (session.active) return session
//     return {}
// }

export default App;
