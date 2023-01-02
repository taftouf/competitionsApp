import { setEditions } from '../../store/slices/editionsSlice'
import { fetchData } from '../utils/fetchData'

export const setEditionsData = () => {
    return async dispatch => {
        const res = await fetchData(`/api/v3/meta/games/1/editions`)

        if (res.ok) {
            const data = await res.json()
            
            dispatch(setEditions(data.editions))
        }
    }
}
