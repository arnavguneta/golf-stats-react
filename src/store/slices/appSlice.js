import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        isTokenActive: false,
        displayNewForm: false,
        api: 'https://arnav.guneta.com/projects/golf/api/v1',
        firstVisit: true
    },
    reducers: {
        setTokenActive: (state, action) => {
            state.isTokenActive = action.payload
        },
        setDisplayNewForm: (state, action) => {
            state.displayNewForm = action.payload
        },
        setFirstVisit: (state, action) => {
            state.firstVisit = action.payload
        }
    },
})

export const { setTokenActive, setDisplayNewForm, setFirstVisit } = appSlice.actions
export default appSlice.reducer