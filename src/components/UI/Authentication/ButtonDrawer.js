import styles from './Authentication.module.css'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'

const ButtonDrawer = props => {
    return (
        <div className={styles.buttonDrawer}>
            <Button className={styles['MuiButton-root']} variant="outlined" color="error" component={Link} to="/" >
                {props.cancelText}
            </Button>
            <Button className={styles['MuiButton-root']} type="submit" variant="contained" color="primary" endIcon={props.enterIcon}>
                {props.enterText}
            </Button>
        </div>
    )
}

export default ButtonDrawer