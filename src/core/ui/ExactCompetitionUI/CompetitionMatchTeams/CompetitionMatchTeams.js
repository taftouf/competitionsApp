import React, { useEffect, useRef, useState } from 'react'

// Styles
import styles from './index.module.scss'

// Components
import { Img } from '../../Img'
import { Tabs } from '../../Tabs/Tabs'
import { Loader } from '../../Loader'
import { CompetitionItem } from '../CompetitionItem'
import { fetchData } from '../../../utils/fetchData'

// traduction
import { useTranslation } from 'react-i18next'

export const CompetitionMatchTeams = ({data, stats, competitionID, type, competitionType}) => {
    const [activeTeamID, setActiveTeamID] = useState(data.home?.id)
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(true)
    const {t} = useTranslation()

    const tabs = useRef([
        {
            id: 1,
            name: data.home?.name,
            value: data.home?.id,
            photo: data.home?.picture,
        },
        {
            id: 2,
            name: data.visitors?.name,
            value: data.visitors?.id,
            photo: data.visitors?.picture,
        },
    ])

    useEffect(() => {
        if (activeTeamID) {
            (async () => {
                setLoading(true)
                if(activeTeamID?.roster_locked){
                    const res = await fetchData(`/api/v4/competitions/${type}/${competitionType}/${competitionID}/roster?team_id=${activeTeamID}`)
                    const data = await res.json()

                    setPlayers([...data.roster])
                }else {
                    const res = await fetchData(`/api/v4/teams/${activeTeamID}/players?status=approved`)
                    const data = await res.json()

                    setPlayers([...data.players])
                }
                
                setLoading(false)
            })()
        }
    }, [activeTeamID])

    return (
        <div className={styles.teams}>
            <div className={styles.teamsContent}>
                <div className={styles.teamsTabsWrap}>
                    <Tabs setActiveTab={setActiveTeamID} initTabs={tabs.current}/>
                </div>
                {
                    !loading ? (
                        <div className={styles.teamsInner}>
                            {
                                players.length > 0 ? players.map((player, idx) => (
                                    <div className={styles.teamsItem} key={player.id}>
                                        <Img
                                            className={styles.tabsImg}
                                            src={player.user.picture}
                                            alt={'player'}
                                        />
                                        <CompetitionItem
                                            text={player.user.pseudo || player.user.full_name}
                                            name
                                            auto
                                        /> 
                                        <div className={styles.teamsBox}>
                                            <CompetitionItem
                                                title={idx === 0 && 'Motm'}
                                                text={stats.find(stat => stat.player.id === player.id)?.man_of_the_match || '-'}
                                            />
                                            <CompetitionItem
                                                title={idx === 0 && 'Cleansh.'}
                                                text={stats.find(stat => stat.player.id === player.id)?.clean_sheet || '-'}
                                            />
                                            <CompetitionItem
                                                title={idx === 0 && 'Note'}
                                                text={stats.find(stat => stat.player.id === player.id)?.rating || '-'}
                                            />
                                            <CompetitionItem
                                                title={idx === 0 && 'Buts'}
                                                text={stats.find(stat => stat.player.id === player.id)?.goals || "-"}
                                            />
                                            <CompetitionItem
                                                title={idx === 0 && 'Passes D.'}
                                                text={stats.find(stat => stat.player.id === player.id)?.assists || '-'}
                                            />
                                        </div>
                                    </div>
                                )) : <div className={'empty-block'}>{t('noExistingPlayers')}</div>
                            }
                        </div>
                    ) : <Loader/>
                }
            </div>
        </div>
    )
}
