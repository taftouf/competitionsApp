import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { badgesInfo } from '../../staticData/badges'

// Hooks
import { useToggle } from '../../hooks/useToggle'

// Styles
import styles from './index.module.scss'

// Components
import { SvgSprite } from '../SvgSprite/SvgSprite'

import { useTranslation } from 'react-i18next'
import { fetchData } from '../../utils/fetchData'

export const MenuInfoBadges = ({menuItem, id, content}) => {
    const {isOpened, toggleIsOpened} = useToggle()
    const [fullBadges, setFullBadges] = useState([])
    const [activeBadges, setActiveBadges] = useState([])
    const [step, setStep] = useState(1)
    const [badges, setBadges] = useState({})

    const [nextStep, setNextStep] = useState(false)
    const [prevStep, setPrevStep] = useState(false)

    const goDown = () => setStep(prevState => prevState + 1)
    const goUp = () => setStep(prevState => prevState - 1)

    const {t} = useTranslation()

    useEffect(() => {
        if (isOpened) toggleIsOpened()
    }, [content])


    useEffect(() => {
        (async () => {
            const res = await fetchData(`/api/v3/teams/${id}/statistics`)
            const data = await res.json()

            setBadges(data.stats)
        })()
    }, [])

    useEffect(() => {
        setFullBadges([...badgesInfo])
        setActiveBadges([...badgesInfo].slice(step * 3 - 3, step * 3))
    }, [])

    useEffect(() => {
        if (fullBadges.length > 0) {
            if (step * 3 >= fullBadges.length) {
                setNextStep(false)
                setPrevStep(true)
            } else if (step * 3 > fullBadges.length) {
                setNextStep(true)
                setPrevStep(true)
            } else {
                setNextStep(true)
                setPrevStep(false)
            }

            setActiveBadges([...fullBadges].slice(step * 3 - 3, step * 3))
        }
    }, [step, fullBadges])

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
                    <div className={cn(styles.menuInfoItemContent, styles.menuInfoItemContentLight)}>
                        {
                            prevStep && (
                                <div className={cn(styles.menuInfoItemArrow, styles.menuInfoItemArrowUp)} onClick={goUp}>
                                    <SvgSprite spriteID={'arrow'}/>
                                </div>
                            )
                        }
                        {
                            activeBadges.map(badgesCategory => (
                                <div className={styles.menuInfoBadgeCategory} key={badgesCategory.id}>
                                    <div className={styles.menuInfoBadgeCategoryName}>
                                        {t(badgesCategory.name)}
                                    </div>
                                    <ul className={styles.menuInfoBadgeCategoryList}>
                                        {
                                            badgesCategory.badges.map(badge => (
                                                <li className={cn(styles.menuInfoBadgeCategoryListItem, {
                                                    [styles.menuInfoBadgeCategoryListItemActive]:
                                                        badgesCategory.field === 'competitions_victories' ?
                                                            badges.league_victories + badges.tournament_victories >= badge.value :
                                                            badges[badgesCategory.field] >= badge.value
                                                    ,
                                                })} key={badge.id}>
                                                    {badge.value}
                                                    <span>{t(badge.name)}</span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            ))
                        }
                        {
                            nextStep && (
                                <div className={cn(styles.menuInfoItemArrow, styles.menuInfoItemArrowDown)} onClick={goDown}>
                                    <SvgSprite spriteID={'arrow'}/>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </li>
    )
}
