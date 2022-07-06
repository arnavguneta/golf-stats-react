import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        isTokenActive: false,
        displayNewForm: false,
        api: 'http://localhost:3001/api/v1'
    },
    reducers: {
        setTokenActive: (state, action) => {
            state.isTokenActive = action.payload
        },
        setDisplayNewForm: (state, action) => {
            state.displayNewForm = action.payload
        }
    },
})

export const { setTokenActive, setDisplayNewForm } = appSlice.actions
export default appSlice.reducer