import React from 'react'

// Hooks
import { useInput } from '../../hooks/useInput'
import { useMobile } from '../../hooks/useMobile'
import { useToggle } from '../../hooks/useToggle'

// Styles
import styles from './index.module.scss'

// Components
import { SvgSprite } from '../SvgSprite/SvgSprite'

export const HeaderSearch = () => {
    const {isOpened, toggleIsOpened} = useToggle()
    const searchInp = useInput('')
    const isMobile = useMobile()

    return (<>
        {
            isMobile && (
                <div className={styles.headerSearchBtn} onClick={toggleIsOpened}>
                    <SvgSprite spriteID={'search'} />
                </div>
            )
        }
        {
            isMobile ? (<>
                {
                    isOpened && (
                        <div className={styles.headerSearch}>
                            <input
                                className={styles.headerSearchInp}
                                type='text'
                                placeholder={'Recherche'}
                                value={searchInp.value}
                                onChange={searchInp.onChange}
                            />
                        </div>
                    )
                }
            </>) : (
                <div className={styles.headerSearch}>
                    <input
                        className={styles.headerSearchInp}
                        type='text'
                        placeholder={'Recherche'}
                        value={searchInp.value}
                        onChange={searchInp.onChange}
                    />
                </div>
            )
        }
    </>)
}
