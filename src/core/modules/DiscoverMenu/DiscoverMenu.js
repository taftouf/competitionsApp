import React, { useEffect, useState } from 'react'

// Styles
import styles from './index.module.scss'

// Hooks
import { useMobile } from '../../hooks/useMobile'

// Components
import { CompetitionsAside } from '../../ui/CompetitionsUI/CompetitionsAside'
import { PageWrapper } from '../../ui/PageWrapper'
import { DiscoverNav } from '../../ui/DiscoverUI/DiscoverNav'

export const DiscoverMenu = () => {
    const MOBILE_WIDTH = 769
    const isMobile = useMobile(MOBILE_WIDTH)

    const [content, setContent] = useState(false)

    useEffect(() => {
        if (window.innerWidth < MOBILE_WIDTH) {
            if (isMobile) setContent(true)
        } else {
            setContent(true)
        }
    }, [isMobile])

    return content && (
        <PageWrapper discover={isMobile} backTo={'/discover'}>
            <div className={styles.discoverMenu}>
                <DiscoverNav />
                <CompetitionsAside withoutDiscover/>
            </div>
        </PageWrapper>
    )
}
