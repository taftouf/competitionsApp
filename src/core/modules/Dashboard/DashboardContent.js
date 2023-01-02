import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Components
//import { Btn } from '../../ui/Btn'
import { DashboardUserCalendar } from './DashboardUserCalendar'
import { FollowedOrgs } from '../../ui/FollowedOrgs'
import { CompetitionsInfo } from '../../ui/CompetitionsUI/CompetitionsInfo'

import { useTranslation } from 'react-i18next'

export const DashboardContent = ({userInfo}) => {
    const {t} = useTranslation()

    return (
        <div className={styles.dashboardGeneralContent}>
            <div className={styles.dashboardContentTop}>
                <div className={styles.dashboardContentTopText}>
                    {t('welcome')}
                </div>
                {/* <a className={styles.dashboardContentBtn} type={'button'} href={process.env.REACT_APP_MARKETPLACE_LINK} rel={'noreferrer'} target={'_blank'}>
                    {t('license')}
                </a> */}
            </div>
            <DashboardUserCalendar userInfo={userInfo}/>
            <div className={styles.dashboardContentItem}>
                <FollowedOrgs/>
            </div>
            <div className={cn(styles.dashboardContentItem, styles.overflow)}>
                <CompetitionsInfo  limit={7} />
            </div>
        </div>
    )
}
