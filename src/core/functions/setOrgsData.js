import { setOrgs } from '../../store/slices/orgsSlice'
import { fetchData } from '../utils/fetchData'

export const setOrgsData = () => {
    return async dispatch => {
        const res = await fetchData(`/api/v3/profile/organizations`)

        if (res.ok) {
            const data = await res.json()

            dispatch(setOrgs(data.organizations))
        }
    }
}
