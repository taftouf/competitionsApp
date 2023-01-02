import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
    userInfo: {},
    isAdmin: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = action.payload
            state.isAdmin = action.payload.admin
        },
        setIsAuth(state, action) {
            state.isAuth = action.payload
        }
    }
})

export default userSlice.reducer
export const { setUserInfo, setIsAuth } = userSlice.actions
