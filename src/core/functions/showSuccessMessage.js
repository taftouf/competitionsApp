import { v4 as uuid } from 'uuid'
import { addNotification } from '../../store/slices/notificationsSlice'
import { removeNotifTimeout } from './removeNotifTimeout'

export const showSuccessMessage = (dispatch, message) => {
    const successID = uuid()

    dispatch(addNotification({id: successID, type: 'success', text: message}))
    dispatch(removeNotifTimeout(successID, 3000))
}
