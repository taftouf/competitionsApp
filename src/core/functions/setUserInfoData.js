import { setUserInfo } from '../../store/slices/userSlice'
import { fetchData } from '../utils/fetchData'

export const setUserInfoData = () => {
    return async dispatch => {
        const res = await fetchData(`/api/v3/profile`)

        if (res.ok) {
            const data = await res.json()

            dispatch(setUserInfo({admin: data.admin, ...data.profile}))
        }
    }
}
