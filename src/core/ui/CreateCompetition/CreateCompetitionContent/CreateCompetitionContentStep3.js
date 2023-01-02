import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Components
import { Checkbox } from '../../Checkbox'
import { Select } from '../../Select'
import { useTranslation } from 'react-i18next'

export const CreateCompetitionContentStep3 = ({setNextStep, data, setResult}) => {
    const [allRequired, setAllRequired] = useState(false)
    const [gkRequired, setGkRequired] = useState(false)
    const [lockRosters, setLockRosters] = useState(false)
    const [hasMinimumPlayers, setHasMinimumPlayers] = useState(false)
    const [minimumPlayers, setMinimumPlayers] = useState(null)
    const {t} = useTranslation()
    const minPlayersCountItems = useRef([
        {
            id: 1,
            name: '4 players',
            value: 4,
        },
        {
            id: 2,
            name: '5 players',
            value: 5,
        },
        {
            id: 3,
            name: '6 players',
            value: 6,
        },
        {
            id: 4,
            name: '7 players',
            value: 7,
        },
        {
            id: 5,
            name: '8 players',
            value: 8,
        },
        {
            id: 6,
            name: '9 players',
            value: 9,
        },
        {
            id: 7,
            name: '10 players',
            value: 10,
        },
        {
            id: 8,
            name: '11 players',
            value: 11,
        },
    ])

    useEffect(() => {
        setResult({
            all_required: allRequired,
            gk_required: gkRequired,
            lock_rosters: lockRosters,
            players_min: hasMinimumPlayers ? minimumPlayers : null,
            has_players_min: hasMinimumPlayers,
        })
    }, [allRequired, gkRequired, lockRosters, minimumPlayers, hasMinimumPlayers])

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            setAllRequired(data.all_required)
            setGkRequired(data.gk_required)
            setLockRosters(data.lock_rosters)
            setHasMinimumPlayers(data.has_players_min)
            setMinimumPlayers(data.players_min)
        }
    }, [])

    return (<>
        <div className={styles.createInner}>
            <div
                className={cn(styles.createItem, styles.createItemToggle)}
                onClick={() => setAllRequired(!allRequired)}
            >
                <span>{t('allRequired')}</span>
                <Checkbox
                    initValue={allRequired}
                    disableClick
                    toggle
                />
            </div>
            <div
                className={cn(styles.createItem, styles.createItemToggle)}
                onClick={() => setGkRequired(!gkRequired)}
            >
                <span>{t('gkRequired')}</span>
                <Checkbox
                    initValue={gkRequired}
                    disableClick
                    toggle
                />
            </div>
            <div
                className={cn(styles.createItem, styles.createItemToggle)}
                onClick={() => setLockRosters(!lockRosters)}
            >
                <span>{t('lockRosters')}</span>
                <Checkbox
                    initValue={lockRosters}
                    disableClick
                    toggle
                />
            </div>
            <div
                className={cn(styles.createItem, styles.createItemToggle)}
                onClick={() => setHasMinimumPlayers(!hasMinimumPlayers)}
            >
                <span>{t('playersMin')}</span>
                <Checkbox
                    initValue={hasMinimumPlayers}
                    disableClick
                    toggle
                />
            </div>
            {
                hasMinimumPlayers && (
                    <Select
                        className={cn(styles.createItem, styles.createItemSelect)}
                        initValue={minimumPlayers}
                        values={minPlayersCountItems.current}
                        setNewValue={setMinimumPlayers}
                        text={t('numPlayers')}
                    />
                )
            }
        </div>
        <button className={styles.createBtn} onClick={setNextStep}>
            {t('next')}
        </button>
    </>)
}
