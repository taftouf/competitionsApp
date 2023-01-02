import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Utils
import { deleteCookie } from '../../utils/cookie'

// Slices
import { setLoadedData } from '../../../store/slices/loadedDataSlice'

// Styles
import styles from './index.module.scss'

// Components
import { HeaderMenuItem } from './HeaderMenuItem'
import { Btn } from '../Btn'
import { HeaderSessions } from './HeaderSessions'

import { useTranslation } from 'react-i18next'
import { fetchData } from '../../utils/fetchData'
import { setIsAuth } from '../../../store/slices/userSlice'

export const HeaderMenu = ({setSessions, sessions, openPopup}) => {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.user.userInfo)

    const {t} = useTranslation()
    const logout = async () => {
        const res = await fetchData(`/auth/v3/logout`, {
            method: 'DELETE',
        })

        dispatch(setLoadedData(false))
        if (res.ok) {
            deleteCookie('refresh_token')
            deleteCookie('access_token')
            dispatch(setIsAuth(false))
        }
    }

    return (
        <div className={styles.headerMenu}>
            <ul className={styles.headerMenuList}>
                <HeaderMenuItem icon={'user'} title={`${userInfo.first_name} ${userInfo.last_name}`} user={userInfo}/>
                <HeaderMenuItem icon={'settings'} title={t('helpAndSupport')}>
                    <a className={styles.headerMenuSubItem} href={'/cgu'} rel={'noreferrer'}
                       target={'_blank'}>
                        {t('termsOfUse')}
                    </a>
                    <a className={styles.headerMenuSubItem} href={'/politique-de-confidentialite'}
                       rel={'noreferrer'} target={'_blank'}>
                        {t('privacyPolicy')}
                    </a>
                    <a className={styles.headerMenuSubItem} href='mailto:contact@the-ifc.fr'>
                        {t('contactUs')}
                    </a>
                </HeaderMenuItem>
                <HeaderMenuItem icon={'secure'} title={t('security')}>
                    <Btn className={styles.headerMenuSubItem} onClick={openPopup}>
                        {t('changePassword')}
                    </Btn>
                    <HeaderSessions setSessions={setSessions} sessions={sessions}/>
                </HeaderMenuItem>
            </ul>
            <Btn className={styles.headerMenuLogout} type={'button'} onClick={logout}>
                {t('logout')}
            </Btn>
        </div>
    )
}
