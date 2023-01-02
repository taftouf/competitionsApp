import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

//traduction
import { useTranslation } from 'react-i18next'

export const CompetitionAdminValiderPopup = ({setScoresToValider, changeScores, havePermissions, isAdmin}) => {
    const {t} = useTranslation()
    return (
        <>
            <div className={styles.teamsPopupTitle}>
                {t('changeScore')}
            </div>
            <div className={styles.teamsPopupContent}>
                <div className={styles.teamsPopupText}>
                    {t('areYouSureYouChangeScore')}
                </div>
                <div className={styles.teamsPopupBtns}>
                    <button
                        className={cn(styles.teamsPopupBtn, styles.teamsPopupBtnGray)}
                        type={'button'}
                        onClick={setScoresToValider}
                    >
                        {t('cancel')}
                    </button>
                    <button className={styles.teamsPopupBtn} type={'button'} onClick={() => {
                        changeScores((havePermissions && !isAdmin) ? 'PATCH' : 'PUT')
                        setScoresToValider(false)
                    }}>
                        {t('validate')}
                    </button>
                </div>
            </div>
        </>
    )
}
