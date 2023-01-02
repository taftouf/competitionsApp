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

export const TourneyGame = () => {
    const {type, tourneyID, gameID, round} = useParams()
    const [game, setGame] = useState({})
    const [competition, setCompetition] = useState({})
    const [stats, setStats] = useState([])
    const [havePermissions, setHavePermissions] = useState(false)
    const userTeams = useSelector(state => state.teams.teams)

    const getTournamentRounds = async () => {
        const resGroups = await fetchData(`/api/v4/competitions/${type}/tournaments/${tourneyID}/games?stage=groups&section=${round}`)
        const resFinals = await fetchData(`/api/v4/competitions/${type}/tournaments/${tourneyID}/games?stage=finals&section=${round}`)

        const dataGroups = await resGroups.json()
        const dataFinals = await resFinals.json()

        let tempGame = {}

        dataGroups.games.forEach(game => {
            const currentGame = game.games.find(exactGame => exactGame.id === +gameID)

            if (currentGame) tempGame = {...currentGame}
        })

        dataFinals.games.forEach(game => {
            const currentGame = game.games.find(exactGame => exactGame.id === +gameID)

            if (currentGame) tempGame = {...currentGame}
        })

        setGame({...tempGame})
        setCompetition({...dataGroups.competition})
    }

    const getMatchInfo = async () => {
        const res = await fetchData(`/api/v4/competitions/${type}/tournaments/${tourneyID}/games/${gameID}/stats`)
        const data = await res.json()

        setCompetition({...data.competition})
        setGame({...data.game})
        setStats([...data.stats])
    }

    useEffect(() => {
        (async () => {
            await Promise.all([
                type === 'squad' && getMatchInfo(),
                type === 'solo' && getTournamentRounds(),
            ])
        })()
    }, [])

    useEffect(() => {
        if (userTeams.length > 0 && Object.keys(game).length > 0) {
            if (userTeams.find(team =>
                (team.id === game.home?.id || team.id === game.visitors?.id)
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
                            tournament 
                            competition={competition}
                            competitionType={'tournaments'}
                            type={type}
                            competitionID={tourneyID}
                        />
                        {
                            type === 'squad' && game.home && !havePermissions ? (
                                <CompetitionMatchTeams
                                    competitionType={'tournaments'}
                                    type={type}
                                    data={game}
                                    stats={stats}
                                    competitionID={tourneyID}
                                />
                            ) : (
                                <div className={styles.gameMatchWrap}>
                                    <CompetitionAdminMatch
                                        data={game}
                                        competitionType={'tournament'}
                                        competitionID={tourneyID}
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
