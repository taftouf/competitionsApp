import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Components
import { Checkbox } from '../../Checkbox'
import { Select } from '../../Select'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

export const CreateCompetitionContentStep2 = ({data, setResult, setNextStep, isLeague}) => {
    const [isDirect, setIsDirect] = useState(false)
    const [returnGamesGroups, setReturnGamesGroups] = useState(false)
    const [returnGamesFinals, setReturnGamesFinals] = useState(false)
    const [returnGames, setReturnGames] = useState(false)
    const [thirdPlaceGame, setThirdPlaceGame] = useState(false)
    const [teamsCount, setTeamsCount] = useState(null)
    const [groupsCount, setGroupsCount] = useState(null)
    const [playersCount, setPlayersCount] = useState(null)
    const [minutesBetween, setMinutesBetween] = useState(null)
    const [platform, setPlatform] = useState(null)
    const editions = useRef(useSelector(state => state.editions.editions))
    const [edition, setEdition] = useState(null)
    
    const {t} = useTranslation()

    const teamsCountItems = useRef( isLeague ?[
        {
            id: 1,
            name: '4 ' + t('teams'),
            value: 4,
        },
        {
            id: 2,
            name: '6 ' + t('teams'),
            value: 6,
        },
        {
            id: 3,
            name: '8 ' + t('teams'),
            value: 8,
        },
        {
            id: 4,
            name: '12 ' + t('teams'),
            value: 12,
        },
        {
            id: 5,
            name: '16 ' + t('teams'),
            value: 16,
        },
        {
            id: 6,
            name: '20 ' + t('teams'),
            value: 20,
        },
        {
            id: 7,
            name: '24 ' + t('teams'),
            value: 24,
        },
        {
            id: 8,
            name: '32 ' + t('teams'),
            value: 32,
        },
        {
            id: 9,
            name: '40 ' + t('teams'),
            value: 40,
        },
        {
            id: 10,
            name: '64 ' + t('teams'),
            value: 64,
        },
        {
            id: 11,
            name: '128 ' + t('teams'),
            value: 128,
        },
    ]:[
        {
            id: 1,
            name: '6 ' + t('teams'),
            value: 6,
        },
        {
            id: 2,
            name: '8 ' + t('teams'),
            value: 8,
        },
        {
            id: 3,
            name: '12 ' + t('teams'),
            value: 12,
        },
        {
            id: 4,
            name: '16 ' + t('teams'),
            value: 16,
        },
        {
            id: 5,
            name: '20 ' + t('teams'),
            value: 20,
        },
        {
            id: 6,
            name: '24 ' + t('teams'),
            value: 24,
        },
        {
            id: 7,
            name: '32 ' + t('teams'),
            value: 32,
        },
        {
            id: 8,
            name: '40 ' + t('teams'),
            value: 40,
        },
        {
            id: 9,
            name: '64 ' + t('teams'),
            value: 64,
        },
        {
            id: 10,
            name: '128 ' + t('teams'),
            value: 128,
        },
    ])
    const groupsCountItems = useRef([
        {
            id: 1,
            name: '2 ' + t('groups'),
            value: 2,
        },
        {
            id: 2,
            name: '3 ' + t('groups'),
            value: 3,
        },
        {
            id: 3,
            name: '4 ' + t('groups'),
            value: 4,
        },
        {
            id: 4,
            name: '6 ' + t('groups'),
            value: 6,
        },
        {
            id: 5,
            name: '8 ' + t('groups'),
            value: 8,
        },
        {
            id: 6,
            name: '16 ' + t('groups'),
            value: 16,
        },
    ])
    const playersCountItems = useRef([
        {
            id: 1,
            name: '1 ' + t('perGroup'),
            value: 1,
        },
        {
            id: 2,
            name: '2 ' + t('perGroup'),
            value: 2,
        },
        {
            id: 3,
            name: '4 ' + t('perGroup'),
            value: 4,
        },
        {
            id: 4,
            name: '8 ' + t('perGroup'),
            value: 8,
        },
    ])
    const minutesBetweenItems = useRef([
        {
            id: 1,
            name: '1 ' + t('day'),
            value: 1,
        },
        {
            id: 2,
            name: '2 ' + t('days'),
            value: 2,
        },
        {
            id: 3,
            name: '3 ' + t('days'),
            value: 3,
        },
        {
            id: 4,
            name: '4 ' + t('days'),
            value: 4,
        },
        {
            id: 5,
            name: '5 ' + t('days'),
            value: 5,
        },
        {
            id: 6,
            name: '6 ' + t('days'),
            value: 6,
        },
        {
            id: 7,
            name: '7 ' + t('days'),
            value: 7,
        },
        {
            id: 8,
            name: '8 ' + t('days'),
            value: 8,
        },
        {
            id: 9,
            name: '9 ' + t('days'),
            value: 9,
        },
        {
            id: 10,
            name: '10 ' + t('days'),
            value: 10,
        },
    ])

    const platformItems = useRef([
        {
            id: 1,
            name: t('Ps5'),
            value: 'ps5',
        },
        {
            id: 2,
            name: t('Ps4'),
            value: 'ps4',
        },
        {
            id: 3,
            name: t('Xbox'),
            value: 'xbox',
        },
        {
            id: 4,
            name: t('Pc'),
            value: 'pc',
        },
    ])

    useEffect(() => {
        setResult({
            available_spots: teamsCount,
            number_of_groups: isDirect ? 0 : groupsCount,
            qualified_per_group: isDirect ? 0 : playersCount,
            return_games: returnGames,
            return_games_groups: returnGamesGroups,
            return_games_finals: returnGamesFinals,
            minutes_between_rounds: minutesBetween,
            third_place_game: thirdPlaceGame,
            is_direct: isDirect,
            platform : platform,
            game_edition_id : edition
        })
    }, [isDirect, returnGamesGroups, returnGamesFinals, thirdPlaceGame, teamsCount, groupsCount, playersCount, minutesBetween, returnGames, platform, edition])

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            setTeamsCount(data.available_spots)
            setGroupsCount(data.number_of_groups)
            setPlayersCount(data.qualified_per_group)
            setReturnGamesGroups(data.return_games_groups)
            setReturnGamesFinals(data.return_games_finals)
            setReturnGames(data.return_games)
            setMinutesBetween(data.minutes_between_rounds)
            setThirdPlaceGame(data.third_place_game)
            setIsDirect(data.is_direct)
            setPlatform(data.platform)
            setEdition(data.game_edition_id)
        }
    }, [])
    
    return (<>
        <div className={styles.createInner}>
            {
                !isLeague && (
                    <div
                        className={cn(styles.createItem, styles.createItemToggle)}
                        onClick={() => setIsDirect(!isDirect)}
                    >
                        <span>{t('knockout')}</span>
                        <Checkbox
                            initValue={isDirect}
                            disableClick
                            toggle
                        />
                    </div>
                )
            }
            <Select
                className={cn(styles.createItem, styles.createItemSelect)}
                initValue={teamsCount}
                values={teamsCountItems.current}
                setNewValue={setTeamsCount}
                text={t('numberOfTeams')}
            />
            {
                !isDirect && !isLeague && (<>
                    <Select
                        className={cn(styles.createItem, styles.createItemSelect)}
                        initValue={groupsCount}
                        values={groupsCountItems.current}
                        setNewValue={setGroupsCount}
                        text={t('numberOfGroups')}
                    />
                    <Select
                        className={cn(styles.createItem, styles.createItemSelect)}
                        initValue={playersCount}
                        values={playersCountItems.current}
                        setNewValue={setPlayersCount}
                        text={t('NumberOfQualifiedPersonsPerGroup')}
                    />
                </>)
            }
            {
                !isLeague && (<>
                    <div
                        className={cn(styles.createItem, styles.createItemToggle)}
                        onClick={() => setReturnGamesGroups(!returnGamesGroups)}
                    >
                        <span>{t('homeAwayGroups')}</span>
                        <Checkbox
                            initValue={returnGamesGroups}
                            disableClick
                            toggle
                        />
                    </div>
                    <div
                        className={cn(styles.createItem, styles.createItemToggle)}
                        onClick={() => setReturnGamesFinals(!returnGamesFinals)}
                    >
                        <span>{t('homeAwayFinals')}</span>
                        <Checkbox
                            initValue={returnGamesFinals}
                            disableClick
                            toggle
                        />
                    </div>
                </>)
            }
            {
                isLeague && (<>
                    <Select
                        className={cn(styles.createItem, styles.createItemSelect)}
                        initValue={minutesBetween}
                        values={minutesBetweenItems.current}
                        setNewValue={setMinutesBetween}
                        text={t('timeBetweenGames')}
                    />
                    <div
                        className={cn(styles.createItem, styles.createItemToggle)}
                        onClick={() => setReturnGames(!returnGames)}
                    >
                        <span>{t('homeAwayGames')}</span>
                        <Checkbox
                            initValue={returnGames}
                            disableClick
                            toggle
                        />
                    </div>
                </>)
            }
            {
                !isLeague && (
                    <div
                        className={cn(styles.createItem, styles.createItemToggle)}
                        onClick={() => setThirdPlaceGame(!thirdPlaceGame)}
                    >
                        <span>{t('thirdPositionGame')}</span>
                        <Checkbox
                            initValue={thirdPlaceGame}
                            disableClick
                            toggle
                        />
                    </div>
                )
            }
            <Select
                className={cn(styles.createItem, styles.createItemSelect)}
                initValue={platform}
                values={platformItems.current}
                setNewValue={setPlatform}
                text={t('platform')}
            />
            <Select
                className={cn(styles.createItem, styles.createItemSelect)}
                initValue={edition}
                values={editions.current}
                setNewValue={setEdition}
                text={t('edition')}
            />
    
             
            {
                isLeague && (
                    <div className={styles.createText}>
                        {t('gamesDate')}
                    </div>
                )
            }
        </div>
        <button className={styles.createBtn} onClick={setNextStep}>
            {t('next')}
        </button>
    </>)
}
