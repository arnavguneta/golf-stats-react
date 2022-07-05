import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
const MainNav = props => {
    const app = useSelector((state) => state.app)
    return (
        <header>
            <div>Logo</div>
            <ul>
                <li><NavLink to="/home">Home</NavLink></li>
                {app.isTokenActive && <li><NavLink to="/sessions">Sessions</NavLink></li>}
                {!app.isTokenActive && <li><button>Login</button></li>}
            </ul>
        </header>
    )
}   

export default MainNav