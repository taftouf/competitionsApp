import React from 'react'
import cn from 'classnames'

// Hooks
import { useToggle } from '../../hooks/useToggle'

// Styles
import styles from './index.module.scss'

// Components
import { Btn } from '../Btn'
import { SvgSprite } from '../SvgSprite/SvgSprite'

import { useTranslation } from 'react-i18next'

// Function
import { fetchData } from '../../utils/fetchData'

export const HeaderSessions = ({setSessions, sessions}) => {
    const {isOpened, toggleIsOpened} = useToggle()
    
    const {t} = useTranslation()
    
    const logout = async(session_id) => {

        const res = await fetchData(`/auth/v3/logout/${session_id}`, {
            method: 'DELETE',
        })
        if(res.ok){           
            setSessions(sessions => sessions.filter((session) => session.id !== session_id))
        }
    }
    return (
        <div className={styles.headerMenuSessions}>
            <Btn type={'button'} className={cn(styles.headerMenuSubItem, {
                [styles.headerMenuSubItemSessions]: isOpened,
            })} onClick={toggleIsOpened}>
                {t('mySessions')}
            </Btn>
            {
                isOpened && (
                    <ul className={styles.headerMenuSessionsList}>
                        {
                            sessions.map(session => (
                                <li className={styles.headerMenuSessionsItem} key={session.id}>
                                    <div className={styles.headerMenuSessionsIcon}>
                                        {
                                            session.is_mobile ?
                                                <SvgSprite spriteID={'mobile'} /> :
                                                <SvgSprite spriteID={'desktop'} />
                                        }
                                    </div>
                                    <div className={styles.headerMenuSessionsDevice}>
                                        {session.user_agent}
                                        <span>{session.last_connection.date}</span>
                                    </div>
                                    {
                                        session.active ? (
                                            <div className={cn(styles.headerMenuSessionsStatus, styles.headerMenuSessionsActive)}>
                                                <SvgSprite spriteID={'check'} />
                                            </div>
                                        ) : (
                                            <div className={cn(styles.headerMenuSessionsStatus, styles.headerMenuSessionsLogout)} onClick={()=>logout(session.id)}>
                                                <SvgSprite spriteID={'logout'}/>
                                            </div>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </div>
    )
}
