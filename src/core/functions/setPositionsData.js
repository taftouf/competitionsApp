import { fetchData } from '../utils/fetchData'
import { setPositions } from '../../store/slices/teamsSlice'

export const setPositionsData = () => {
    return async dispatch => {
        const res = await fetchData(`/api/v3/meta/positions`)

        if (res.ok) {
            const data = await res.json()
            const tempPositions = []

            data.positions.forEach((position, idx) => {
                tempPositions.push({
                    id: idx,
                    name: position.text,
                    value: position.id,
                })
            })

            

            dispatch(setPositions([...tempPositions]))
        }
    }
}
