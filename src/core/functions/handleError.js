import { v4 as uuid } from 'uuid'
import { addNotification } from '../../store/slices/notificationsSlice'
import { removeNotifTimeout } from './removeNotifTimeout'

export const handleError = (dispatch, error) => {
    const errorID = uuid()
    let textError = ''

    if (typeof error.response?.data?.message === 'string') {
        textError = error.response.data.message
    } else {
        for (let errorField in error.response?.data?.message) {
            textError = error.response?.data?.message[errorField]
        }
    }

    dispatch(addNotification({id: errorID, type: 'error', text: textError || error.message}))
    dispatch(removeNotifTimeout(errorID, 3000))
}
