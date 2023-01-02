import React from 'react'

// Styles
import styles from './index.module.scss'

// Components
import { Img } from '../../Img'
import { CompetitionItem } from '../CompetitionItem'
import { useTranslation } from 'react-i18next'
import { SvgSprite } from '../../SvgSprite/SvgSprite'

export const CompetitionPlayersStandard = ({data, stats}) => {
    const {t} = useTranslation()

    return data.length > 0 ? (
        <ul className={styles.matchPlayersList}>
            {
                data.map((player, idx) => (
                    <li className={styles.matchPlayersItem} key={player.id}>
                        <div className={styles.matchPlayersItemWrap}>
                            <Img
                                className={styles.matchPlayersItemImg}
                                src={player.user.picture}
                                alt={'player'}
                            />
                            <CompetitionItem
                                text={player.user.pseudo || player.user.full_name}
                                name
                                auto
                            />
                            {stats.find(stat => stat.status === "pending" && stat.player.id === player.id) && (
                                <SvgSprite className={styles.pending} spriteID={'clock'}/>
                            )}
                        </div>
                        <div className={styles.matchPlayersItemBox}>
                            <CompetitionItem
                                title={idx === 0 && 'Motm'}
                                text={stats.find(stat => stat.player.id === player.id)?.man_of_the_match || '-'}
                                big
                            />
                            <CompetitionItem
                                title={idx === 0 && 'Cleansh.'}
                                text={stats.find(stat => stat.player.id === player.id)?.clean_sheet || '-'}
                                big
                            />
                            <CompetitionItem
                                title={idx === 0 && 'Note'}
                                text={stats.find(stat => stat.player.id === player.id)?.rating || '-'}
                                big
                            />
                            <CompetitionItem
                                title={idx === 0 && 'goals'}
                                text={stats.find(stat => stat.player.id === player.id)?.goals || '-'}
                                big
                            />
                            <CompetitionItem
                                title={idx === 0 && 'assists'}
                                text={stats.find(stat => stat.player.id === player.id)?.assists || '-'}
                                big
                            />
                        </div>
                    </li>
                ))
            }
        </ul>
    ) : <div className={'empty-block'}>{t('noExistingPlayers')}</div>
}
