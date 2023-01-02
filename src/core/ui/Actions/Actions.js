import React, { useEffect, useRef } from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'
import { useMobile } from '../../hooks/useMobile'
import { useToggle } from '../../hooks/useToggle'
import { SvgSprite } from '../SvgSprite/SvgSprite'
// translate
import { useTranslation } from 'react-i18next'

export const Actions = ({actions, setActiveItem}) => {
    const isTablet = useMobile(769)
    const {isOpened, toggleIsOpened} = useToggle()
    const action = useRef()
    const {t} = useTranslation()

    const handleClick = e => {
        if (isOpened && !action.current.contains(e.target)) {
            toggleIsOpened()
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)

        return () => document.removeEventListener('click', handleClick)
    }, [isOpened])

    return (
        <div className={styles.actions} ref={action}>
            <div className={styles.actionsBtn} onClick={toggleIsOpened}>
                {
                    isTablet ? <SvgSprite spriteID={'arrow'}/> : <SvgSprite spriteID={'more'}/>
                }
            </div>
            {
                isOpened && (
                    <div className={styles.actionsContent}>
                        {
                            actions.map(actionItem => actionItem && (
                                <div key={actionItem.id} className={cn(styles.actionsContentBtn, {
                                    [styles.actionsContentBtnDelete]: actionItem.delete,
                                })} onClick={() => {
                                    actionItem.onClick()
                                    setActiveItem && setActiveItem()
                                }}>
                                    <SvgSprite spriteID={actionItem.icon}/>
                                    {t(actionItem.text)}
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}
