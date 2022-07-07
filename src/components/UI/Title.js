import Typography from '@mui/material/Typography';

const Title = props => {
    return (
        <>
            <Typography
                variant="h3"
                noWrap
                component="h1"
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                {props.children}
            </Typography>
            <Typography
                variant="h4"
                noWrap
                component="h1"
                sx={{
                    display: { xs: 'flex', md: 'none' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                {props.children}
            </Typography>
        </>
    )
}

export default Title