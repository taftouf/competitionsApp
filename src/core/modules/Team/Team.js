import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Styles
import styles from './index.module.scss'

// Components
import { PageWrapper } from '../../ui/PageWrapper'
import { Loader } from '../../ui/Loader'
import { MainInfo } from '../../ui/MainInfo'
import { MenuInfo } from '../../ui/MenuInfo'
import { TeamResults } from './TeamResults'
import { Members } from '../../ui/Members'
import { getSquadCompetitions } from '../../functions/getSquadCompetitions'
import { Competitions } from '../../ui/CompetitionsUI/Competitions'
import { fetchData } from '../../utils/fetchData'
import { useSelector } from 'react-redux'

export const Team = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [team, setTeam] = useState({})
    const [teamFeed, setTeamFeed] = useState([])
    const [teamPlayersRole, setTeamPlayersRole] = useState([])
    const [teamPlayersCompose, setTeamPlayersCompose] = useState([])
    const [content, setContent] = useState('results')
    const userTeams = useSelector(state => state.teams.teams)
    const [isAdmin, setIsAdmin] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const superAdmin = useSelector(state => state.user.isAdmin )

    const menu = [
        {
            id: 1,
            icon: 'results',
            text: 'Résultats',
            type: 'tab',
            content: 'results',
        },
        {
            id: 2,
            icon: 'competitions',
            text: 'Compétitions',
            type: 'tab',
            content: 'competitions',
        },
        {
            id: 3,
            icon: 'info',
            text: 'À propos',
            type: 'info',
            content: 'info',
        },
        {
            id: 4,
            icon: 'members',
            text: 'Joueurs',
            type: 'tab',
            content: 'Joueurs',
        },
        {
            id: 5,
            icon: 'badges',
            text: 'Badges',
            type: 'badges',
            content: 'badges',
        },
    ]

    const [competitionsFull, setCompetitionsFull] = useState([])

    const getTeam = async () => {
        const res = await fetchData(`/api/v3/teams/${id}`)

        if (res.ok) {
            const data = await res.json()

            setTeam(data.team)
        }
    }

    const getTeamFeed = async () => {
        const res = await fetchData(`/api/v3/teams/${id}/feed`)

        if (res.ok) {
            const data = await res.json()

            setTeamFeed(data.feed)
        }
    }

    const getTeamPlayers = async () => {
        const resRole = await fetchData(`/api/v3/teams/${id}/players`)
        setNotFound(resRole.ok)
        if (resRole.status === 404) {
            navigate('/404')
        }
        if (resRole.ok) {
            const dataRole = await resRole.json()

            const composePlayers = []
            const unassignedPlayers = []

            dataRole.players.forEach(player => {
                player.players.forEach(exactPlayer => {
                    if (exactPlayer.position) {
                        if (!composePlayers.find(composePlayer => composePlayer.role.text === exactPlayer.position.category)) {
                            composePlayers.push({
                                role: {...player.role, text: exactPlayer.position.category},
                                players: [],
                            })
                        }
                    } else {
                        if (!unassignedPlayers.find(composePlayer => composePlayer.role.text === 'Unassigned')) {
                            unassignedPlayers.push({
                                role: {...player.role, text: 'Unassigned'},
                                players: [],
                            })
                        }
                    }
                })
            })

            if (unassignedPlayers[0]) composePlayers.push({...unassignedPlayers[0]})

            dataRole.players.forEach(player => {
                player.players.forEach(exactPlayer => {
                    if (exactPlayer.position) {
                        const categoryIndex = composePlayers.findIndex(composePlayer => composePlayer.role.text === exactPlayer.position.category)

                        composePlayers[categoryIndex].players.push(exactPlayer)
                    } else {
                        const categoryIndex = composePlayers.findIndex(composePlayer => composePlayer.role.text === 'Unassigned')

                        composePlayers[categoryIndex].players.push(exactPlayer)
                    }
                })
            })

            setTeamPlayersRole([...dataRole.players])
            setTeamPlayersCompose([...composePlayers])
        }
    }

    const getCompetitions = async () => {
        
        const squadCompetitions = await getSquadCompetitions(7, 0, id, true)

        setCompetitionsFull([...squadCompetitions])
    }

    useEffect(() => {
        (async () => {
            await Promise.all([
                getTeam(),
                getTeamFeed(),
                getTeamPlayers(),
            ])
        })()
    }, [])

    useEffect(() => {
        if (notFound) getCompetitions()
    }, [notFound])

    useEffect(() => {
        if ((userTeams.find(team => team.id === +id) && (team?.player?.role?.value === 'captain')) || superAdmin ) setIsAdmin(true)
    }, [userTeams, team])

    return (
        <PageWrapper>
            {
                Object.keys(team).length > 0 ? (
                    <div className={styles.container}
                         style={{backgroundImage: `linear-gradient(${team.color}, transparent 50%)`}}>
                        <div className={styles.team}>
                            <MainInfo data={team} getTeam={getTeam} isAdmin={isAdmin} team/>
                            <div className={styles.teamContent}>
                                <MenuInfo content={content} setContent={setContent} menuInfo={menu} data={team}/>
                                {content === 'results' && <TeamResults team={team} feed={teamFeed}/>}
                                {content === 'competitions' && <Competitions competitionsFull={competitionsFull}/>}
                                {content === 'Joueurs' && <Members
                                    membersRole={teamPlayersRole}
                                    membersCompose={teamPlayersCompose}
                                    id={id}
                                    admin={isAdmin}
                                    getTeam={getTeamPlayers}
                                    team
                                />}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.teamLoaderWrapper}>
                        <Loader/>
                    </div>
                )
            }
        </PageWrapper>
    )
}
