import React from 'react'

// Styles
import styles from './index.module.scss'

// Images
import logo from '../../../assets/images/logo.png'

// language switcher
import { SelectLanguage } from '../SelectLanguage'

// Traduction
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const AuthWrapper = ({children}) => {
    const {t} = useTranslation()

    return (
        <div className={styles.auth}>
            <div className={styles.authContent}>
                <div className={styles.authLogo}>
                    <img className={styles.authLogoImg} src={logo} alt='logo'/>
                    <div className={styles.appBtns}>
                        <div>
                            <a href='https://play.google.com/store/apps/details?id=fr.theifc.IFC&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' rel={'noreferrer'} target={'_blank'}>
                                <img
                                className={styles.playStore}
                                alt='Get it on Google Play' 
                                src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png' />
                            </a>
                        </div>
                        <div>
                            <a href="https://apps.apple.com/fr/app/ifc/id1528775843?itsct=apps_box_badge&itscg=30200" rel={'noreferrer'} target={'_blank'}>
                                <img 
                                className={styles.appStore}
                                src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1276560000&h=7e7b68fad19738b5649a1bfb78ff46e9" 
                                alt="Download on the App Store" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles.authInfo}>
                    {t('conditionD')} 
                    <Link to={'/cgu'}><u>{t('conditionM')}</u></Link>
                    {t('conditionT')} 
                    <Link to={'/politique-de-confidentialite'}><u>{t('conditionF')}</u></Link>.
                </div >
                {children}
                <div className={styles.authInfoMobile}>
                    {t('conditionD')} 
                    <Link to={'/cgu'}><u>{t('conditionM')}</u></Link>
                    {t('conditionT')} 
                    <Link to={'/politique-de-confidentialite'}><u>{t('conditionF')}</u></Link>.
                </div>
            </div>
            <div className={styles.changeLanguage}>
                <SelectLanguage />
            </div>
        </div>
    )
}
