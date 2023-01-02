import { fetchData } from '../utils/fetchData'

export const getSoloCompetitions = async (limit, offset, id) => {
    const resTour = await fetchData(`/api/v4/competitions/solo/tournaments?limit=${limit || 7}${offset ? `&offset=${offset}` : ''}${id ? `&organizer_id=${id}` : ''}`)
    const resLeague = await fetchData(`/api/v4/competitions/solo/leagues?limit=${limit || 7}${offset ? `&offset=${offset}` : ''}${id ? `&organizer_id=${id}` : ''}`)

    const dataTour = await resTour.json()
    const dataLeague = await resLeague.json()

    return [...dataTour.competitions, ...dataLeague.competitions]
}
