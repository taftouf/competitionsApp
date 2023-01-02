import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// Styles
import styles from './index.module.scss'

// Hooks
import { useMobile } from '../../hooks/useMobile'

// Functions
import { getSquadCompetitions } from '../../functions/getSquadCompetitions'

// Components
import { PageWrapper } from '../../ui/PageWrapper'
import { CompetitionsAside } from '../../ui/CompetitionsUI/CompetitionsAside'
import { Img } from '../../ui/Img'
import { Loader } from '../../ui/Loader'
import { DiscoverContent } from '../../ui/DiscoverUI/DiscoverContent'


export const DiscoverOrg = () => {
    const isMobile = useMobile(769)
    const orgs = useSelector(state => state.orgs.orgs)

    const [content, setContent] = useState(false)
    const [exactOrg, setExactOrg] = useState()
    const [competitions, setCompetitions] = useState([])
    const [competitionsFull, setCompetitionsFull] = useState([])

    const {id} = useParams()

    useEffect(() => {
        setContent(false)
        if (orgs && id) {
            (async () => {
                setExactOrg(orgs.find(org => org.id === +id))

                const squadCompetitions = await getSquadCompetitions(25, 0, +id)

                setCompetitionsFull([...squadCompetitions])
                setContent(true)
            })()
        }
    }, [orgs, id])

    return (
        <PageWrapper discover={isMobile} backTo={'/discover-menu'}>
            {
                !isMobile && <CompetitionsAside />
            }
            {
                content ? (
                    <div className={styles.discoverOrg}>
                        <div className={styles.discoverOrgInner}>
                            <div className={styles.discoverOrgTop}>
                                <Img
                                    className={styles.discoverOrgImg}
                                    src={exactOrg.picture}
                                    alt='team'
                                />
                                <div className={styles.discoverOrgName}>
                                    {exactOrg.name}
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
                    <div className={styles.discoverOrgLoader}>
                        <Loader/>
                    </div>
                )
            }
        </PageWrapper>
    )
}
