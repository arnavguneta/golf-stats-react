import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: '',
        accountData: {}
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setAccountData: (state, action) => {
            state.accountData = action.payload
        }
    },
})

export const { setToken, setAccountData, setSessionData } = userSlice.actions

export default userSlice.reducer