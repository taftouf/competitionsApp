import { setTeams } from '../../store/slices/teamsSlice'
import { fetchData } from '../utils/fetchData'

export const setTeamsData = () => {
    return async dispatch => {
        const res = await fetchData(`/api/v3/profile/teams`)

        if (res.ok) {
            const data = await res.json()

            dispatch(setTeams(data.teams))
        }
    }
}
