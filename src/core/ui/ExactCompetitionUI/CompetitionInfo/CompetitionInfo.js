import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Components
import { Img } from '../../Img'
import { SvgSprite } from '../../SvgSprite/SvgSprite'

import { useTranslation } from 'react-i18next'
import { Btn } from '../../Btn'

export const CompetitionInfo = ({competition}) => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    return (
        <div className={styles.competition}>
            <div className={cn(styles.competitionInner, styles.relative)}>
                <Btn className={cn(styles.mainInfoBack,styles.marginReturn)} onClick={() => navigate(`/dashboard`)}>
                    <SvgSprite spriteID={'arrowNext'} /> 
                </Btn>
                <div className={styles.competitionImgWrap}>
                    <Img
                        className={styles.competitionImg}
                        src={competition.picture}
                        alt={'competition photo'}
                    />
                </div>
                <div className={styles.competitionContent}>
                    <div className={styles.competitionName}>
                        {competition.name}
                    </div>
                    <div className={styles.competitionOrganizerWrap}>
                        {t('organizedBy')} :
                        <Link to={`/organizations/${competition.organizer.id}`} className={styles.competitionOrganizer}>
                            <Img
                                className={styles.competitionOrganizerImg}
                                src={competition.organizer.picture}
                                alt={'organizer photo'}
                            />
                            {competition.organizer.name}
                        </Link>
                    </div>
                    <div className={styles.competitionMore}>
                        {
                            competition.current_round && (
                                <div className={cn(styles.competitionMoreItem, styles.competitionMoreItemCalendar)}>
                                    <SvgSprite spriteID={'calendar'} />
                                    {competition.current_round.name}
                                </div>
                            )
                        }
                        <div className={styles.competitionMoreItem}>
                            <SvgSprite spriteID={'members'} />
                            {competition.registered_participants} {competition.mode === 'solo' ? t('Joueurs') : t('teams')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
