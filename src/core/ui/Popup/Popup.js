import React, { useEffect, useState } from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

export const Popup = ({children, closePopup, isOpenedPopup, small, big}) => {
    const [isOpened, setIsOpened] = useState(false)

    const handleClosePopup = () => {
        setIsOpened(false)

        if (closePopup) closePopup()
    }

    useEffect(() => {
        setIsOpened(isOpenedPopup)
    }, [isOpenedPopup])

    return isOpened && (
        <div className={styles.popup}>
            <div className={styles.popupOuter} onClick={handleClosePopup} />
            <div className={cn(styles.popupInner, {
                [styles.popupInnerSmall]: small,
                [styles.popupInnerBig]: big,
            })}>
                {children}
            </div>
        </div>
    )
}
