import React, { useEffect, useState } from 'react'
import {v4 as uuid} from 'uuid'

// Styles
import styles from './index.module.scss'

// Components
import { Tabs } from '../../Tabs/Tabs'
import { Select } from '../../Select'
import { CompetitionsSwiper } from './CompetitionsSwiper'

import { useTranslation } from 'react-i18next'
import cn from 'classnames'

export const Competitions = ({competitionsFull, template}) => {
    const {t} = useTranslation()

    const [competitions, setCompetitions] = useState([])
    const [filterValue, setFilterValue] = useState('future')
    const [activeType, setActiveType] = useState('tournament')

    useEffect(() => {
        if (competitionsFull.length > 0) {
            const tempArr = []

            competitionsFull
                .filter(competition =>
                    competition.status === filterValue &&
                    competition.type === activeType)
                .forEach(competition => {
                    const dateItemIndex = tempArr.findIndex(addedCompetition => addedCompetition.date === competition.start_date.date)

                    if (dateItemIndex === -1) {
                        tempArr.push({
                            date: competition.start_date.date,
                            utc: competition.start_date.utc,
                            id: uuid(),
                            competitions: [{...competition}]
                        })
                    } else {
                        tempArr[dateItemIndex].competitions.push({...competition})
                    }
                })
            setCompetitions([...tempArr.sort(
                (objA, objB) => new Date(objB.utc) - new Date(objA.utc),
            )])
        }
    }, [filterValue, activeType, competitionsFull])

    return (
        <div className={styles.competitions}>
            <div className={styles.competitionsTabsWrap}>
                <Tabs setActiveTab={setActiveType}/>
            </div>
            {
                !template && (
                    <div className={styles.competitionsFilterWrap}>
                        <Select setNewValue={setFilterValue}/>
                    </div>
                )
            }
            <div className={cn(styles.competitionsContent, {
                [styles.competitionsContentTemplate]: template,
            })}>
                {
                    competitions.length > 0 ? competitions.map(competition => (
                        <div className={styles.competitionsItem} key={competition.id}>
                            <div className={styles.competitionsItemDate}>
                                {competition.date}
                            </div>
                            <CompetitionsSwiper competitions={competition.competitions}/>
                        </div>
                    )) : (
                        <div className={'empty-block'}>
                            {t('noCompetition')}
                        </div>
                    )
                }
            </div>
        </div>
    )
}
