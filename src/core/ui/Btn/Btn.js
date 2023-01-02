import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

export const Btn = ({children, type, onClick, className, disable, noStyles, red}) => {
    return (
        <button
            className={cn({
                [styles.btn]: !noStyles,
                [styles.btnDisabled]: disable,
                [styles.btnRed]: red,
                [className]: className,
            })}
            type={type ? type : 'button'}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
