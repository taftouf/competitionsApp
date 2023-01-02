import React, { useEffect, useState } from 'react'

// Styles
import styles from './index.module.scss'

// Components
import { Select } from '../../ui/Select'
import { Loader } from '../../ui/Loader'
import { CompetitionMatch } from '../../ui/ExactCompetitionUI/CompetitionMatch'
import { Tabs } from '../../ui/Tabs/Tabs'
import { useSelector } from 'react-redux'
import { CompetitionAdminMatch } from '../../ui/ExactCompetitionUI/CompetitionAdminMatch'

import { useTranslation } from 'react-i18next'
import { fetchData } from '../../utils/fetchData'
import { useSearchParams } from 'react-router-dom'


export const TourneyCalendar = ({id, type, groupsRounds, finalsRounds, finalsOnly, teams, isTourneyAdmin}) => {
    const {t} = useTranslation()
    const isAdmin = useSelector(state => state.user.isAdmin )?useSelector(state => state.user.isAdmin ):isTourneyAdmin 
    const userTeams = useSelector(state => state.teams.teams)
    const [searchParams] = useSearchParams()

    const [filterValue, setFilterValue] = useState('')
    const [filterItems, setFilterItems] = useState([])
    const [stage, setStage] = useState('groups')
    const [games, setGames] = useState([])
    const [exactGames, setExactGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeGameID, setActiveGameID] = useState(null)

    const [tabsData, setTabsData] = useState([])

    const goNext = () => {
        exactGames.forEach((game, idx) => {
            if (game.id === activeGameID) {
                if (exactGames[idx + 1]) setActiveGameID(exactGames[idx + 1].id)
                else setActiveGameID(exactGames[0].id)
            }
        })
    }

    const goPrevious = () => {
        exactGames.forEach((game, idx) => {
            if (game.id === activeGameID) {
                if (exactGames[idx - 1]) setActiveGameID(exactGames[idx - 1].id)
                else setActiveGameID(exactGames[exactGames.length - 1].id)
            }
        })
    }

    useEffect(() => {
        if (!finalsOnly) {
            const tempItems = []

            if (stage === 'groups') {
                groupsRounds.forEach((round, idx) => {
                    tempItems.push({
                        id: idx,
                        name: round,
                        value: round,
                    })
                })
            } else {
                finalsRounds.forEach((round, idx) => {
                    tempItems.push({
                        id: idx,
                        name: round,
                        value: round,
                    })
                })
            }

            setFilterItems([...tempItems])
        }
    }, [stage])

    useEffect(() => {
        if (finalsOnly) {
            const tempTabs = []

            finalsRounds.forEach((round, idx) => {
                tempTabs.push({
                    id: idx + 1,
                    name: round,
                    value: round,
                })
            })

            setTabsData([...tempTabs])
        } else {
            setTabsData([
                {
                    id: 1,
                    name: 'phasedegroupe',
                    value: 'groups',
                },
                {
                    id: 2,
                    name: 'phaseFinale',
                    value: 'finals',
                },
            ])
        }
    }, [])

    useEffect(() => {
        if (searchParams.get('gameID') && exactGames.length > 0) {
            setActiveGameID(+searchParams.get('gameID'))
            setFilterValue(searchParams.get('filterValue'))
        }
    }, [searchParams, exactGames])

    const getGames = async () => {
        setLoading(true)
        const res = await fetchData(`/api/v4/competitions/${type}/tournaments/${id}/games?stage=${finalsOnly ? 'finals' : stage}&section=${filterValue}`)
        const data = await res.json()

        const tempGames = []
        const tempExactGames = []

        data.games.forEach(game => {
            tempGames.push(game)
            game.games.forEach(exactGame => tempExactGames.push(exactGame))
        })

        setGames([...tempGames])
        setExactGames([...tempExactGames])
        setLoading(false)
    }

    useEffect(() => {
        if (filterValue) getGames()
    }, [filterValue, stage])

    return (
        <div className={styles.tourneyCalendar}>
            {
                ((finalsOnly || filterItems.length > 0) && !activeGameID) ? (<>
                    {
                        tabsData.length > 0 && (
                            <div className={styles.tourneyTabsWrap}>
                                <Tabs initTabs={tabsData} setActiveTab={finalsOnly ? setFilterValue : setStage} high/>
                            </div>
                        )
                    }
                    {
                        !finalsOnly && (
                            <div className={styles.tourneyCalendarFilterWrap}>
                                <Select values={filterItems} initValue={filterValue} setNewValue={setFilterValue}/>
                            </div>
                        )
                    }
                    <div className={styles.tourneyCalendarGames}>
                        {
                            !loading ? (
                                games.length > 0 ? games.map((game, idx) => (
                                    <div className={styles.tourneyGameWrap} key={idx}>
                                        <div className={styles.tourneyGameName}>
                                            {game.name}
                                        </div>
                                        {
                                            game.games.map(exactGame => (
                                                <CompetitionMatch
                                                    flag={true}
                                                    data={exactGame}
                                                    key={exactGame.id}
                                                    competitionID={id}
                                                    type={type}
                                                    round={filterValue}
                                                    competitionType={'tournament'}
                                                    isAdmin={isAdmin}
                                                    setActiveGameID={setActiveGameID}
                                                    userTeams={userTeams}
                                                    havePermissions={userTeams.find(team =>
                                                        (team.id === exactGame.home?.id
                                                        || team.id === exactGame.visitors?.id)
                                                        && (team.player.role.value === 'captain' || team.player.role.value === 'subcaptain')
                                                    )}
                                                />
                                            ))
                                        }
                                    </div>
                                )) : <div className={'empty-block'}>{t('noGames')}</div>
                            ) : <Loader/>
                        }
                    </div>
                </>) : (<>
                    {
                        exactGames.filter(game => game.id === activeGameID)[0] ? (
                            <CompetitionAdminMatch
                                data={exactGames.filter(game => game.id === activeGameID)[0]}
                                goBack={() => setActiveGameID(null)}
                                goNext={goNext}
                                goPrevious={goPrevious}
                                exactGames={exactGames}
                                isCompetitionAdmin={isAdmin}
                                competitionType={'tournament'}
                                round={filterValue}
                                competitionID={id}
                                type={type}
                                updateData={getGames}
                                wrap
                                teams={teams}
                                userTeams={userTeams}
                                havePermissions={userTeams.find(team =>
                                    (team.id === exactGames.filter(game => game.id === activeGameID)[0].home.id
                                        || team.id === exactGames.filter(game => game.id === activeGameID)[0].visitors.id)
                                    && (team.player.role.value === 'captain' || team.player.role.value === 'subcaptain')
                                )}
                            />
                        ) : <Loader />
                    }
                </>)
            }
        </div>
    )
}
