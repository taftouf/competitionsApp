import React from 'react'

// Hooks
import { useMobile } from '../../hooks/useMobile'

// Styles
import styles from './index.module.scss'

// Components
import { DashboardTeams } from './DashboardTeams'
import { UserInfo } from '../../ui/UserInfo/UserInfo'

export const DashboardAside = ({userInfo, teams}) => {
    const isMobile = useMobile(501)

    return (
        <aside className={styles.dashboardAside}>
            {
                !isMobile && <UserInfo userInfo={userInfo} />
            }
            <DashboardTeams teams={teams}/>
        </aside>
    )
}
