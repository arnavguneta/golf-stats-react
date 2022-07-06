import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: '',
        accountData: {},
        sessionsData: [],
        activeSession: {},
        isLoggedIn: false
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setAccountData: (state, action) => {
            state.accountData = action.payload
        },
        setLoggedIn(state, action) {
            state.isLoggedIn = action.payload
        },
        setSessionsData: (state, action) => {
            state.sessionsData = action.payload
        },
        setActiveSessionData: (state, action) => {
            state.activeSession = action.payload
        }
    },
})

export const { setToken, setAccountData, setLoggedIn, setSessionsData, setActiveSessionData } = userSlice.actions

export default userSlice.reducer