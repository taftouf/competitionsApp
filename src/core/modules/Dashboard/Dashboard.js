import React from 'react'
import { useSelector } from 'react-redux'

// Styles
import styles from './index.module.scss'

// Hooks
import { useMobile } from '../../hooks/useMobile'

// Components
import { PageWrapper } from '../../ui/PageWrapper'
import { DashboardAside } from './DashboardAside'
import { DashboardOrgs } from './DashboardOrgs'
import { DashboardContent } from './DashboardContent'

export const Dashboard = () => {
    const userInfo = useSelector(state => state.user.userInfo)
    const teams = useSelector(state => state.teams.teams)
    const orgs = useSelector(state => state.orgs.orgs)
    const isMobile = useMobile()

    return (
        <PageWrapper>
            <div className={styles.container}>
                <div className={styles.dashboard}>
                    {
                        !isMobile ? (<>
                            <DashboardAside userInfo={userInfo} teams={teams}/>
                            <DashboardContent userInfo={userInfo}/>
                            <DashboardOrgs orgs={orgs}/>
                        </>) : (<>
                            <DashboardContent userInfo={userInfo}/>
                            <div className={styles.dashboardMobileWrap}>
                                <DashboardAside userInfo={userInfo} teams={teams}/>
                                <DashboardOrgs orgs={orgs}/>
                            </div>
                        </>)
                    }
                </div>
            </div>
        </PageWrapper>
    )
}
