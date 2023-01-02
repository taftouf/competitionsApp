import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

export const CompetitionTeamsDeletePopup = ({setTeamToDelete, deleteTeam, team}) => {
    return team && (<>
        <div className={styles.teamsPopupTitle}>
            Supprimer un membre
        </div>
        <div className={styles.teamsPopupContent}>
            <div className={styles.teamsPopupText}>
                Souhaitez-vous vraiment supprimer {team.participant.name} ?
            </div>
            <div className={styles.teamsPopupBtns}>
                <button
                    className={cn(styles.teamsPopupBtn, styles.teamsPopupBtnGray)}
                    type={'button'}
                    onClick={setTeamToDelete}
                >
                    Annuler
                </button>
                <button className={styles.teamsPopupBtn} type={'button'} onClick={deleteTeam}>
                    Valider
                </button>
            </div>
        </div>
    </>)
}
