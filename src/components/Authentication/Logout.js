import LogoutForm from './LogoutForm'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { setFirstVisit } from '../../store/slices/appSlice'

const Logout = () => {
    const app = useSelector((state) => state.app)
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (app.firstVisit) {
            navigate('/')
        }
    }, [app.firstVisit, navigate])

    const onLogout = async () => {
        const token = localStorage.getItem("login_token")
        const logoutAttempt = await fetch(`${app.api}/users/logout`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, method: 'POST' })
        if (!logoutAttempt.ok) console.log('Something went wrong with the logout')

        console.log('removing token')
        localStorage.removeItem("login_token")
        dispatch(setFirstVisit(true))
        // navigate('/')
    }

    return (
        <>
            <Routes>
                <Route path="/" element={(!user.isLoggedIn) ? <Navigate to='/' /> : <LogoutForm handleSubmit={onLogout} />} />
                <Route path="/*" element={<Navigate to={''} />} />
            </Routes>
        </>
    )
}

export default Logout