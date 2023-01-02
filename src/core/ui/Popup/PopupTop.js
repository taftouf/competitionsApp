import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

export const PopupTop = ({className, closePopup, title}) => {
    return (
        <div className={cn(styles.popupTop, {
            [className]: className,
        })}>
            <button className={styles.popupClose} type={'button'} onClick={closePopup}>
                <span/>
                <span/>
            </button>
            <div className={styles.popupTitle}>
                {title}
            </div>
        </div>
    )
}
