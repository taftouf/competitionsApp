import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Styles
import styles from './index.module.scss'

// Components
import { Select } from '../Select'
import { Btn } from '../Btn'
import { handleError } from '../../functions/handleError'
import { showSuccessMessage } from '../../functions/showSuccessMessage'
import { useDispatch } from 'react-redux'
import { Loader } from '../Loader'
import { useTranslation } from 'react-i18next'

export const MembersChangeRole = ({data, closePopup, member, id, getTeam, team}) => {
    const dispatch = useDispatch()
    const [newRoleValue, setNewRoleValue] = useState()
    const [roles, setRoles] = useState([])
    const [disabledBtn, setDisabledBtn] = useState(true)
    const teamOptions = [1, 2, 3]
    const orgsOptions = [4, 5]
    const {t, i18n} = useTranslation()
    
    const changeRole = async () => {
        const formData = new FormData()
        formData.append('role_id', newRoleValue)

        try {
            await axios({
                method: 'PATCH',
                url: `/api/v3/${team ? 'teams' : 'organizations'}/${id}/${team ? 'players' : 'members'}/${member.id}`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept-Language' : i18n.language,
                },
            })

            showSuccessMessage(dispatch, 'successfullyUpdatedRole')
            getTeam()
            closePopup()
        } catch (error) {
            handleError(dispatch, error)
        }
    }

    useEffect(() => {
        if (newRoleValue) {
            if (newRoleValue !== member.role.id) setDisabledBtn(false)
            else setDisabledBtn(true)
        }
    }, [newRoleValue])

    useEffect(() => {
        if (data) setRoles(team?[...data.filter(role => teamOptions.includes(role.value))]:[...data.filter(role => orgsOptions.includes(role.value))])
    }, [data])

    return (
        <div className={styles.membersChange}>
            <div className={styles.membersChangeTop}>
                <button className={styles.membersChangeClose} type={'button'} onClick={closePopup}>
                    <span/>
                    <span/>
                </button>
                <div className={styles.membersChangeTitle}>
                    {t('changeRole')}
                </div>
            </div>
            <div className={styles.membersChangeContent}>
                {
                    roles.length > 0 ? (
                        <div className={styles.membersChangeContentNew}>
                            {t('role')}:
                            <Select
                                className={styles.membersChangeContentSelect}
                                initValue={member.role.id}
                                values={roles}
                                setNewValue={setNewRoleValue}
                                selectFullWidth
                            />
                        </div>
                    ) : <Loader />
                }
                <Btn className={styles.membersChangeSubmit} onClick={changeRole} disable={disabledBtn} red={!disabledBtn}>
                    {t('submitChanges')}
                </Btn>
            </div>
        </div>
    )
}
