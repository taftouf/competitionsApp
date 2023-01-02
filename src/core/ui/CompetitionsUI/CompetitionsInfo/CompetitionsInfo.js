import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

// Hooks
import { useToggle } from '../../../hooks/useToggle'

// Components
import { Loader } from '../../Loader'
import { CompetitionsInfoItem } from './CompetitionsInfoItem'
import { getSquadCompetitions } from '../../../functions/getSquadCompetitions'
import { getSoloCompetitions } from '../../../functions/getSoloCompetitions'

import { useTranslation } from 'react-i18next'

export const CompetitionsInfo = ({limit, offset, setOffset}) => {
    const userInfo = useSelector(state => state.user.userInfo)

    const [loading, setLoading] = useState(false)
    const [competitions, setCompetitions] = useState([])
    const [competitionsSolo, setCompetitionsSolo] = useState([])
    const [competitionsFull, setCompetitionsFull] = useState([])
    const [competitionsSoloFull, setCompetitionsSoloFull] = useState([])
    const {isOpened, toggleIsOpened} = useToggle(true)
    const [update, setUpdate] = useState(false)
    const {t} = useTranslation()

    useEffect(() => {
        if (userInfo) {
            (async () => {
                setLoading(true)

                const squadCompetitions = await getSquadCompetitions(limit || offset)
                const soloCompetitions = await getSoloCompetitions(limit || offset)

                setCompetitionsFull([...squadCompetitions])
                setCompetitionsSoloFull([...soloCompetitions])
                setLoading(false)
            })()
        }
    }, [userInfo])
    useEffect(()=>{
        if (userInfo) {
            (async () => {
                const squadCompetitions = await getSquadCompetitions(offset)
                const soloCompetitions = await getSoloCompetitions(offset)
                setUpdate(true)
                setCompetitionsFull([...squadCompetitions])
                setCompetitionsSoloFull([...soloCompetitions])
            })()
        }
    }, [offset])

    return !loading ? (<>
        <CompetitionsInfoItem
            setCompetitions={setCompetitions}
            competitionsFull={competitionsFull}
            competitions={competitions}
            title={t('teamCompetitions')}
            isOpenedInit
            isOpened={isOpened}
            toggleIsOpened={toggleIsOpened}
            limit={limit}
            offset={offset}
            setOffset={setOffset}
            update={update}
            setUpdate={setUpdate}
        />
        <CompetitionsInfoItem
            setCompetitions={setCompetitionsSolo}
            competitionsFull={competitionsSoloFull}
            competitions={competitionsSolo}
            title={t('IndividualCompetitions')}
            withoutRadius
            isOpened={!isOpened}
            toggleIsOpened={toggleIsOpened}
            limit={limit}
            offset={offset}
            setOffset={setOffset}
            update={update}
            setUpdate={setUpdate}
        />
    </>) : <Loader/>
}
