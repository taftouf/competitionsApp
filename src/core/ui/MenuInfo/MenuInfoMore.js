import React, { useEffect } from 'react'
import cn from 'classnames'

// Hooks
import { useToggle } from '../../hooks/useToggle'

// Styles
import styles from './index.module.scss'

// Components
import { SvgSprite } from '../SvgSprite/SvgSprite'

import { useTranslation } from 'react-i18next'

export const MenuInfoMore = ({menuItem, team, content, template, isActive}) => {
    const {t} = useTranslation()
    const {isOpened, toggleIsOpened} = useToggle(isActive)
    const date = new Date(team.created_at?.utc);
    useEffect(() => {
        if (isOpened) toggleIsOpened()
    }, [content])

    return (
        <li className={cn(styles.menuInfoItem, {
            [styles.menuInfoItemActive]: isOpened,
            [styles.menuInfoItemWithContent]: isOpened,
        })}>
            <div className={styles.menuInfoItemBtn} onClick={toggleIsOpened}>
                <SvgSprite spriteID={menuItem.icon}/>
                {t(menuItem.content)}
            </div>
            {
                isOpened && (
                    <div className={styles.menuInfoItemContent}>
                        <div className={styles.menuInfoItemContentTitle}>
                            {menuItem.text}
                        </div>
                        {
                            template && (
                                <div className={cn(styles.menuInfoMoreItem, styles.menuInfoMoreItemFlex)}>
                                    <div className={styles.menuInfoItemSubtitle}>
                                        {t('country')} :
                                    </div>
                                    <span>{team.country?.value}</span>
                                </div>
                            )
                        }
                        {
                            !template && (
                                <div className={styles.menuInfoMoreItem}>
                                    {t('foundationDate')}
                                    <span>{t("localisedDate", { date })}</span>
                                </div>
                            )
                        }
                        {
                            team.description && (
                                <div className={styles.menuInfoMoreItem}>
                                    {t('description')}
                                    <span>{team.description}</span>
                                </div>
                            )
                        }
                        {
                            (team.youtube || team.twitch || team.twitter || team.facebook || team.discord) && (
                                <div className={styles.menuInfoMoreItem}>
                                    {t('socialMedia')}
                                    <ul className={styles.menuInfoMoreSocials}>
                                        {
                                            team.youtube && (
                                                <li className={styles.menuInfoMoreSocialsItem}>
                                                    <a
                                                        className={styles.menuInfoMoreSocialsLink}
                                                        href={team.youtube}
                                                        rel={'noreferrer'}
                                                        target={'_blank'}
                                                    >
                                                        <SvgSprite spriteID={'youtube'}/>
                                                    </a>
                                                </li>
                                            )
                                        }
                                        {
                                            team.twitch && (
                                                <li className={styles.menuInfoMoreSocialsItem}>
                                                    <a
                                                        className={styles.menuInfoMoreSocialsLink}
                                                        href={team.twitch}
                                                        rel={'noreferrer'}
                                                        target={'_blank'}
                                                    >
                                                        <SvgSprite spriteID={'twitch'}/>
                                                    </a>
                                                </li>
                                            )
                                        }
                                        {
                                            team.twitter && (
                                                <li className={styles.menuInfoMoreSocialsItem}>
                                                    <a
                                                        className={styles.menuInfoMoreSocialsLink}
                                                        href={team.twitter}
                                                        rel={'noreferrer'}
                                                        target={'_blank'}
                                                    >
                                                        <SvgSprite spriteID={'twitter'}/>
                                                    </a>
                                                </li>
                                            )
                                        }
                                        {
                                            team.facebook && (
                                                <li className={styles.menuInfoMoreSocialsItem}>
                                                    <a
                                                        className={styles.menuInfoMoreSocialsLink}
                                                        href={team.facebook}
                                                        rel={'noreferrer'}
                                                        target={'_blank'}
                                                    >
                                                        <SvgSprite spriteID={'facebook'}/>
                                                    </a>
                                                </li>
                                            )
                                        }
                                        {
                                            team.discord && (
                                                <li className={styles.menuInfoMoreSocialsItem}>
                                                    <a
                                                        className={styles.menuInfoMoreSocialsLink}
                                                        href={team.discord}
                                                        rel={'noreferrer'}
                                                        target={'_blank'}
                                                    >
                                                        <SvgSprite spriteID={'discord'}/>
                                                    </a>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </li>
    )
}
