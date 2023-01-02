import React, { useEffect, useState } from 'react'

// Styles
import styles from './index.module.scss'

// Components
import { CreateCompetitionContentStep1 } from './CreateCompetitionContentStep1'
import { CreateCompetitionContentStep2 } from './CreateCompetitionContentStep2'
import { CreateCompetitionContentStep3 } from './CreateCompetitionContentStep3'
import { CreateCompetitionContentStep4 } from './CreateCompetitionContentStep4'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { setEditionsData } from '../../../functions/setEditionsData'

export const CreateCompetitionContent = ({currentStep, setNextStep, orgID, isLeague}) => {
    const [resultData, setResultData] = useState({})
    const {t} = useTranslation()
    const dispatch = useDispatch()

    useEffect(()=>{
        (() => {
            dispatch(setEditionsData())
        })()
    })
    return (
        <div className={styles.create}>
            <h1 className={styles.createTitle}>
                {t(currentStep.text)}
            </h1>
            {currentStep.value === 'step1' && (
                <CreateCompetitionContentStep1
                    data={resultData}
                    setResult={newData => setResultData(prevState => ({
                        ...prevState,
                        picture: newData.picture,
                        name: newData.name,
                        is_international: newData.is_international,
                        has_reward: newData.has_reward,
                        type : newData.type,
                        show_games_hours: newData.show_games_hours,
                        start_date: newData.start_date,
                    }))}
                    setNextStep={setNextStep}
                    isLeague={isLeague}
                />
            )}
            {currentStep.value === 'step2' && (
                <CreateCompetitionContentStep2
                    data={resultData}
                    setResult={newData => setResultData(prevState => ({
                        ...prevState,
                        available_spots: newData.available_spots,
                        number_of_groups: newData.number_of_groups,
                        qualified_per_group: newData.qualified_per_group,
                        return_games_groups: newData.return_games_groups || false,
                        return_games_finals: newData.return_games_finals || false,
                        return_games: newData.return_games || false,
                        minutes_between_rounds: newData.minutes_between_rounds,
                        third_place_game: newData.third_place_game || false,
                        is_direct: newData.is_direct,
                        platform : newData.platform,
                        game_edition_id : newData.game_edition_id,
                        
                    }))}
                    setNextStep={setNextStep}
                    isLeague={isLeague}
                />
            )}
            {currentStep.value === 'step3' && (
                <CreateCompetitionContentStep3
                    data={resultData}
                    setResult={newData => setResultData(prevState => ({
                        ...prevState,
                        all_required: newData.all_required || false,
                        gk_required: newData.gk_required || false,
                        lock_rosters: newData.lock_rosters || false,
                        players_min: newData.players_min || null,
                        has_players_min: newData.has_players_min,
                    }))}
                    setNextStep={setNextStep}
                />
            )}
            {currentStep.value === 'step4' && (
                <CreateCompetitionContentStep4
                    data={resultData}
                    orgID={orgID}
                    isLeague={isLeague}
                />
            )}
        </div>
    )
}
