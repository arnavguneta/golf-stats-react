
import { useSelector } from 'react-redux'

import { Routes, Route, Navigate } from "react-router-dom";

const Session = props => {
    const app = useSelector((state) => state.app)
    // const user = useSelector((state) => state.user)

    return (
        <>
            {console.log("session", app.isTokenActive, app.displayNewForm)}
            <Routes>
                <Route path="" element={<Navigate to={(app.isTokenActive && !app.displayNewForm) ? "/active-session" : "/new-session"} />} />
            </Routes>
        </>
    )
}

export default Session