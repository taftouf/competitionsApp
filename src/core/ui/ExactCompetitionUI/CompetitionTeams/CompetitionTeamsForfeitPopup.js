import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

import { useTranslation } from 'react-i18next'

export const CompetitionTeamsForfeitPopup = ({setForfeitTeam, setForfeit, team}) => {
    const {t} = useTranslation()

    return team && (<>
        <div className={styles.teamsPopupTitle}>
            {t('forfeitName', {name: team.participant.name})}
        </div>
        <div className={styles.teamsPopupContent}>
            <div className={styles.teamsPopupText}>
                {t('youWantToForfeit', {name: team.participant.name})}
                {t('AllSubsequentMatchesWillBeLos')}
            </div>
            <div className={styles.teamsPopupBtns}>
                <button
                    className={cn(styles.teamsPopupBtn, styles.teamsPopupBtnGray)}
                    type={'button'}
                    onClick={setForfeitTeam}
                >
                    {t('cancel')}
                </button>
                <button className={styles.teamsPopupBtn} type={'button'} onClick={setForfeit}>
                    {t('validate')}
                </button>
            </div>
        </div>
    </>)
}
