import React, { useEffect, useState } from 'react'

// Styles
import styles from './index.module.scss'

// Components
import { Tabs } from '../../Tabs/Tabs'
import { Select } from '../../Select'
import { OrgItem } from '../../OrgItem'

import { useTranslation } from 'react-i18next'

export const DiscoverContent = ({setCompetitions, competitionsFull, competitions}) => {
    const [filterValue, setFilterValue] = useState('future')
    const [activeType, setActiveType] = useState('tournament')

    const {t} = useTranslation()
    
    useEffect(() => {
        setCompetitions(competitionsFull.filter(competition =>
            competition.status === filterValue &&
            competition.type === activeType))
    }, [filterValue, activeType, competitionsFull])

    return (
        <div className={styles.discoverContent}>
            <div className={styles.discoverTabsWrap}>
                <Tabs setActiveTab={setActiveType}/>
            </div>
            <div className={styles.discoverFilterWrap}>
                <Select setNewValue={setFilterValue}/>
            </div>
            {
                competitions.length > 0 ? (<>
                    <div className={styles.discoverList}>
                        {
                            competitions.map(follow => (
                                <div className={styles.discoverItem} key={follow.id}>
                                    <OrgItem
                                        to={activeType === 'tournament' ? `/competitions/${follow.mode}/tournament/${follow.id}` : `/competitions/${follow.mode}/league/${follow.id}`}
                                        data={follow}
                                        big
                                    />
                                </div>
                            ))
                        }
                    </div>
                </>) : (
                    <div className={'empty-block'}>
                        {t("NoSubscription")}
                    </div>
                )
            }
        </div>
    )
}
