import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

import styles from './Session.module.css'

import { setActiveSessionData } from '../../store/slices/userSlice'

import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

import Title from '../UI/Title'
import Loading from '../UI/Loading'

const mainTheme = createTheme({
  palette: {
    success: {
      main: '#51bd56',
    }
  }
});

// just a new session form, it will render an active session once setup with login and or manual user start
// if newDisplayForm true and token not active: prompt for login on new session start
// else if newDisplayForm true and token active: create a new session
const ActiveSession = props => {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isHitLoading, setHitLoading] = useState(false)
  const [isMissLoading, setMissLoading] = useState(false)
  const [isEndLoading, setEndLoading] = useState(false)
  const yardsRef = useRef()
  const app = useSelector((state) => state.app)
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    if (app.firstVisit) {
      navigate('/')
    }

    const timer = setTimeout(() => {
      setLoading(false)
      if (!app.isTokenActive || app.displayNewForm) navigate('/new-session')
    }, 250)
    return () => { clearTimeout(timer) }

  }, [app.firstVisit, app.isTokenActive, app.displayNewForm, navigate])

  const updateShots = async (hit, yards = 0) => {
    if (hit) setHitLoading(false)
    else setMissLoading(false)
    const token = localStorage.getItem("login_token")
    const updateShotsAttempt = await fetch(`${app.api}/sessions/shot`, { body: JSON.stringify({ hit, yards }), headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, method: 'POST' })
    const activeSessionData = await updateShotsAttempt.json()
    if (!updateShotsAttempt.ok) setError(true)
    dispatch(setActiveSessionData(activeSessionData))
  }

  const onMissHandler = (event) => {
    setMissLoading(true)
    setTimeout(() => { updateShots(false, yardsRef.current.value) }, 500)
    console.log('yards', yardsRef.current.value)
  }

  const onHitHandler = (event) => {
    setHitLoading(true)
    setTimeout(() => { updateShots(true, yardsRef.current.value) }, 500)
    console.log('yards', yardsRef.current.value)
  }

  const onEndHandler = async (event) => {
    setEndLoading(true)
    const token = localStorage.getItem("login_token")
    const endAttempt = await fetch(`${app.api}/sessions/end/`, { method: 'PATCH', headers: { 'Authorization': `Bearer ${token}` } })
    const activeSessionData = await endAttempt.json()
    setTimeout(() => {
      setEndLoading(false)
      if (!endAttempt.ok) setError(true)
      dispatch(setActiveSessionData(activeSessionData))
    }, 500)
  }

  const content = <ThemeProvider theme={mainTheme}>
    <div className={styles.center}>
      <div className={styles.columnCenter}>
        <div className={styles.spaceEvenly}>
          <div>
            <Title>SHOT {user.activeSession?.shots?.length + 1}</Title>
          </div>
          <div className={`${styles.center} ${styles.buttonRow}`}>
            <div>
              <LoadingButton startIcon={<ClearIcon />} color="error" variant="outlined" onClick={onMissHandler}
                loading={isMissLoading}
                loadingPosition="start"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  textDecoration: 'none',
                  minWidth: '150px',
                  minHeight: '60px',
                  fontSize: '1.25rem'
                }}>MISS</LoadingButton>
              <LoadingButton startIcon={<ClearIcon />} variant="outlined" color="error" onClick={onMissHandler}
                loading={isMissLoading}
                loadingPosition="start"
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  textDecoration: 'none',
                  minWidth: '75px',
                  minHeight: '50px',
                  fontSize: '1rem'
                }}>MISS</LoadingButton>
            </div>
            <div>
              <LoadingButton endIcon={<DoneIcon />} color="success" variant="contained" onClick={onHitHandler}
                loading={isHitLoading}
                loadingPosition="end"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  textDecoration: 'none',
                  minWidth: '150px',
                  minHeight: '60px',
                  fontSize: '1.25rem'
                }}>HIT</LoadingButton>
              <LoadingButton endIcon={<DoneIcon />} variant="contained" color="success" onClick={onHitHandler}
                loading={isHitLoading}
                loadingPosition="end"
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  textDecoration: 'none',
                  minWidth: '75px',
                  minHeight: '50px',
                  fontSize: '1rem'
                }}>HIT</LoadingButton>
            </div>
          </div>
          <div>
            <TextField
              color='primary'
              label="YARDS"
              variant="outlined"
              type="number"
              className={styles['MuiTextField-root']}
              defaultValue='0'
              helperText="(optional)"
              inputProps={{ min: 0 }}
              inputRef={yardsRef}
            />
          </div>
          {error && <p style={{ "color": "red" }}>An error occured, try refreshing.</p>}
        </div>

        <div>
          <LoadingButton color="error" variant="contained" onClick={onEndHandler}
            loading={isEndLoading}
            loadingIndicator="Ending..."
            sx={{
              display: { xs: 'none', md: 'flex' },
              textDecoration: 'none',
              minWidth: '150px',
              minHeight: '60px',
              fontSize: '1.25rem'
            }}>END SESSION</LoadingButton>
          <LoadingButton variant="contained" color="error" onClick={onEndHandler}
            loading={isEndLoading}
            loadingIndicator="Ending..."
            sx={{
              display: { xs: 'flex', md: 'none' },
              textDecoration: 'none',
              minWidth: '75px',
              minHeight: '50px',
              fontSize: '1rem'
            }}>END SESSION</LoadingButton>
        </div>
      </div>
    </div>
  </ThemeProvider>

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && content}
    </>
  )
}

export default ActiveSession