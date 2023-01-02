import React from 'react'

// Styles
import styles from './index.module.scss'
import { Btn } from '../Btn'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { addNotification } from '../../../store/slices/notificationsSlice'
import { removeNotifTimeout } from '../../functions/removeNotifTimeout'


export const RejoindreDialog = ({closePopup, userInfo, data, team, getTeam}) => {
    const dispatch = useDispatch()
    const {t, i18n} = useTranslation()
    const rejoindre = async () => {
        const formData = new FormData()
        formData.append('user_id', userInfo.id)
        try {
            const url = team ? `/api/v3/teams/${data.id}/players` : `/api/v3/organizations/${data.id}/members`
            await axios({
                method: 'POST',
                url: url,
                data: formData,
                headers:{
                    'Accept-Language' : i18n.language,
                }
            })
            const successID = uuid()
            getTeam()
            dispatch(addNotification({id: successID, type: 'success', text: t('JoinMsg')}))
            dispatch(removeNotifTimeout(successID, 3000))
            closePopup()
        } catch (error) {
            const errorID = uuid()
            let textError = ''

            if (typeof error.response?.data?.message === 'string') {
                textError = error.response?.data?.message
            } else {
                for (let errorField in error.response?.data?.message) {
                    textError = error.response?.data?.message[errorField]
                }
            }

            dispatch(addNotification({id: errorID, type: 'error', text: textError +" "+ error?.response?.status}))
            dispatch(removeNotifTimeout(errorID, 3000))
            closePopup()
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
                {team ? t('rejoindreTeam') : t('rejoindreOrganization')}
                </div>
            </div>
            <div className={styles.membersChangeContent}>
                <div className={styles.membersChangeBtns}>
                    <Btn className={styles.membersChangeSubmit} onClick={closePopup}>
                        {t('cancel')}
                    </Btn>
                    <Btn className={styles.membersChangeSubmit} onClick={rejoindre}>
                        {t('join')}
                    </Btn>
                </div>
            </div>
        </div>
    )
}
