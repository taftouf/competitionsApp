import React, { useEffect, useRef, useState } from 'react'

// Hooks
import { useToggle } from '../../hooks/useToggle'

// Styles
import styles from './index.module.scss'

// Components
import { Btn } from '../Btn'
import { HeaderMenu } from './HeaderMenu'
import { fetchData } from '../../utils/fetchData'
import { Popup } from '../Popup'
import { HeaderChangePassword } from './HeaderChangePassword'
import { useSelector } from 'react-redux'
import { Img } from '../Img'


export const HeaderUser = () => {
    const {isOpened, toggleIsOpened} = useToggle()
    const menu = useRef()
    const userInfo = useSelector(state => state.user.userInfo)
    const [sessions, setSessions] = useState([])
    const [changePassword, setChangePassword] = useState(false)

    useEffect(() => {
        (async () => {
            const res = await fetchData('/auth/v3/sessions')
            const data = await res.json()

            data.sessions && setSessions([...data.sessions])
        })()
    }, [])

    const handleClick = e => {
        if (isOpened && !menu.current.contains(e.target)) {
            toggleIsOpened()
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)

        return () => document.removeEventListener('click', handleClick)
    }, [isOpened])

    return (
        <div className={styles.headerUser} ref={menu}>
            <Btn className={styles.headerUserBtn} onClick={toggleIsOpened}>
                <Img
                    className={styles.dashboardTeamsInfoImg}
                    src={userInfo.picture}
                    alt='photo'
                />
            </Btn>
            {
                isOpened && <HeaderMenu setSessions={setSessions} sessions={sessions} openPopup={() => setChangePassword(true)} />
            }
            <Popup isOpenedPopup={changePassword} closePopup={() => setChangePassword(false)}>
                <HeaderChangePassword closePopup={() => setChangePassword(false)} />
            </Popup>
        </div>
    )
}
