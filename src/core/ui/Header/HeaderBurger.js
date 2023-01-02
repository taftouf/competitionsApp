import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Hooks
import { useToggle } from '../../hooks/useToggle'

// Components
import { UserInfo } from '../UserInfo/UserInfo'
import { SvgSprite } from '../SvgSprite/SvgSprite'

import { useTranslation } from "react-i18next";
import { useMobile } from '../../hooks/useMobile'

export const HeaderBurger = () => {
    const {isOpened, toggleIsOpened} = useToggle()
    const userInfo = useSelector(state => state.user.userInfo)
    const { t } = useTranslation();
    const isMobile = useMobile()
    return (
        <div className={cn(styles.headerBurgerWrap,{
            [styles.headerBurgerWrapMobile] : isMobile,
        })}>
            {
                isOpened && (
                    <div className={styles.headerBurgerUnderline}>

                    </div>
                )
            }
            <div className={cn(styles.headerBurger, {
                [styles.headerBurgerActive]: isOpened,
            })} onClick={toggleIsOpened}>
                <span/>
                <span/>
                <span/>
            </div>
            {
                isOpened && (
                    <div className={styles.headerBurgerMenu}>
                        <div className={styles.headerBurgerBox}>
                            <UserInfo userInfo={userInfo} />
                            <Link className={styles.headerBurgerItem} to={'/discover'}>
                                <SvgSprite spriteID={'teams'} />
                                {t('myTeams')}
                            </Link>
                            <Link className={styles.headerBurgerItem} to={'/discover'}>
                                <SvgSprite spriteID={'orgs'} />
                                {t('myOrganizations')}
                            </Link>
                        </div>
                        {/* <div className={styles.headerBurgerBox}>
                            <Link className={styles.headerBurgerItem} to={'/dashboard'}>
                                <div className={styles.headerBurgerImgWrap}/>
                                Market place ?
                            </Link>
                            <Link className={styles.headerBurgerItem} to={'/dashboard'}>
                                <div className={styles.headerBurgerImgWrap}/>
                                Division ?
                            </Link>
                        </div> */}
                    </div>
                )
            }
        </div>
    )
}
