import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

// Styles
import styles from './index.module.scss'

// Components
import { Tabs } from '../../Tabs/Tabs'
import { Select } from '../../Select'
import { OrgItem } from '../../OrgItem'
import { SvgSprite } from '../../SvgSprite/SvgSprite'

import { useTranslation } from 'react-i18next'
import i18n from 'i18next'
import { Loader } from '../../Loader'

export const CompetitionsInfoItem = ({
                                         setCompetitions,
                                         competitionsFull,
                                         competitions,
                                         title,
                                         withoutRadius,
                                         toggleIsOpened,
                                         isOpened,
                                         limit,
                                         offset,
                                         setOffset,
                                         update,
                                         setUpdate
                                     }) => {
    const [filterValue, setFilterValue] = useState('future')
    const [filterName, setFilterName] = useState('À venir')
    const [activeType, setActiveType] = useState('tournament')
    const [show, setShow] = useState(false)
    const {t} = useTranslation()

    const voirPlus = ()=>{
        setOffset(offset+7)
        setShow(true)
    }
    useEffect(() => {
        setCompetitions(competitionsFull.filter(competition =>
            competition.status === filterValue &&
            competition.type === activeType))
    }, [filterValue, activeType])

    useEffect(()=>{
        if(update){
            setCompetitions(competitionsFull.filter(competition =>
                competition.status === filterValue &&
                competition.type === activeType))
            setUpdate(false)
        }
        setShow(false)
    },[update])

    return (<>
        <div
            className={cn(styles.competitionsTitle, styles.competitionsTitleExpanded, {
                [styles.competitionsTitleWithoutRadius]: withoutRadius,
                [styles.competitionsTitleOpened]: isOpened,
            })}
            onClick={toggleIsOpened}
        >
            {title}
            <SvgSprite spriteID={'arrow'}/>
        </div>
        {
            isOpened && (<>
                <div className={styles.competitionsTabsWrap}>
                    <Tabs setActiveTab={setActiveType}/>
                </div>
                <div className={styles.competitionsWrap}>
                    <div className={styles.competitionsFilterWrap}>
                        <Select setNewValue={setFilterValue} setNewName={setFilterName}/>
                    </div>
                    {
                        competitions.length > 0 ? (<>
                            <div className={styles.competitionsList}>
                                {
                                    competitions.map(follow => (
                                        <div className={styles.competitionsItem} key={follow.id}>
                                            <OrgItem
                                                className={styles.competitionsItemInner}
                                                data={follow}
                                                withName
                                                to={follow.type === 'tournament' ? `/competitions/${follow.mode}/tournament/${follow.id}` : `/competitions/${follow.mode}/league/${follow.id}`}
                                            />
                                        </div>
                                    ))
                                }
                                {
                                    limit && (
                                        <Link to={'/discover'} className={styles.competitionsMore}>
                                            <div className={styles.competitionsMoreText}>  
                                                {t('viewAllProps')}{i18n.language === 'en' && t(filterName.toLowerCase())} {t(activeType+'Form')} {i18n.language != 'en' && t(filterName.toLowerCase())}
                                                <SvgSprite spriteID={'arrowNext'}/>
                                            </div>
                                        </Link>
                                    )
                                }
                            </div>
                            {
                                    !show && offset === competitions.length && competitions.length >= 7 ? (
                                        <div className={styles.voirPlus} onClick={voirPlus}>
                                            {t('voirPlus')}
                                        </div>
                                    ):show && <Loader />
                                }
                        </>) : (
                            <div className={'empty-block'}>
                                {t('NoSubscription')}
                            </div>
                        )
                    }
                </div>
            </>)
        }
    </>)
}
