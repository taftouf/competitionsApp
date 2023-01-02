import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    teams: [],
    needToUpdate: false,
    positions: [],
    roles: [],
}

const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        setTeams(state, action) {
            state.teams = action.payload
        },
        setNeedToUpdate(state, action) {
            state.needToUpdate = action.payload
        },
        setPositions(state, action) {
            state.positions = action.payload
        },
        setRoles(state, action) {
            state.roles = action.payload
        },
    }
})

export default teamsSlice.reducer
export const {setTeams, setNeedToUpdate, setPositions, setRoles} = teamsSlice.actions
