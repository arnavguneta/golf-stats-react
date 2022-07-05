import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
import { setToken, setAccountData } from './store/slices/userSlice'
import { setTokenActive, setDisplayNewForm } from './store/slices/appSlice'

import MainNav from './components/Navigation/MainNav'
import Session from './components/Sessions/Session'

function App() {
    const user = useSelector((state) => state.user)
    const app = useSelector((state) => state.app)

    const dispatch = useDispatch()

    useEffect(() => {
        // validate token if one exists
        const validateToken = async (token) => {
            try {
                // fetch the users account
                const accountFetch = await fetch(`${app.api}/users/me`, { headers: { 'Authorization': `Bearer ${token}` } })
                if (!accountFetch) throw new Error('Token expired')
                const accountData = await accountFetch.json()

                // store account data and mark token as active
                dispatch(setAccountData(accountData))
                dispatch(setTokenActive(true))

            } catch (error) {
                // on any errors, set displayNewForm to true and set active token to false
                console.log('Error is validateToken', error.message)
                dispatch(setDisplayNewForm(true))
                dispatch(setTokenActive(false))
            }
        }
        const token = user.token || localStorage.getItem("login_token")
        dispatch(setToken(token))

        if (token) validateToken(token) // validate token if one exists
        else dispatch(setTokenActive(false)) // else set token active as false
    }, [dispatch, user.token, app.api])

    // manage sessions route here too
    return (
        <>
            <MainNav />
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home/*" element={<Session />} />
                <Route path="/sessions" element={<h2>list of all sessions</h2>} />

            </Routes>
        </>
    );
}

export default App;
