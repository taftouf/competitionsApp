import React, { useEffect, useState } from 'react'

// Styles
import styles from './index.module.scss'

// Hooks
import { useMobile } from '../../hooks/useMobile'

// Components
import { PageWrapper } from '../../ui/PageWrapper'
import { FollowedOrgs } from '../../ui/FollowedOrgs'
import { CompetitionsInfo } from '../../ui/CompetitionsUI/CompetitionsInfo'
import { CompetitionsAside } from '../../ui/CompetitionsUI/CompetitionsAside'
import { DiscoverNav } from '../../ui/DiscoverUI/DiscoverNav'

export const Discover = () => {
    const MOBILE_WIDTH = 769
    const isMobile = useMobile(MOBILE_WIDTH)

    const [content, setContent] = useState(false)
    const [offset, setOffset] = useState(7)

    useEffect(() => {
        if (window.innerWidth < MOBILE_WIDTH) {
            if (isMobile) setContent(true)
        } else {
            setContent(true)
        }
    }, [isMobile])

    return content && (
        <PageWrapper discover={isMobile} backTo={'/dashboard'}>
            <div className={styles.discoverWrap}>
                {
                    isMobile ? <DiscoverNav /> : <CompetitionsAside/>
                }
                <div className={styles.discover}>
                    <div className={styles.discoverInner}>
                        <div className={styles.discoverItem}>
                            <FollowedOrgs discover />
                        </div>
                        <div className={styles.discoverItem}>
                            <CompetitionsInfo offset={offset} setOffset={setOffset}/>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}
