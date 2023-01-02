import { removeNotification } from '../../store/slices/notificationsSlice'

export const removeNotifTimeout = (id, timeout) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(removeNotification({id}))
        }, timeout)
    }
}
