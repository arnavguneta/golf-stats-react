import { useSelector } from 'react-redux'

const NewSession = props => {
    const app = useSelector((state) => state.app)

    // just a new session form, it will render an active session once setup with login and or manual user start
    // if newDisplayForm true and token not active: prompt for login on new session start
    // else if newDisplayForm true and token active: create a new session
    return (
        <div>new session</div>
    )
}   

export default NewSession