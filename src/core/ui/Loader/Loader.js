import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

export const Loader = ({loginLoader = false}) => {
    return (
        <div className={cn(styles.loaderWrap, !loginLoader ? styles.loaderWrapHome : '')}>
            <div className={cn(styles.loader, loginLoader ? styles.loaderLogin : styles.loaderHome)}>
                <svg viewBox='0 0 80 80'>
                    <circle id='test' cx='40' cy='40' r='32'></circle>
                </svg>
            </div>

            <div
                className={cn(styles.loader, styles.loaderTriangle, loginLoader ? styles.loaderLogin : styles.loaderHome)}>
                <svg viewBox='0 0 86 80'>
                    <polygon points='43 8 79 72 7 72'></polygon>
                </svg>
            </div>

            <div className={cn(styles.loader, loginLoader ? styles.loaderLogin : styles.loaderHome)}>
                <svg viewBox='0 0 80 80'>
                    <rect x='8' y='8' width='64' height='64'></rect>
                </svg>
            </div>
        </div>
    )
}
