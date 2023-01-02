import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

export const Form = ({onSubmit, children, className, noStyles}) => {
    const handleSubmit = e => {
        e.preventDefault()
        onSubmit()
    }

    return (
        <form className={cn({
            [styles.form]: !noStyles,
            [className]: className,
        })} onSubmit={handleSubmit}>
            {children}
        </form>
    )
}
