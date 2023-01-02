import React from 'react'

import styles from './index.module.scss'
import { useTranslation } from 'react-i18next'


export const LeftFram = ({games, avg}) => {
    const {t} = useTranslation()
    return (
        <div className={styles.leftFram}>
             <div className={styles.box}>
                <div className={styles.cercle}>
                    {games}
                </div>
                <div className={styles.title}>
                    {t('matches')}
                </div>
            </div>

            <div className={styles.box}>
                <div className={styles.cercle}>
                    {avg}
                </div>
                <div className={styles.title}>
                    {t('averageRatings')}
                </div>
            </div>
        </div>
    )
}
