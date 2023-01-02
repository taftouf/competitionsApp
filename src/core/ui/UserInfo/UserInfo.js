import React from 'react'

// Styles
import styles from './index.module.scss'

// Components
import { Img } from '../Img'

export const UserInfo = ({userInfo}) => {
    return (
        <div className={styles.user}>
            <Img
                className={styles.userPhoto}
                src={userInfo.picture}
                alt='user'
            />
            <div className={styles.userPseudo}>
                {userInfo.pseudo}
            </div>
        </div>
    )
}
