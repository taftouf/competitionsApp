import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Components
import { PageWrapper } from '../../ui/PageWrapper'
import { Loader } from '../../ui/Loader'
import { CompetitionMatchInfo } from '../../ui/ExactCompetitionUI/CompetitionMatchInfo'
import { CompetitionMatchTeams } from '../../ui/ExactCompetitionUI/CompetitionMatchTeams'
import { fetchData } from '../../utils/fetchData'
import { useSelector } from 'react-redux'
import { CompetitionAdminMatch } from '../../ui/ExactCompetitionUI/CompetitionAdminMatch'

export const LeagueGame = () => {
    const {type, leagueID, gameID, round} = useParams()
    const [game, setGame] = useState({})
    const [stats, setStats] = useState([])
    const [havePermissions, setHavePermissions] = useState(false)
    const userTeams = useSelector(state => state.teams.teams)

    const getRounds = async () => {
        const res = await fetchData(`/api/v4/competitions/${type}/leagues/${leagueID}/games?round=${round}`)
        const data = await res.json()

        let tempGame = {}

        data.games.forEach(game => {
            const currentGame = game.games.find(exactGame => exactGame.id === +gameID)

            if (currentGame) tempGame = {...currentGame}
        })

        setGame({...tempGame})
    }

    const getMatchInfo = async () => {
        const res = await fetchData(`/api/v4/competitions/${type}/leagues/${leagueID}/games/${gameID}/stats`)
        const data = await res.json()

        setGame({...data.game})
        setStats([...data.stats])
    }

    useEffect(() => {
        (async () => {
            await Promise.all([
                type === 'squad' && getMatchInfo(),
                type === 'solo' && getRounds(),
            ])
        })()
    }, [])

    useEffect(() => {
        if (userTeams.length > 0 && Object.keys(game).length > 0) {
            if (userTeams.find(team =>
                (team.id === game.home.id || team.id === game.visitors.id)
                && (team.player.role.value === 'captain' || team.player.role.value === 'subcaptain')
            )) {
                setHavePermissions(true)
            }
        }
    }, [userTeams, game])

    return (
        <PageWrapper>
            <div className={cn(styles.game, {
                [styles.gameLoading]: Object.keys(game).length === 0,
            })}>
                {
                    Object.keys(game).length > 0 ? (<>
                        <CompetitionMatchInfo 
                            data={game}
                            competitionType={'leagues'}
                            type={type}
                            competitionID={leagueID}
                        />
                        {
                            type === 'squad' && game.home && !havePermissions ? (
                                <CompetitionMatchTeams
                                    flag={true}
                                    competitionType={'leagues'}
                                    type={type}
                                    data={game}
                                    stats={stats}
                                    competitionID={leagueID}
                                />
                            )  : (
                                <div className={styles.gameMatchWrap}>
                                    <CompetitionAdminMatch
                                        data={game}
                                        competitionType={'league'}
                                        competitionID={leagueID}
                                        type={type}
                                        updateData={getMatchInfo}
                                        wrap
                                        userTeams={userTeams}
                                        havePermissions={havePermissions}
                                    />
                                </div>
                            )
                        }
                    </>) : <Loader/>
                }
            </div>
        </PageWrapper>
    )
}
