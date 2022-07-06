import LoginForm from './LoginForm'

import { useSelector } from 'react-redux'

const Login = () => {
    const app = useSelector((state) => state.app)

    // useEffect(() => {

    // }, [app.getTokenActive])

    const onLogin = async (username, password) => {
        const loginAttempt = await fetch(`${app.api}/users/login`, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify({ username, password }) })
        const loginData = await loginAttempt.json()
        return loginData
    }
    return (
        <>
            <LoginForm handleSubmit={onLogin} />
        </>
    )
}

export default Login