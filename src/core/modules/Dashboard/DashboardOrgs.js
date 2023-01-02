import React, { useEffect, useState } from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Components
import { DashboardGeneralInfo } from './DashboardGeneralInfo'
import { Select } from '../../ui/Select'
import { Link } from 'react-router-dom'
import { DashboardOrgsSwiper } from './DashboardOrgsSwiper'
import { Loader } from '../../ui/Loader'
import { fetchData } from '../../utils/fetchData'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

export const DashboardOrgs = ({orgs}) => {
    const [loading, setLoading] = useState(false)
    const [activeOrg, setActiveOrg] = useState(orgs[0])
    const [tournamentsFull, setTournamentsFull] = useState([])
    const [tournaments, setTournaments] = useState([])
    const [leaguesFull, setLeaguesFull] = useState([])
    const [leagues, setLeagues] = useState([])
    const [role, setRole] = useState(false)
    const isAdmin = useSelector(state => state.user.isAdmin )?useSelector(state => state.user.isAdmin ): role

    const [filterValue, setFilterValue] = useState('future')

    const {t} = useTranslation()

    useEffect(() => {
        if (activeOrg) {
            (async () => {
                setLoading(true)
                const resTour = await fetchData(`/api/v4/competitions/squad/tournaments?organizer_id=${activeOrg.id}`)
                const resLeague = await fetchData(`/api/v4/competitions/squad/leagues?organizer_id=${activeOrg.id}`)

                const dataTour = await resTour.json()
                const dataLeague = await resLeague.json()

                if (dataTour.competitions) setTournamentsFull([...dataTour.competitions])
                if (dataTour.competitions) setLeaguesFull([...dataLeague.competitions])

                setLoading(false)
            })()
        }
    }, [activeOrg])

    useEffect(() => {
        setTournaments(tournamentsFull.filter(tournament => tournament.status === filterValue))
        setLeagues(leaguesFull.filter(league => league.status === filterValue))
    }, [filterValue, tournamentsFull, leaguesFull])

    useEffect(()=>{
        setRole(activeOrg?.role?.value === "admin")
    }, [activeOrg])
    
    return orgs.length > 0 ? (
        <div className={styles.dashboardOrgs}>
            <div className={styles.dashboardTitle}>
                {t('myOrganizations')}
            </div>
            <div className={styles.dashboardContent}>
                <div className={styles.dashboardItem}>
                    <DashboardGeneralInfo
                        data={orgs}
                        setActiveItem={setActiveOrg}
                        name={activeOrg.name}
                        count={activeOrg.member_count}
                        picture={activeOrg.picture}
                    />
                    {isAdmin && (
                        <>
                            <Link to={`/organizations/${activeOrg.id}`} className={styles.dashboardBtn} type={'button'}>
                                {t('manageMyOrg')}
                            </Link>
                            {activeOrg.status === "approved" && (
                            <>
                                <Link to={`/new-league/${activeOrg.id}`} className={cn(styles.dashboardBtn, styles.dashboardBtnRed)}>
                                    {t('createLeague')}
                                </Link>
                                <Link to={`/new-tournament/${activeOrg.id}`} className={cn(styles.dashboardBtn, styles.dashboardBtnRed)}>
                                    {t('CreateTournament')}
                                </Link>
                            </>
                            )}
                        </>
                    )}
                    
                    
                </div>
                <div className={styles.dashboardItem}>
                    {
                        !loading ? (<>
                            <div className={styles.dashboardSubtitle}>
                                {t('upcomingCompetitions')}
                            </div>
                            <div className={styles.dashboardFilterWrap}>
                                <Select setNewValue={setFilterValue} />
                            </div>
                            <div className={styles.dashboardOrgsType}>
                                <div className={styles.dashboardOrgsTypeLink}>
                                    {t('tournaments')} :
                                </div>
                                {
                                    tournaments.length > 0 ? <DashboardOrgsSwiper data={tournaments} tourney /> : (
                                        <div className={'empty-block'}>
                                            {t('noTournaments')}
                                        </div>
                                    )
                                }
                            </div>
                            <div className={styles.dashboardOrgsType}>
                                <div className={styles.dashboardOrgsTypeLink}>
                                    {t('leagues')} :
                                </div>
                                {
                                    leagues.length > 0 ? <DashboardOrgsSwiper data={leagues} league /> : (
                                        <div className={'empty-block'}>
                                            {t('noLeagues')}
                                        </div>
                                    )
                                }
                            </div>
                            <div className={styles.dashboardLinkWrap}>
                                <Link className={styles.dashboardLink} to={`/organizations/${activeOrg.id}/competitions`}>
                                    {t('SeeCompetitions')}
                                </Link>
                            </div>
                        </>) : <Loader className={styles.dashboardLoader} />
                    }
                </div>
            </div>
        </div>
    ) : (
        <Link to={'/new-org'} className={cn(styles.dashboardTeams, styles.dashboardTeamsEmpty)}>
            {t('createOrganization')}
        </Link>
    )
}
