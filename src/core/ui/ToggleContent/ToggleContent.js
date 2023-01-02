import React from 'react'
import cn from 'classnames'

// Hooks
import { useToggle } from '../../hooks/useToggle'

// Styles
import styles from './index.module.scss'

// Components
import { SvgSprite } from '../SvgSprite/SvgSprite'

export const ToggleContent = ({title, children}) => {
    const {isOpened, toggleIsOpened} = useToggle()

    return (
        <div className={styles.toggleContent}>
            <div className={cn(styles.toggleContentBtn, {
                [styles.toggleContentBtnActive]: isOpened,
            })} onClick={toggleIsOpened}>
                {title}
                <SvgSprite spriteID={'arrow'} />
            </div>
            {
                isOpened && (
                    <div className={styles.toggleContentInner}>
                        {children}
                    </div>
                )
            }
        </div>
    )
}
