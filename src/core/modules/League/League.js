import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Styles
import styles from './index.module.scss'

// Components
import { CompetitionInfo } from '../../ui/ExactCompetitionUI/CompetitionInfo'
import { PageWrapper } from '../../ui/PageWrapper'
import { Loader } from '../../ui/Loader'
import { ToggleContent } from '../../ui/ToggleContent'
import { CompetitionDetails } from '../../ui/ExactCompetitionUI/CompetitionDetails'
// import { CompetitionRules } from '../../ui/ExactCompetitionUI/CompetitionRules'
import { Tabs } from '../../ui/Tabs/Tabs'
import { LeagueCalendar } from './LeagueCalendar'
import { CompetitionRanks } from '../../ui/ExactCompetitionUI/CompetitionRanks'
import { CompetitionTeams } from '../../ui/ExactCompetitionUI/CompetitionTeams'
import { useDispatch, useSelector } from 'react-redux'
import { setNeedToUpdate } from '../../../store/slices/teamsSlice'

import { useTranslation } from 'react-i18next'
import { fetchData } from '../../utils/fetchData'

export const League = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const needToUpdate = useSelector(state => state.teams.needToUpdate)

    const {id, type} = useParams()
    const [competition, setCompetition] = useState({})
    const [rounds, setRounds] = useState([])
    const [teams, setTeams] = useState([])
    const [isLeaguesAdmin, setIsLeaguesAdmin] = useState()
    const {t} = useTranslation()
    const [limit, setLimit] = useState(0)
    const [content, setContent] = useState('calendar')
    
    const tabsData = useRef([
        {
            id: 1,
            name: 'calendar',
            value: 'calendar',
        },
        {
            id: 2,
            name: 'rankings',
            value: 'ranks',
        },
        {
            id: 3,
            name: type === 'solo' ? 'Joueurs' : 'participants',
            value: 'teams',
        },
    ])

    const getLeague = async () => {
        const res = await fetchData(`/api/v4/competitions/${type}/leagues/${id}`)

        if (res.status === 404) {
            navigate('/404')
        }

        const data = await res.json()
        setCompetition({...data.competition})
    }

    const getRounds = async () => {
        const res = await fetchData(`/api/v4/competitions/${type}/leagues/${id}/rounds`)
        const data = await res.json()
        setIsLeaguesAdmin(data.competition.admin)
        setRounds([...data.rounds])
    }

    const getTeams = async () => {
        const res = await fetchData(`/api/v4/competitions/${type}/leagues/${id}/registrations`)
        const data = await res.json()
        setLimit(data.count)
        setTeams([...data.registrations])
    }

    useEffect(() => {
        (async () => {
            await Promise.all([
                getLeague(),
                getRounds(),
                getTeams(),
            ])
        })()
    }, [])

    useEffect(() => {
        if (needToUpdate) {
            getTeams()
            dispatch(setNeedToUpdate(false))
        }
    }, [needToUpdate])

    return (
        <PageWrapper>
            <div className={styles.league}>
                {
                    Object.keys(competition).length > 0 ? (<>
                        <CompetitionInfo competition={competition}/>
                        <div className={styles.leagueInner}>
                            {/* <div className={styles.leagueItem}>
                                <ToggleContent title={t('rules')}>
                                    <CompetitionRules data={competition.rules}/>
                                </ToggleContent>
                            </div> */}
                            <div className={styles.leagueItem}>
                                <ToggleContent title={t('details')+' xp'}>
                                    <CompetitionDetails data={competition.xp}/>
                                </ToggleContent>
                            </div>
                            <div className={styles.leagueItem}>
                                <div className={styles.leagueContent}>
                                    <div className={styles.leagueTabsWrap}>
                                        <Tabs setActiveTab={setContent} initTabs={tabsData.current} richly />
                                    </div>
                                    {
                                        content === 'calendar' && (
                                            <div className={styles.leagueContentInner}>
                                                {
                                                    rounds.length > 0 && <LeagueCalendar type={type} id={id} rounds={rounds} isLeaguesAdmin={isLeaguesAdmin}/>
                                                }
                                            </div>
                                        )
                                    }
                                    {
                                        content === 'ranks' && <CompetitionRanks
                                            competitionType={'leagues'}
                                            type={type}
                                            id={id}
                                            data={competition}
                                            rounds={rounds}
                                        />
                                    }
                                    {
                                        content === 'teams' && <CompetitionTeams
                                            data={teams}
                                            type={type}
                                            limit={limit}
                                            setLimit={setLimit}
                                            competitionType={'leagues'}
                                            competition={competition}
                                            isCompetitionAdmin={competition.admin}
                                            id={id}
                                            setCompetition={setCompetition}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </>) : <Loader/>
                }
            </div>
        </PageWrapper>
    )
}
