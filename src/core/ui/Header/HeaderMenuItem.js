import React from 'react'
import cn from 'classnames'

// Hooks
import { useToggle } from '../../hooks/useToggle'

// Styles
import styles from './index.module.scss'

// Components
import { SvgSprite } from '../SvgSprite/SvgSprite'
import { Img } from '../Img'

export const HeaderMenuItem = ({icon, title, user, children}) => {
    const {isOpened, toggleIsOpened} = useToggle()

    return (
        <li className={styles.headerMenuItem}>
            <div className={cn(styles.headerMenuTitle, {
                [styles.cursorUser]: user
            })} onClick={toggleIsOpened}>
                <div className={cn(styles.headerMenuIcon, {
                    [styles.headerMenuIconUser]: user
                })}>
                    {
                        user ? (
                            <Img
                                className={styles.headerMenuUser}
                                src={user.picture}
                                alt={'user photo'}
                            />
                        ) : <SvgSprite spriteID={icon} />
                    }
                </div>
                {title}
            </div>
            {
                children && isOpened && (
                    <div className={styles.headerMenuItemContent}>
                        {children}
                    </div>
                )
            }
        </li>
    )
}
