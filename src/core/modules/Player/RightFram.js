import React from 'react'

import styles from './index.module.scss'
import { useTranslation } from 'react-i18next'

export const RightFram = ({buts, hommeDeMatch, cleanSheet, assists}) => {
    const {t} = useTranslation()
    
    return (
        <div className={styles.rightFram}>
                <div className={styles.item}>
                    <div className={styles.element}>
                        {t('goals')}
                    </div>
                    <div className={styles.iconBody}>
                        <div className={styles.value}>{buts}</div>
                    </div>
                </div> 
                <div className={styles.item}>
                    <div className={styles.element}>{t('assists')}</div>
                    <div className={styles.iconBody}>
                        <div className={styles.value}>{assists}</div>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.element}>{t('ManMatch')}</div>
                    <div className={styles.iconBody}>
                        <div className={styles.value}>{hommeDeMatch}</div>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.element}>{t('cleansheets')}</div>
                    <div className={styles.iconBody}>
                        <div className={styles.value}>{cleanSheet}</div>
                    </div>
                </div>
        </div>
    )
}
