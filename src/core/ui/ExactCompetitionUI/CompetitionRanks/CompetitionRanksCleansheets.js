import React from 'react'

// Styles
import styles from './index.module.scss'

// Components
import { Img } from '../../Img'
import { CompetitionItem } from '../CompetitionItem'

export const CompetitionRanksCleansheets = ({data, idx}) => {
    return (
        <div className={styles.ranksItem}>
            <div className={styles.ranksItemPosition}>
                {idx + 1}
            </div>
            <Img
                className={styles.ranksItemImg}
                src={data.player.user.picture}
            />
            <CompetitionItem
                text={data.player.user.name}
                name
                auto
            />
            <div className={styles.ranksItemContent}>
                <CompetitionItem
                    title={idx === 0 && 'Équipe'}
                    text={data.player.team.name}
                    auto
                />
                <CompetitionItem
                    title={idx === 0 && 'Cleansh.'}
                    text={data.stat}
                />
            </div>
        </div>
    )
}
