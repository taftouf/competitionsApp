import React from 'react'
import cn from 'classnames'

// Hooks
import { useToggle } from '../../hooks/useToggle'

// Styles
import styles from './index.module.scss'

// Components
import { SvgSprite } from '../SvgSprite/SvgSprite'

export const ToggleContentOrgs = ({title, values,setActiveValue, setFilterValue}) => {
    const {isOpened, toggleIsOpened} = useToggle()

    return (
        <div className={cn(styles.toggleContent)}>
            <div className={cn(styles.toggleContentBtn, {
                [styles.toggleContentBtnActive]: isOpened,
            })} onClick={toggleIsOpened}>
                {title}
                <SvgSprite spriteID={'arrow'} />
            </div>
            {
                isOpened && (
                    <>
                    <div className={cn(styles.toggleContentActive, {
                        [styles.heightMax]: values.length<3,
                        [styles.heightFix]: values.length>2,
                    })}>
                        {values.map(v=>(
                            <div key={v.id} className={cn(styles.toggleContentBtn, {
                                [styles.toggleContentBtnActive]: isOpened,
                            })} onClick={() => {
                                    toggleIsOpened(false);
                                    setFilterValue(v.id);
                                    setActiveValue(v.name)}}>
                                {v.name}
                            </div>
                        ))}
                    </div>
                    </>
                )
            }
        </div>
    )
}