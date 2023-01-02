import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Components
import { SvgSprite } from '../../SvgSprite/SvgSprite'

import { useTranslation } from 'react-i18next'

export const CreateCompetitionSteps = ({steps, currentStep, setCurrentStep}) => {
    const changeStep = step => {
        if (step.done || steps[step.id - 2].done) setCurrentStep({...step})
    }
    const {t} = useTranslation()
    return (
        <ul className={styles.steps}>
            {
                steps.map((step, idx) => (
                    <li className={cn(styles.stepsItem, {
                        [styles.stepsItemActive]: step.value === currentStep.value,
                        [styles.stepsItemDone]: step.done,
                    })}
                        key={step.id}
                        onClick={() => changeStep({...steps[idx]})}
                    >
                        <span>
                            {step.id}
                            <SvgSprite spriteID={'check'} />
                        </span>
                        {t(step.text)}
                    </li>
                ))
            }
        </ul>
    )
}
