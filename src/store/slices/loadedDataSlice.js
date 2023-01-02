import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loadedData: false,
}

const loadedDataSlice = createSlice({
    name: 'loadedData',
    initialState,
    reducers: {
        setLoadedData(state, action) {
            state.loadedData = action.payload
        },
    }
})

export default loadedDataSlice.reducer
export const { setLoadedData } = loadedDataSlice.actions
