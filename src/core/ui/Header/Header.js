import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'


// Styles
import styles from './index.module.scss'

// Images
import logo from '../../../assets/images/logo.png'

// Hooks
import { useMobile } from '../../hooks/useMobile'

// Components
import { Btn } from '../Btn'
// import { SvgSprite } from '../SvgSprite/SvgSprite'
import { HeaderUser } from './HeaderUser'
//import { HeaderSearch } from './HeaderSearch'
import { HeaderBurger } from './HeaderBurger'
import { Popup } from '../Popup'
import { CreerPopup } from './CreerPopup'

import { useTranslation } from 'react-i18next'

import { SelectLanguage } from '../SelectLanguage'

export const Header = () => {

    const isMobile = useMobile(501)
    const {t} = useTranslation()
    const [creer, setCreer] = useState(false)
    const isSmallMobile = useMobile(330)
    return (<>
            <header className={styles.header}>
                <div className={styles.headerBox}>
                    <Link className={cn(styles.headerLogo,{
                        [styles.headerLogoMobile]: isSmallMobile,
                    })} to={'/dashboard'}>
                        <img className={styles.headerLogoImg} src={logo} alt={'logo'}/>
                    </Link>
                    {/*
                <HeaderSearch />
                */}
                    {
                        isMobile && <HeaderBurger/>
                    }
                </div>

                <div className={styles.headerBox}>
                    <div className={styles.switchLen}>
                        <SelectLanguage/>
                    </div>

                    <Btn className={styles.headerCreate} onClick={() => setCreer(true)}>
                        + {t('create')}
                    </Btn>
                    {/* <Link className={cn(styles.headerMoney,{
                    [styles.headerMoneyMobile] : isMobile,})} to={'/money'}>
                        <SvgSprite spriteID={'coins'}/>
                    </Link> */}

                    <HeaderUser/>
                </div>
            </header>
            <Popup isOpenedPopup={creer} closePopup={() => setCreer()}>
                <CreerPopup setCreer={setCreer}/>
            </Popup>
        </>
    )
}
