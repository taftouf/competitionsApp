import React, { useEffect, useState } from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Components
//import { Btn } from '../../ui/Btn'
import { Loader } from '../../ui/Loader'
import { DashboardCalendarItem } from './DashboardCalendarItem'
import { Link } from 'react-router-dom'
import { DashboardDivision } from './DashboardDivision'
import { DashboardGeneralInfo } from './DashboardGeneralInfo'

import { useTranslation } from 'react-i18next'
import { fetchData } from '../../utils/fetchData'

export const DashboardTeams = ({teams}) => {
    const [loading, setLoading] = useState(false)
    const [activeTeam, setActiveTeam] = useState(teams[0])
    const [activeCalendar, setActiveCalendar] = useState([])

    const {t} = useTranslation()
    var start_date = new Date()
    var end_date = new Date(new Date().setDate(new Date().getDate() + 365))

    start_date = start_date.toISOString().substring(0, start_date.toISOString().lastIndexOf(':'))
    end_date = end_date.toISOString().substring(0, end_date.toISOString().lastIndexOf(':'))

    useEffect(() => {
        if (activeTeam) {
            (async () => {
                setLoading(true)
                const res = await fetchData(`/api/v4/teams/${activeTeam.id}/calendar?start_date=${start_date}&end_date=${end_date}`)
                const data = await res.json()

                await setActiveCalendar(data.calendar.splice(0, 2))
                setLoading(false)
            })()
        }
    }, [activeTeam])

    return teams.length > 0 ? (
        <div className={styles.dashboardTeams}>
            <div className={styles.dashboardTitle}>
                {t('myTeams')}
            </div>
            <div className={styles.dashboardContent}>
                <div className={styles.dashboardItem}>
                    <DashboardGeneralInfo
                        data={teams}
                        setActiveItem={setActiveTeam}
                        name={activeTeam.name}
                        count={activeTeam.player_count}
                        picture={activeTeam.picture}
                        team
                    />
                    {activeTeam?.player?.role?.value === 'captain' && (
                         <Link to={`/teams/${activeTeam.id}`} className={styles.dashboardBtn} type={'button'}>
                            {t('manageMyTeam')}
                        </Link>
                    )}
                   
                </div>
                <div className={styles.dashboardItem}>
                    {
                        !loading ? (<>
                            {
                                activeCalendar.length > 0 ? (<>
                                    <div className={styles.dashboardSubtitle}>
                                        {t('upcomingMatches')}
                                    </div>
                                    {
                                        activeCalendar.map(match => (
                                            <DashboardCalendarItem
                                                key={match.game.id}
                                                competitionInfo={match.competition}
                                                gameInfo={match.game}
                                                slice={true}
                                            />
                                        ))
                                    }
                                    <div className={styles.dashboardLinkWrap}>
                                        <Link className={styles.dashboardLink} to={`/teams/${activeTeam.id}/competitions`}>
                                            {t('SeeCalendar')}
                                        </Link>
                                    </div>
                                </>) : (
                                    <div className={'empty-block'}>
                                        {t('noGamesCome')}
                                    </div>
                                )
                            }
                        </>) : <Loader className={styles.dashboardLoader}/>
                    }
                </div>
                <div className={styles.dashboardItem}>
                    {
                        activeTeam.ranking ? <DashboardDivision divisionInfo={activeTeam.ranking}/> : (
                            <div className={'empty-block'}>
                                {t('noDivisionTeam')}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    ) : (
        <Link to={'/new-team'} className={cn(styles.dashboardTeams, styles.dashboardTeamsEmpty)}>
            {t('createTeam')}
        </Link>
    )
}
