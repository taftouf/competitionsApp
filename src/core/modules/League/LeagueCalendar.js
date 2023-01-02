import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

// Styles
import styles from './index.module.scss'

// Components
import { Select } from '../../ui/Select'
import { Loader } from '../../ui/Loader'
import { CompetitionMatch } from '../../ui/ExactCompetitionUI/CompetitionMatch'
import { CompetitionAdminMatch } from '../../ui/ExactCompetitionUI/CompetitionAdminMatch'
import { useTranslation } from 'react-i18next'
import { fetchData } from '../../utils/fetchData'
import { useSearchParams } from 'react-router-dom'

export const LeagueCalendar = ({id, type, rounds, isLeaguesAdmin}) => {
    
    const isAdmin = useSelector(state => state.user.isAdmin )?useSelector(state => state.user.isAdmin ): isLeaguesAdmin
    const {t} = useTranslation()
    const [searchParams] = useSearchParams()

    const [filterValue, setFilterValue] = useState('')
    const [filterItems, setFilterItems] = useState([])
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [userTeams, setUserTeams] = useState([])

    const [activeGameID, setActiveGameID] = useState(null)

    const goNext = () => {
        games.forEach((game, idx) => {
            if (game.id === activeGameID) {
                if (games[idx + 1]) setActiveGameID(games[idx + 1].id)
                else setActiveGameID(games[0].id)
            }
        })
    }

    const goPrevious = () => {
        games.forEach((game, idx) => {
            if (game.id === activeGameID) {
                if (games[idx - 1]) setActiveGameID(games[idx - 1].id)
                else setActiveGameID(games[games.length - 1].id)
            }
        })
    }

    useEffect(() => {
        const tempItems = []

        rounds.forEach((round, idx) => {
            tempItems.push({
                id: idx,
                name: round,
                value: round,
            })
        })

        setFilterItems([...tempItems])
    }, [rounds])

    const getGames = async () => {
        setLoading(true)
        const res = await fetchData(`/api/v4/competitions/${type}/leagues/${id}/games?round=${filterValue}`)
        const data = await res.json()
        const tempGames = []

        data.games.forEach(game => {
            game.games.forEach(exactGame => exactGame.home && tempGames.push(exactGame))
        })

        setGames([...tempGames])
        setLoading(false)
    }

    useEffect(() => {
        if (searchParams.get('gameID') && games.length > 0) {
            setActiveGameID(+searchParams.get('gameID'))
            setFilterValue(searchParams.get('filterValue'))
        }
    }, [searchParams, games])

    useEffect(() => {
        if (filterValue) getGames()
    }, [filterValue])

    useEffect(() => {
        (async () => {
            const res = await fetchData(`/api/v3/profile/teams`)
            const data = await res.json()

            setUserTeams([...data.teams])
        })()
    }, [])

    return (
        <div className={styles.leagueCalendar}>
            {
                (!activeGameID && filterItems.length > 0) ? (<>
                    <div className={styles.leagueCalendarFilterWrap}>
                        <Select values={filterItems} initValue={filterValue} setNewValue={setFilterValue} />
                    </div>
                    <div className={styles.leagueCalendarGames}>
                        {
                            !loading ? (
                                games.length > 0 ? games.map(game => (
                                    <CompetitionMatch
                                        data={game}
                                        key={game.id}
                                        competitionID={id}
                                        type={type}
                                        round={filterValue}
                                        competitionType={'league'}
                                        isAdmin={isAdmin}
                                        setActiveGameID={setActiveGameID}
                                        userTeams={userTeams}
                                        havePermissions={userTeams.find(team =>
                                            (team.id === game.home.id
                                                || team.id === game.visitors.id)
                                            && (team.player.role.value === 'captain' || team.player.role.value === 'subcaptain')
                                        )}
                                    />
                                )) : <div className={'empty-block'}>{t('noGames')}</div>
                            ) : <Loader />
                        }
                    </div>
                </>) : (<>
                    {
                        games.filter(game => game.id === activeGameID)[0] ? (
                            <CompetitionAdminMatch
                                data={games.filter(game => game.id === activeGameID)[0]}
                                goBack={() => setActiveGameID(null)}
                                goNext={goNext}
                                goPrevious={goPrevious}
                                exactGames={games}
                                isCompetitionAdmin={isAdmin}
                                competitionType={'league'}
                                round={filterValue}
                                competitionID={id}
                                type={type}
                                updateData={getGames}
                                userTeams={userTeams}
                                havePermissions={userTeams.find(team =>
                                    (team.id === games.filter(game => game.id === activeGameID)[0].home.id
                                        || team.id === games.filter(game => game.id === activeGameID)[0].visitors.id)
                                    && (team.player.role.value === 'captain' || team.player.role.value === 'subcaptain')
                                )}
                            />
                        ) : <Loader />
                    }
                </>)
            }
        </div>
    )
}
