import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'
import { useTranslation } from 'react-i18next'

export const CompetionAdminDeleteScore = ({setScoresToDelete, changeScores}) => {
    const {t} = useTranslation()
    return (
        <>
            <div className={styles.teamsPopupTitle}>
                {t('resetScore')}
            </div>
            <div className={styles.teamsPopupContent}>
                <div className={styles.teamsPopupText}>
                    {t('areYouSureYouResetScore')}
                </div>
                <div className={styles.teamsPopupBtns}>
                    <button
                        className={cn(styles.teamsPopupBtn, styles.teamsPopupBtnGray)}
                        type={'button'}
                        onClick={setScoresToDelete}
                    >
                        {t('cancel')}
                    </button>
                    <button className={styles.teamsPopupBtn} type={'button'} onClick={() => changeScores('DELETE')}>
                        {t('validate')}
                    </button>
                </div>
            </div>
        </>
    )
}
