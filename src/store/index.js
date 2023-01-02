import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

// Slices
import loadedDataSlice from './slices/loadedDataSlice'
import orgsSlice from './slices/orgsSlice'
import teamsSlice from './slices/teamsSlice'
import userSlice from './slices/userSlice'
import notificationsSlice from './slices/notificationsSlice'
import editionsSlice from './slices/editionsSlice'

const rootReducer = combineReducers({
    notifications: notificationsSlice,
    user: userSlice,
    teams: teamsSlice,
    orgs: orgsSlice,
    loadedData: loadedDataSlice,
    editions : editionsSlice,
})

export const store = configureStore({
    reducer: rootReducer,
})
