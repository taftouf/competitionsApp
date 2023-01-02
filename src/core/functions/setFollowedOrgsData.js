import { setFollowedOrgs } from '../../store/slices/orgsSlice'
import { fetchData } from '../utils/fetchData'

export const setFollowedOrgsData = () => {
    return async dispatch => {
        const res = await fetchData(`/api/v3/profile/followed/organizations`)

        if (res.ok) {
            const data = await res.json()

            dispatch(setFollowedOrgs([...data.organizations.slice(0, 3)]))
        }
    }
}
