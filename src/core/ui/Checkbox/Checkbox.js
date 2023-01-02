import React, { useEffect, useState } from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Components
import { SvgSprite } from '../SvgSprite/SvgSprite'

export const Checkbox = ({className, setIsChecked, children, error, initValue, toggle, disableClick}) => {
    const [checked, setChecked] = useState(false)

    const handleChange = () => !disableClick && setChecked(!checked)

    useEffect(() => {
        if (setIsChecked) setIsChecked(checked)
    }, [checked])

    useEffect(() => {
        if (typeof initValue === 'boolean') setChecked(initValue)
    }, [initValue])

    return (
        <label className={cn(styles.checkboxWrap, {
            [styles.checkboxWrapFlex]: children,
            [className]: className,
            [styles.checkboxWrapDisabled]: disableClick,
        })}>
            <div className={cn(styles.checkbox, {
                [styles.checkboxActive]: checked,
                [styles.checkboxToggle]: toggle,
                [styles.checkboxError]: error,
            })}>
                {checked && !toggle && <SvgSprite className={styles.checkboxIcon} spriteID={'check'} />}
                {
                    toggle && (
                        <div className={cn(styles.checkboxToggleCircle, {
                            [styles.checkboxToggleCircleActive]: checked,
                        })} />
                    )
                }
            </div>
            {
                children && (
                    <div className={styles.checkboxText}>
                        {children}
                    </div>
                )
            }
            <input className={styles.checkboxEL} type='checkbox' onChange={handleChange} checked={checked}/>
        </label>
    )
}
