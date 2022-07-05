import { useSelector } from 'react-redux'

const ActiveSession = props => {
    const app = useSelector((state) => state.app)
    
    // load the session state using app data and display it 
    return (
        <div>active session</div>

    )
}   

export default ActiveSession