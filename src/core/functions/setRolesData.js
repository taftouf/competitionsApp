import { fetchData } from '../utils/fetchData'
import { setRoles } from '../../store/slices/teamsSlice'

export const setRolesData = () => {
    return async dispatch => {
        const res = await fetchData('/api/v3/meta/roles')

        if (res.ok) {
            const data = await res.json()
            const tempRoles = []

            data.roles.forEach((role, idx) => {
                tempRoles.push({
                    id: idx,
                    name: role.text,
                    value: role.id,
                })
            })

            dispatch(setRoles([...tempRoles]))
        }
    }
}
