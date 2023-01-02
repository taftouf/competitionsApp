import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Components
import { Img } from '../../Img'
import { CompetitionItem } from '../CompetitionItem'
import { Link } from 'react-router-dom'

export const CompetitionRanksGeneral = ({data, idx, general}) => {
    return (
        <Link to={`/teams/${data.participant.id}`} className={cn(styles.ranksItem, styles.ranksItemGeneral)}>
            <div className={styles.ranksItemPosition}>
                {data.pos}
            </div>
            <Img
                className={styles.ranksItemImg}
                src={data.participant.picture}
            />
            <CompetitionItem
                text={data.participant.name}
                name
                auto
                id={data.participant.id}
                general={general}
            />
            <div className={styles.ranksItemContent}>
                <CompetitionItem
                    title={idx === 0 && 'Pts'}
                    text={data.points}
                />
                <CompetitionItem
                    title={idx === 0 && 'J'}
                    text={data.played}
                />
                <CompetitionItem
                    title={idx === 0 && 'G'}
                    text={data.wins}
                />
                <CompetitionItem
                    title={idx === 0 && 'N'}
                    text={data.draws}
                />
                <CompetitionItem
                    title={idx === 0 && 'P'}
                    text={data.losses}
                />
                <CompetitionItem
                    title={idx === 0 && 'M'}
                    text={data.goals_for}
                />
                <CompetitionItem
                    title={idx === 0 && 'E'}
                    text={data.goals_against}
                />
                <CompetitionItem
                    title={idx === 0 && '+/-'}
                    text={data.goal_diff}
                />
            </div>
        </Link>
    )
}
