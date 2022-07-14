import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = props => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '80vh'}}>
            <CircularProgress style={{ width: '60px', height: '60px' }}/>
        </Box>   
    )
}

export default Loading