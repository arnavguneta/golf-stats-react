
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useNavigate } from "react-router-dom";

import Loading from '../UI/Loading'

const Session = props => {
    const app = useSelector((state) => state.app)
    const navigate = useNavigate()
    // const user = useSelector((state) => state.user)

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(`${(app.isTokenActive && !app.displayNewForm) ? "/active-session" : "/new-session"}`)
        }, 300)

        return () => { clearTimeout(timer) }
    }, [app.isTokenActive, app.displayNewForm, navigate])

    return (
        <>
            {console.log("session", app.isTokenActive, app.displayNewForm)}
            <Loading />
        </>
    )
}

export default Session