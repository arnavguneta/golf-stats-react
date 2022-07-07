import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'

const LogoText = props => {
    return (
        <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
                fontFamily: 'monospace',
                fontWeight: 600,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
            }}
        >
            {props.logo}
        </Typography>
    )
}

export default LogoText