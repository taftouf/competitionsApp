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
import { TourneyCalendar } from './TourneyCalendar'
import { CompetitionRanks } from '../../ui/ExactCompetitionUI/CompetitionRanks'
import { CompetitionTeams } from '../../ui/ExactCompetitionUI/CompetitionTeams'

import { useTranslation } from 'react-i18next'
import { fetchData } from '../../utils/fetchData'

export const Tourney = () => {
    const navigate = useNavigate()

    const {id, type} = useParams()
    const [competition, setCompetition] = useState({})
    const [rounds, setRounds] = useState([])
    const [groupsRounds, setGroupsRounds] = useState([])
    const [finalsRounds, setFinalsRounds] = useState([])
    const [teams, setTeams] = useState([])
    const [limit, setLimit] = useState(0)
    const [content, setContent] = useState('calendar')

    const {t} = useTranslation()

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

    const getTeams = async () => {
        const res = await fetchData(`/api/v4/competitions/${type}/tournaments/${id}/registrations`)
        if (res.ok) {
            const data = await res.json()
            setLimit(data.count)
            setTeams([...data.registrations])
        }
    }

    const getTourney = async () => {
        const res = await fetchData(`/api/v4/competitions/${type}/tournaments/${id}`)

        if (res.status === 404) {
            navigate('/404')
        }

        const data = await res.json()
        setCompetition({...data.competition})
    }

    const getRounds = async () => {
        const resGroups = await fetchData(`/api/v4/competitions/${type}/tournaments/${id}/rounds?stage=groups`)
        const resFinals = await fetchData(`/api/v4/competitions/${type}/tournaments/${id}/rounds?stage=finals`)
        if(resFinals.ok && resGroups.ok){
            const dataGroups = await resGroups.json()
            const dataFinals = await resFinals.json()

            setRounds([...dataGroups.rounds, ...dataFinals.rounds])
            setGroupsRounds([...dataGroups.rounds])
            setFinalsRounds([...dataFinals.rounds])
        }
       
    }

    useEffect(() => {
        (async () => {
            await Promise.all([
                getTourney(),
                getRounds(),
                getTeams(),
            ])
        })()
    }, [])

    return (
        <PageWrapper>
            <div className={styles.tourney}>
                {
                    Object.keys(competition).length > 0 ? (<>
                        <CompetitionInfo competition={competition}/>
                        <div className={styles.tourneyInner}>
                            {/* <div className={styles.tourneyItem}>
                                <ToggleContent title={t('rules')}>
                                    <CompetitionRules data={competition.rules}/>
                                </ToggleContent>
                            </div> */}
                            <div className={styles.tourneyItem}>
                                <ToggleContent title={t('details')+' xp'}>
                                    <CompetitionDetails data={competition.xp}/>
                                </ToggleContent>
                            </div>
                            <div className={styles.tourneyItem}>
                                <div className={styles.tourneyContent}>
                                    <div className={styles.tourneyTabsWrap}>
                                        <Tabs setActiveTab={setContent} initTabs={tabsData.current} richly/>
                                    </div>
                                    {
                                        content === 'calendar' && rounds.length > 0 &&
                                        <TourneyCalendar
                                            teams={teams}
                                            groupsRounds={groupsRounds}
                                            finalsRounds={finalsRounds}
                                            type={type}
                                            id={id}
                                            isTourneyAdmin={competition.admin}
                                            finalsOnly={competition.number_of_groups === 0}
                                        />
                                    }
                                    {
                                        content === 'ranks' &&
                                        <CompetitionRanks competitionType={'tournaments'} type={type} id={id}
                                                          data={competition} withGroup rounds={groupsRounds}/>
                                    }
                                    {
                                        content === 'teams' && <CompetitionTeams
                                            data={teams}
                                            type={type}
                                            id={id}
                                            limit={limit}
                                            setLimit={setLimit}
                                            withGroup
                                            rounds={rounds}
                                            isCompetitionAdmin={competition.admin}
                                            competitionType={'tournaments'}
                                            competition={competition}
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
