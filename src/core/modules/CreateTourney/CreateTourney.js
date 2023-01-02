import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// Styles
import styles from './index.module.scss'

// Components
import { PageWrapper } from '../../ui/PageWrapper'
import { CreateCompetitionSteps } from '../../ui/CreateCompetition/CreateCompetitionSteps'
import { CreateCompetitionContent } from '../../ui/CreateCompetition/CreateCompetitionContent'

export const CreateTourney = () => {
    const {orgID} = useParams()

    const [steps, setSteps] = useState([
        {
            id: 1,
            text: 'generalInfo',
            value: 'step1',
        },
        {
            id: 2,
            text: 'tournamentFormat',
            value: 'step2',
        },
        {
            id: 3,
            text: 'specialRules',
            value: 'step3',
        },
        {
            id: 4,
            text: 'creationOfTheTournament',
            value: 'step4',
        },
    ])

    const [currentStep, setCurrentStep] = useState(steps[0])

    const setNextStep = () => {
        setCurrentStep(prevState => steps[prevState.id])
    }

    useEffect(() => {
        if (steps[currentStep.id - 2] && !steps[currentStep.id - 2].done) {
            setSteps(prevState => {
                const tempArr = [...prevState]
                tempArr[currentStep.id - 2].done = true

                return tempArr
            })
        }
    }, [currentStep])

    return (
        <PageWrapper>
            <div className={styles.tourney}>
                <CreateCompetitionSteps
                    steps={steps}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                />
                <CreateCompetitionContent
                    currentStep={currentStep}
                    setNextStep={setNextStep}
                    orgID={orgID}
                />
            </div>
        </PageWrapper>
    )
}
