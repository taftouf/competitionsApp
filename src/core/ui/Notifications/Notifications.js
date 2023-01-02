import React from 'react'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

// Functions
import { removeNotifTimeout } from '../../functions/removeNotifTimeout'

// Styles
import styles from './index.module.scss'

// Images
import loader from '../../../assets/images/loader.gif'

// Components
import { SvgSprite } from '../SvgSprite/SvgSprite'

export const Notifications = () => {
    const dispatch = useDispatch()

    const notifications = useSelector(state => state.notifications.notifications)

    const handleClick = id => {
        dispatch(removeNotifTimeout(id, 0))
    }

    return notifications.length > 0 ? (
        <div className={styles.notifications}>
            {
                notifications.map(notificationItem => (
                    <div className={cn({
                        [styles.notificationsItem]: true,
                        [styles.notificationsItemLoading]: notificationItem.type === 'loading',
                        [styles.notificationsItemGreen]: notificationItem.type === 'success',
                        [styles.notificationsItemRed]: notificationItem.type ===  'error',
                    })} key={notificationItem.id}>
                        <span className={styles.notificationsItemIcon}>
                            {
                                notificationItem.type === 'loading' && <img src={loader} alt='loader'/>
                            }
                            {
                                notificationItem.type === 'success' && <SvgSprite spriteID={'success'} />
                            }
                            {
                                notificationItem.type === 'error' && (
                                    <SvgSprite
                                        className={styles.notificationsIconError}
                                        spriteID={'error'}
                                    />
                                )
                            }
                        </span>
                        {notificationItem.text}
                        <div className={styles.notificationsClose} onClick={() => handleClick(notificationItem.id)}>
                            Close
                        </div>
                    </div>
                ))
            }
        </div>
    ) : null
}
