import React from 'react'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'

// Styles
import styles from './index.module.scss'

import { useTranslation } from 'react-i18next'

export const DiscoverNav = () => {
    const {t} = useTranslation()

    return (
        <div className={styles.discoverNav}>
            <NavLink
                to={'/discover-menu'}
                className={({isActive}) => cn(styles.discoverNavLink, {
                    [styles.discoverNavLinkActive]: isActive,
                })}
            >
                {t("yourCompetitions")}
            </NavLink>
            <NavLink
                to={'/discover'}
                className={({isActive}) => cn(styles.discoverNavLink, {
                    [styles.discoverNavLinkActive]: isActive,
                })}
            >
                {t("discover")}
            </NavLink>
        </div>
    )
}
