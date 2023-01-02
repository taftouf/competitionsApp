import React, { useEffect, useState } from 'react'
import { PageWrapper } from '../../ui/PageWrapper'
import { useParams } from 'react-router-dom'
import { getCookie } from '../../utils/cookie'
import { MainInfoPlayer } from '../../ui/MainInfoPlayer'
import styles from './index.module.scss'
import { Loader } from '../../ui/Loader'


import { LeftFram } from './LeftFram'
import { RightFram } from './RightFram'

export const Player = () => {
    const {teamID, playerID} = useParams()
    const [data, setData] = useState({})

    const getPlayer = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_HOST}/api/v4/teams/${teamID}/players/${playerID}`, {
            headers: {
                'Authorization': `Bearer ${getCookie('access_token')}`
            }
        })

        if (res.ok) {
            const data = await res.json()

            setData(data)
        }
    }

    useEffect(() => {
        (async () => {
            await Promise.all([
                getPlayer()
            ])
        })()
    }, [])

    return (
        <PageWrapper>
            {
                Object.keys(data).length > 0 ? (
                    <div className={styles.container}
                         style={{backgroundImage: `linear-gradient(${data.player.position?.color}, transparent 50%)`}}>
                        <div className={styles.team}>
                            <MainInfoPlayer data={data}/>
                            <div className={styles.teamContent}>
                                <LeftFram games={data.stats.games}
                                          avg={data.stats.avg_rating ? data.stats.avg_rating : 0}/>
                                <RightFram buts={data.stats.goals} hommeDeMatch={data.stats.man_of_the_match}
                                           cleanSheet={data.stats.clean_sheet} assists={data.stats.assists}/>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.teamLoaderWrapper}>
                        <Loader/>
                    </div>
                )
            }

        </PageWrapper>
    )
}
