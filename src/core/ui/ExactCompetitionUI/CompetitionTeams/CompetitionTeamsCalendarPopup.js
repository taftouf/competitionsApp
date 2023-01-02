import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

export const CompetitionTeamsCalendarPopup = ({setCalendarPopup, setCalendar}) => {
    return (<>
        <div className={styles.teamsPopupTitle}>
            Générer le calendrier
        </div>
        <div className={styles.teamsPopupContent}>
            <div className={styles.teamsPopupText}>
                Souhaitez-vous vraiment générer le calendrier ?
            </div>
            <div className={styles.teamsPopupBtns}>
                <button
                    className={cn(styles.teamsPopupBtn, styles.teamsPopupBtnGray)}
                    type={'button'}
                    onClick={() => setCalendarPopup(false)}
                >
                    Annuler
                </button>
                <button className={styles.teamsPopupBtn} type={'button'} onClick={setCalendar}>
                    Valider
                </button>
            </div>
        </div>
    </>)
}
