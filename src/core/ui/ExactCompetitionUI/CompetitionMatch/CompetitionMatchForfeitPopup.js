import React, { useEffect } from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'
import { useTranslation } from 'react-i18next'

export const CompetitionMatchForfeitPopup = ({
                                                 setForfeitPopup,
                                                 changeScores,
                                                 setForfeitedTeams,
                                                 prevState,
                                                 forfeitToSet,
                                                 changedValues,
                                                 name
                                             }) => {
    const {t} = useTranslation()
    useEffect(() => {
        if (changedValues) {
            changeScores('PUT')
            setForfeitPopup(false)
        }
    }, [changedValues])

    return (
        <>
            <div className={styles.teamsPopupTitle}>
                {t('forfeit')}
            </div>
            <div className={styles.teamsPopupContent}>
                <div className={styles.teamsPopupText}>
                    {t('youWantToForfeit', {name: name})}
                </div>
                <div className={styles.teamsPopupBtns}>
                    <button
                        className={cn(styles.teamsPopupBtn, styles.teamsPopupBtnGray)}
                        type={'button'}
                        onClick={() => {
                            setForfeitPopup(false)
                            setForfeitedTeams(prevState)
                        }}
                    >
                        {t('cancel')}
                    </button>
                    <button className={styles.teamsPopupBtn} type={'button'} onClick={() => setForfeitedTeams([...forfeitToSet])}>
                        {t('validate')}
                    </button>
                </div>
            </div>
        </>
    )
}
