import React from 'react'

// Styles
import styles from './index.module.scss'

// Components
import { PhotoSwiper } from '../../ui/PhotoSwiper'
import { Img } from '../../ui/Img'

import { useTranslation } from 'react-i18next'

export const DashboardGeneralInfo = ({data, setActiveItem, name, count, picture, team}) => {
    const {t} = useTranslation()

    return (<>
        <PhotoSwiper setActiveItem={setActiveItem} data={data} link={team ? '/new-team' : '/new-org'}/>
        <div className={styles.dashboardTeamsInfo}>
            <Img
                className={styles.dashboardTeamsInfoImg}
                src={picture}
                alt='photo'
            />
            <div className={styles.dashboardTeamsInfoContent}>
                <div className={styles.dashboardTeamsInfoName}>
                    {name}
                </div>
                <div className={styles.dashboardTeamsInfoMembers}>
                    {count} { team ? t('Joueur') : t('member') }{ count != 1 ? "s" : "" }
                </div>
            </div>
        </div>
    </>)
}
