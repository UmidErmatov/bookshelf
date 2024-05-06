import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import { PaletteMode } from '@mui/material'
import { RootState } from '..'

// Define a type for the slice state
interface AppState {
    mode: PaletteMode,
    openModal: boolean
}

// Define the initial state using that type
const initialState: AppState = {
    mode: localStorage.getItem("theme") as PaletteMode ?? 'light',
    openModal: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleColorMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
            localStorage.setItem('theme', state.mode)
        },
        toggleModal: (state) => {
            state.openModal = !state.openModal
        },
        // decrement: (state) => {
        //     state.value -= 1
        // },
        // // Use the PayloadAction type to declare the contents of `action.payload`
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // },
    },
})

export const openModal = (state: RootState) => state.app.openModal
export const { toggleColorMode, toggleModal } = appSlice.actions

export default appSlice.reducer