import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orgs: [],
    followedOrgs: [],
}

const orgsSlice = createSlice({
    name: 'organizations',
    initialState,
    reducers: {
        setOrgs(state, action) {
            state.orgs = action.payload
        },
        setFollowedOrgs(state, action) {
            state.followedOrgs = action.payload
        }
    }
})

export default orgsSlice.reducer
export const { setOrgs, setFollowedOrgs } = orgsSlice.actions
