import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        isTokenActive: false,
        displayNewForm: false,
        sessionsData: [],
        activeSession: {},
        api: 'http://localhost:3001/api/v1'
    },
    reducers: {
        setTokenActive: (state, action) => {
            state.isTokenActive = action.payload
        },
        setDisplayNewForm: (state, action) => {
            state.displayNewForm = action.payload
        },
        setSessionsData: (state, action) => {
            state.sessionsData = action.payload
        },
        setActiveSessionData: (state, action) => {
            state.activeSession = action.payload
        },
    },
})

export const { setTokenActive, setDisplayNewForm, setSessionsData, setActiveSessionData } = appSlice.actions
export default appSlice.reducer