import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import { SignupResponse, api } from '../../api/auth'

const slice = createSlice({
    name: 'auth',
    initialState: { data: {}, isOk: false, message: "" } as SignupResponse,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.signup.matchFulfilled,
            (state, { payload }) => {
                localStorage.setItem("key", JSON.stringify(payload.data.key))
                localStorage.setItem("secret", JSON.stringify(payload.data.secret))
                state.data = payload.data
                state.isOk = payload.isOk
                state.message = payload.message
            },
        )
    },
})

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.data
