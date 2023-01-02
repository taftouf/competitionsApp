import React, { useEffect, useState } from 'react'

// Styles
import styles from './index.module.scss'
import { Btn } from '../Btn'
import { handleError } from '../../functions/handleError'
import { showSuccessMessage } from '../../functions/showSuccessMessage'
import { useDispatch } from 'react-redux'
import { Loader } from '../Loader'
import { FootballField } from '../FootballField'
import { useTranslation } from 'react-i18next'
import { fetchData } from '../../utils/fetchData'

export const MembersChangePosition = ({data, closePopup, member, id, getTeam, team}) => {
    const dispatch = useDispatch()
    const [newValue, setNewValue] = useState()
    const [positions, setPositions] = useState([])
    const [disabledBtn, setDisabledBtn] = useState(true)
    const {t} = useTranslation()
    const changePosition = async () => {
        
        try {
            const  url = `/api/v3/${team ? 'teams' : 'organizations'}/${id}/${team ? 'players' : 'members'}/${member.id}`
            await fetchData(url, {
                method: 'PATCH',
                body: JSON.stringify({
                    position_id : newValue,
                    role_id : member.role.id
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            showSuccessMessage(dispatch, 'Successfully updated position')
            getTeam()
            closePopup()
        } catch (error) {
            handleError(dispatch, error)
        }
    }

    useEffect(() => {
        if (newValue) {
            if (newValue !== member?.position?.id) setDisabledBtn(false)
            else setDisabledBtn(true)
        }
    }, [newValue])

    useEffect(() => {
        if (data) setPositions([...data])
    }, [data])

    return (
        <div className={styles.membersChange}>
            <div className={styles.membersChangeTop}>
                <button className={styles.membersChangeClose} type={'button'} onClick={closePopup}>
                    <span/>
                    <span/>
                </button>
                <div className={styles.membersChangeTitle}>
                    {t('changePosition')}
                </div>
            </div>
            <div className={styles.membersChangeContent}>
                {
                    positions.length > 0 ? (
                        <div className={styles.membersChangeContentNew}>
                            {/* <Select
                                className={styles.membersChangeContentSelect}
                                initValue={member?.position?.id}
                                values={positions}
                                setNewValue={setNewValue}
                                selectFullWidth
                            /> */}
                            <FootballField 
                                initValue={member?.position?.id}
                                values={positions}
                                setNewValue={setNewValue}
                                 />
                        </div>
                    ) : <Loader />
                }
                <div className={styles.btnsChn}>
                    <Btn className={styles.membersChangeSubmit} onClick={closePopup} disable={disabledBtn}>
                        {t('cancel')}
                    </Btn>
                    <Btn className={styles.membersChangeSubmit} onClick={changePosition} disable={disabledBtn} red={!disabledBtn}>
                        {t('validate')}
                    </Btn>
                </div>
                
            </div>
        </div>
    )
}
