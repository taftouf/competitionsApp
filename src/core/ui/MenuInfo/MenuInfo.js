import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Components
import { SvgSprite } from '../SvgSprite/SvgSprite'
import { MenuInfoBadges } from './MenuInfoBadges'
import { MenuInfoMore } from './MenuInfoMore'

import { useTranslation } from 'react-i18next'

export const MenuInfo = ({content, setContent, menuInfo, data, template}) => {
    const {t} = useTranslation()

    return (
        <ul className={styles.menuInfo}>
            {
                menuInfo.map(menuItem => {
                    if (menuItem.type === 'tab') {
                        return (
                            <li
                                className={cn(styles.menuInfoItem, styles.menuInfoItemStandard, {
                                    [styles.menuInfoItemActive]: menuItem.content === content,
                                })}
                                key={menuItem.id}
                                onClick={() => setContent(menuItem.content)}
                            >
                                <SvgSprite spriteID={menuItem.icon}/>
                                {t(menuItem.content)}
                            </li>
                        )
                    }
                    if (menuItem.type === 'info') {
                        return <MenuInfoMore
                            menuItem={menuItem}
                            content={content}
                            key={menuItem.id}
                            team={data}
                            template={template}
                            isActive={menuItem.active}
                        />
                    }
                    if (menuItem.type === 'badges') {
                        return <MenuInfoBadges
                            menuItem={menuItem}
                            content={content}
                            key={menuItem.id}
                            id={data.id}
                        />
                    }
                })
            }
        </ul>
    )
}
