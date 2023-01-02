import React from 'react'

// Styles
import styles from './index.module.scss'
import { Btn } from '../Btn'
import axios from 'axios'
import { handleError } from '../../functions/handleError'
import { showSuccessMessage } from '../../functions/showSuccessMessage'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

export const MembersRemove = ({closePopup, member, id, getTeam, team}) => {

    const dispatch = useDispatch()
    const {t, i18n} = useTranslation()
    const changePosition = async () => {
        try {
            await axios({
                method: 'DELETE',
                url: `/api/v3/${team ? 'teams' : 'organizations'}/${id}/${team ? 'players' : 'members'}/${member.id}`,
                headers:{
                    'Accept-Language' : i18n.language,
                }
            })

            showSuccessMessage(dispatch, `Successfully deleted ${team ? 'player' : 'member'}`)
            getTeam()
            closePopup()
        } catch (error) {
            handleError(dispatch, error)
        }
    }

    return (
        <div className={styles.membersChange}>
            <div className={styles.membersChangeTop}>
                <button className={styles.membersChangeClose} type={'button'} onClick={closePopup}>
                    <span/>
                    <span/>
                </button>
                <div className={styles.membersChangeTitle}>
                    {t('remove')} {member?.user.pseudo}?
                </div>
            </div>
            <div className={styles.membersChangeContent}>
                <div className={styles.membersChangeBtns}>
                    <Btn className={styles.membersChangeSubmit} onClick={closePopup}>
                        {t('cancel')}
                    </Btn>
                    <Btn className={styles.membersChangeSubmit} onClick={changePosition}>
                        {t('remove')}
                    </Btn>
                </div>
            </div>
        </div>
    )
}
