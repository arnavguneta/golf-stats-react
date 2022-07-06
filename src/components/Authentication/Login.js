import LoginForm from './LoginForm'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLoggedIn } from '../../store/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { Routes, Route, Navigate } from "react-router-dom";

const Login = () => {
    const app = useSelector((state) => state.app)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (user.isLoggedIn) {
    //         console.log('nav away')
    //         navigate('/home')
    //     }
    // }, [user.isLoggedIn])

    const onLogin = async (username, password) => {
        const loginAttempt = await fetch(`${app.api}/users/login`, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify({ username, password }) })
        const loginData = await loginAttempt.json()
        if (!loginData.error) dispatch(setLoggedIn(true))
        return loginData
    }
    return (
        <>
        {console.log(user.isLoggedIn)}
         <Routes>
            <Route path="/" element={(user.isLoggedIn) ? <Navigate to={'/'} /> : <LoginForm handleSubmit={onLogin} /> } />    
            <Route path="/*" element={<Navigate to={''} /> } />     
         </Routes>
        
        </>
    )
}

export default Login