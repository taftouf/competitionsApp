import React, { useEffect, useRef, useState } from 'react'

// Styles
import styles from './index.module.scss'

// Components
import { Tabs } from '../../Tabs/Tabs'
import { Loader } from '../../Loader'
import { CompetitionRanksGeneral } from './CompetitionRanksGeneral'
import { CompetitionRanksGoals } from './CompetitionRanksGoals'
import { CompetitionRanksPasses } from './CompetitionRanksPasses'
import { CompetitionRanksCleansheets } from './CompetitionRanksCleansheets'
import { CompetitionRanksRating } from './CompetitionRanksRating'
import { Select } from '../../Select'
import { fetchData } from '../../../utils/fetchData'

export const CompetitionRanks = ({id, type, competitionType, withGroup, rounds}) => {
    const [content, setContent] = useState(rounds.length > 0 ? 'general' : 'goals')
    const [loading, setLoading] = useState(true)
    const [filterItems, setFilterItems] = useState([])
    const [filterValue, setFilterValue] = useState(rounds && rounds[0])

    const [ranking, setRanking] = useState([])
    const [goals, setGoals] = useState([])
    const [passes, setPasses] = useState([])
    const [cleansheets, setCleansheets] = useState([])
    const [rating, setRating] = useState([])

    const tabsData = useRef([
        {
            id: 1,
            name: 'general',
            value: 'general',
            hide: rounds.length === 0,
        },
        {
            id: 2,
            name: 'goals',
            value: 'goals',
        },
        {
            id: 3,
            name: 'assists',
            value: 'passes',
        },
        {
            id: 4,
            name: 'cleansheets',
            value: 'cleansheets',
        },
        {
            id: 5,
            name: 'ratings',
            value: 'ratings',
        },
    ])

    useEffect(() => {
        if (withGroup && rounds) {
            const tempItems = []

            rounds.forEach((round, idx) => {
                tempItems.push({
                    id: idx,
                    name: round,
                    value: round,
                })
            })

            setFilterItems([...tempItems])
        }
    }, [rounds])

    const getRanking = async () => {
        const res = await fetchData(`/api/v4/competitions/${type}/${competitionType}/${id}/ranking`)

        const data = await res.json()

        setRanking([...data.ranking])
    }

    const getRankingWithGroup = async () => {
        const res = await fetchData(`/api/v4/competitions/${type}/${competitionType}/${id}/ranking?group=${filterValue}`)

        const data = await res.json()

        setRanking([...data.ranking])
    }

    const getGoals = async () => {
        const res = await fetchData(`/api/v4/competitions/${type}/${competitionType}/${id}/stats/ranking?stat=goals`)

        const data = await res.json()

        setGoals([...data.ranking])
    }

    const getPasses = async () => {
        const res = await fetchData(`/api/v4/competitions/${type}/${competitionType}/${id}/stats/ranking?stat=assists`)

        const data = await res.json()

        setPasses([...data.ranking])
    }

    const getCleansheets = async () => {
        const res = await fetchData(`/api/v4/competitions/${type}/${competitionType}/${id}/stats/ranking?stat=clean_sheet`)

        const data = await res.json()

        setCleansheets([...data.ranking])
    }

    const getRating = async () => {
        const res = await fetchData(`/api/v4/competitions/${type}/${competitionType}/${id}/stats/ranking?stat=rating`)

        const data = await res.json()

        setRating([...data.ranking])
    }

    useEffect(() => {
        if (withGroup) {
            (async () => {
                setLoading(true)
                await getRankingWithGroup()
                setLoading(false)
            })()
        }
    }, [filterValue])

    useEffect(() => {
        (async () => {
            await Promise.all([
                !withGroup && getRanking(),
                withGroup && getRankingWithGroup(),
                type === 'squad' && getGoals(),
                type === 'squad' && getPasses(),
                type === 'squad' && getCleansheets(),
                type === 'squad' && getRating(),
            ])

            setLoading(false)
        })()
    }, [])

    return (
        <div className={styles.ranks}>
            {
                type === 'squad' && (
                    <div className={styles.ranksTabs}>
                        <Tabs initTabs={tabsData.current} setActiveTab={setContent} high />
                    </div>
                )
            }
            {
                withGroup && filterItems.length > 0 && content === 'general' && (
                    <div className={styles.ranksFilterWrap}>
                        <Select values={filterItems} setNewValue={setFilterValue} />
                    </div>
                )
            }
            {
                !loading ? (
                    <div className={styles.ranksContent}>
                        {
                            content === 'general' && (
                                ranking.length > 0 ? ranking.map((item, idx) => (
                                    <CompetitionRanksGeneral general={true} data={item} key={item.id || idx} idx={idx} />
                                )) : <div className={'empty-block'}>Vide</div>
                            )
                        }
                        {
                            content === 'goals' && (
                                goals.length > 0 ? goals.map((item, idx) => (
                                    <CompetitionRanksGoals data={item} key={item.id || idx} idx={idx} />
                                )) : <div className={'empty-block'}>Vide</div>
                            )
                        }
                        {
                            content === 'passes' && (
                                passes.length > 0 ? passes.map((item, idx) => (
                                    <CompetitionRanksPasses data={item} key={item.id || idx} idx={idx} />
                                )) : <div className={'empty-block'}>Vide</div>
                            )
                        }
                        {
                            content === 'cleansheets' && (
                                cleansheets.length > 0 ? cleansheets.map((item, idx) => (
                                    <CompetitionRanksCleansheets data={item} key={item.id || idx} idx={idx} />
                                )) : <div className={'empty-block'}>Vide</div>
                            )
                        }
                        {
                            content === 'ratings' && (
                                rating.length > 0 ? rating.map((item, idx) => (
                                    <CompetitionRanksRating data={item} key={item.id || idx} idx={idx} />
                                )) : <div className={'empty-block'}>Vide</div>
                            )
                        }
                    </div>
                ) : <Loader />
            }
        </div>
    )
}
