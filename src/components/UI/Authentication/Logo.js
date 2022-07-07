import styles from './Authentication.module.css'

import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import Typography from '@mui/material/Typography';

import LogoText from './LogoText'

const Logo = props => {
    return (
        <div className={styles.logo}>
                <GolfCourseIcon fontSize="large" />
                <div>
                    <Typography
                        variant="h6"
                        component="span"
                        sx={{
                            fontFamily: 'monospace',
                            fontWeight: 500,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        { props.promptField }
                    </Typography>
                    <LogoText logo={props.logo} />
                </div>
            </div>
    )
}

export default Logo