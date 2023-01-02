import React from 'react'

// Styles
import styles from './index.module.scss'
import { Btn } from '../Btn'
import { handleError } from '../../functions/handleError'
import { showSuccessMessage } from '../../functions/showSuccessMessage'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { fetchData } from '../../utils/fetchData'

export const MembersRejected = ({closePopup, member, id, getTeam, team}) => {
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const changePosition = async () => {
        try {
            const url =  `/api/v3/${team ? 'teams' : 'organizations'}/${id}/${team ? 'players' : 'members'}/${member.id}`
            await fetchData(url, {
                method: 'PUT',
                body: JSON.stringify({
                    status: "rejected"
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            showSuccessMessage(dispatch, t('RegectMsg'))
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
                    {t('dismiss')} {team ? t('player') : t('member')}?
                </div>
            </div>
            <div className={styles.membersChangeContent}>
                <div className={styles.membersChangeBtns}>
                    <Btn className={styles.membersChangeSubmit} onClick={closePopup}>
                        {t('cancel')}
                    </Btn>
                    <Btn className={styles.membersChangeSubmit} onClick={changePosition}>
                        {t('dismiss')} {team ? t('Player') : t('Member')}
                    </Btn>
                </div>
            </div>
        </div>
    )
}
