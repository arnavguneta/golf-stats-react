import styles from './Authentication.module.css'
import Typography from '@mui/material/Typography';

const PromptText = props => {
    return (
        <div className={styles.promptText}>
            <Typography  variant="h8" component="span" sx={{ fontFamily: 'monospace', fontWeight: 400, color: 'inherit' }}>
                {props.children}
            </Typography>
        </div>

    )
}

export default PromptText