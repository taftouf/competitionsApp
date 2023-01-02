import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Components
import { Img } from '../../Img'
import { SvgSprite } from '../../SvgSprite/SvgSprite'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const CompetitionMatchInfo = ({data, tournament, competition}) => {
    const {t} = useTranslation()    

    return (
        <div className={cn(styles.match, {
            [styles.matchTournament]: tournament,
        })}>
            <Link className={styles.matchArrowLinkTT} to={'/dashboard'}>
                <SvgSprite spriteID={'arrowNext'} /> 
            </Link>
            <Img
                className={cn(styles.matchImg, {
                    [styles.matchImgWinner]: data.score_1 > data.score_2
                })}
                src={data.home?.picture}
                alt={'team'}
            />
            <div className={styles.matchInfo}>
                {
                    typeof data.score_1 === 'number' && typeof data.score_2 === 'number' ? (
                        <div className={styles.matchScore}>
                            {data.score_1} - {data.score_2}
                        </div>
                    ) : (
                        <div className={styles.matchDate}>
                            <span>{data.date.iso}</span>
                            <span>{data.date.time}</span>
                        </div>
                    )
                }
            </div>
            <Img
                className={cn(styles.matchImg, {
                    [styles.matchImgWinner]: data.score_2 > data.score_1
                })}
                src={data.visitors?.picture}
                alt={'team'}
            />
            {
                tournament && (
                    <div className={styles.matchMore}>
                        {
                            competition.current_round && (
                                <div className={cn(styles.matchMoreItem, styles.matchMoreItemCalendar)}>
                                    <SvgSprite spriteID={'calendar'} />
                                    {competition.current_round.name}
                                </div>
                            )
                        }
                        <div className={styles.matchMoreItem}>
                            <SvgSprite spriteID={'members'} />
                            {competition.registered_participants} {t('teams')}
                        </div>
                    </div>
                )
            }
        </div>
        
    )
}
