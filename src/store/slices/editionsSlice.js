import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    editions: [],
}

const editionsSlice = createSlice({
    name: 'editions',
    initialState,
    reducers: {
        setEditions(state, action) {
            state.editions = action.payload
            state.editions.map( e =>{
                e.value = e.id
            })
        },
    }
})

export default editionsSlice.reducer
export const { setEditions } = editionsSlice.actions
