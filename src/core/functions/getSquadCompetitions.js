import { fetchData } from '../utils/fetchData'

export const getSquadCompetitions = async (limit, offset, id, isTeam) => {
    let pastTour, liveTour, futureTour, pastLeague, liveLeague, futureLeague

    if (isTeam) {
        pastTour = await fetchData(`/api/v4/teams/${id}/tournaments?limit=${limit || 7}${offset ? `&offset=${offset}` : ''}${(id && !isTeam) ? `&organizer_id=${id}` : ''}&status=past`)
        liveTour = await fetchData(`/api/v4/teams/${id}/tournaments?limit=${limit || 7}${offset ? `&offset=${offset}` : ''}${(id && !isTeam) ? `&organizer_id=${id}` : ''}&status=live`)
        futureTour = await fetchData(`/api/v4/teams/${id}/tournaments?limit=${limit || 7}${offset ? `&offset=${offset}` : ''}${(id && !isTeam) ? `&organizer_id=${id}` : ''}&status=future`)
        pastLeague = await fetchData(`/api/v4/teams/${id}/leagues?limit=${limit || 7}${offset ? `&offset=${offset}` : ''}${(id && !isTeam) ? `&organizer_id=${id}` : ''}&status=past`)
        liveLeague = await fetchData(`/api/v4/teams/${id}/leagues?limit=${limit || 7}${offset ? `&offset=${offset}` : ''}${(id && !isTeam) ? `&organizer_id=${id}` : ''}&status=live`)
        futureLeague = await fetchData(`/api/v4/teams/${id}/leagues?limit=${limit || 7}${offset ? `&offset=${offset}` : ''}${(id && !isTeam) ? `&organizer_id=${id}` : ''}&status=future`)
    } else {
        pastTour = await fetchData(`/api/v4/competitions/squad/tournaments?limit=${limit || 7}${offset ? `&offset=${offset}` : ''}${id ? `&organizer_id=${id}` : ''}&status=past`)
        liveTour = await fetchData(`/api/v4/competitions/squad/tournaments?limit=${limit || 7}${offset ? `&offset=${offset}` : ''}${id ? `&organizer_id=${id}` : ''}&status=live`)
        futureTour = await fetchData(`/api/v4/competitions/squad/tournaments?limit=${limit || 7}${offset ? `&offset=${offset}` : ''}${id ? `&organizer_id=${id}` : ''}&status=future`)
        pastLeague = await fetchData(`/api/v4/competitions/squad/leagues?limit=${limit || 7}${offset ? `&offset=${offset}` : ''}${id ? `&organizer_id=${id}` : ''}&status=past`)
        liveLeague = await fetchData(`/api/v4/competitions/squad/leagues?limit=${limit || 7}${offset ? `&offset=${offset}` : ''}${id ? `&organizer_id=${id}` : ''}&status=live`)
        futureLeague = await fetchData(`/api/v4/competitions/squad/leagues?limit=${limit || 7}${offset ? `&offset=${offset}` : ''}${id ? `&organizer_id=${id}` : ''}&status=future`)
    }

    const resPastTour = await pastTour.json()
    const resLiveTour = await liveTour.json()
    const resFutureTour = await futureTour.json()
    const resPastLeague = await pastLeague.json()
    const resLiveLeague = await liveLeague.json()
    const resFutureLeague = await futureLeague.json()

    return [...resPastTour.competitions,
        ...resLiveTour.competitions,
        ...resFutureTour.competitions,
        ...resPastLeague.competitions,
        ...resLiveLeague.competitions,
        ...resFutureLeague.competitions]
}
