import { createSlice } from '@reduxjs/toolkit'
import { t } from 'i18next'


const initialState = {
    notifications: []
}

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification(state, action) {
            state.notifications.push({
                id: action.payload.id,
                type: action.payload.type,
                text: t(action.payload.text),
            })
        },
        removeNotification(state, action) {
            state.notifications = state.notifications.filter(notificationItem => notificationItem.id !== action.payload.id)
        },
    }
})

export default notificationsSlice.reducer
export const { addNotification, removeNotification } = notificationsSlice.actions
