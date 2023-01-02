import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// Styles
import styles from './index.module.scss'

// Hooks
import { useMobile } from '../../hooks/useMobile'

// Components
import { PageWrapper } from '../../ui/PageWrapper'
import { CompetitionsAside } from '../../ui/CompetitionsUI/CompetitionsAside'
import { Loader } from '../../ui/Loader'
import { Img } from '../../ui/Img'
import { getSquadCompetitions } from '../../functions/getSquadCompetitions'
import { DiscoverContent } from '../../ui/DiscoverUI/DiscoverContent'

export const DiscoverTeam = () => {
    const isMobile = useMobile(769)
    const teams = useSelector(state => state.teams.teams)

    const [content, setContent] = useState(false)
    const [exactTeam, setExactTeam] = useState()
    const [competitions, setCompetitions] = useState([])
    const [competitionsFull, setCompetitionsFull] = useState([])

    const {id} = useParams()

    useEffect(() => {
        setContent(false)
        if (teams && id) {
            (async () => {
                setExactTeam(teams.find(team => team.id === +id))

                const squadCompetitions = await getSquadCompetitions(25, 0, +id, true)

                setCompetitionsFull([...squadCompetitions])
                setContent(true)
            })()
        }
    }, [teams, id])

    return (
        <PageWrapper discover={isMobile} backTo={'/discover-menu'}>
            {
                !isMobile && <CompetitionsAside/>
            }
            {
                content && exactTeam ? (
                    <div className={styles.discoverTeam}>
                        <div className={styles.discoverTeamInner}>
                            <div className={styles.discoverTeamTop}>
                                <Img
                                    className={styles.discoverTeamImg}
                                    src={exactTeam.picture}
                                    alt='team'
                                />
                                <div className={styles.discoverTeamName}>
                                    {exactTeam.name}
                                </div>
                            </div>
                            <DiscoverContent
                                competitionsFull={competitionsFull}
                                setCompetitions={setCompetitions}
                                competitions={competitions}
                            />
                        </div>
                    </div>
                ) : (
                    <div className={styles.discoverTeamLoader}>
                        <Loader/>
                    </div>
                )
            }
        </PageWrapper>
    )
}
