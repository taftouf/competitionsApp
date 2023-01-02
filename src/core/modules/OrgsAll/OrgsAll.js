import React, { useEffect, useRef, useState } from 'react'

// Styles
import styles from './index.module.scss'

// Components
import { PageWrapper } from '../../ui/PageWrapper'
import { CompetitionsAside } from '../../ui/CompetitionsUI/CompetitionsAside'
import { OrgItem } from '../../ui/OrgItem'
import { useMobile } from '../../hooks/useMobile'
import { fetchData } from '../../utils/fetchData'

import { useTranslation } from 'react-i18next'

export const OrgsAll = () => {
    const LIMIT = useRef(20)

    const [orgs, setOrgs] = useState([])
    const [offset, setOffset] = useState(0)
    const [offsetSearch, setOffsetSearch] = useState(0)
    const [loading, setLoading] = useState(false)
    const [totalCount, setTotalCount] = useState(0)

    const [searchQuery, setSearchQuery] = useState('')

    const MOBILE_WIDTH = useRef(769)
    const isMobile = useMobile(MOBILE_WIDTH.current)

    const {t} = useTranslation()

    const getOrgs = async (searchQuery, searchOffset) => {
        const res = await fetchData(`/api/v3/organizations?limit=${LIMIT.current}&offset=${searchQuery ? typeof searchOffset === 'number' ? searchOffset : offsetSearch : offset}${searchQuery ? `&name=${searchQuery}` : ''}`)

        if (res.ok) {
            const data = await res.json()

            if (searchQuery) {
                if (typeof searchOffset === 'number' || offsetSearch === 0) {
                    setLoading(false)
                    setOrgs([...data.organizations])
                }
                else setOrgs([...orgs, ...data.organizations])

                setOffset(0)
                if (data.organizations.length !== 0) {
                    setOffsetSearch(prevState => prevState + LIMIT.current)
                } else setOrgs([])
            }
            else {
                if (offset === 0) {
                    setLoading(false)
                    setOrgs([...data.organizations])
                }
                else setOrgs([...orgs, ...data.organizations])

                setOffsetSearch(0)
                setOffset(prevState => prevState + LIMIT.current)
            }

            setTotalCount(data.count)
        }
    }

    useEffect(() => {
        if (searchQuery) {
            (async () => {
                setOrgs([])
                setOffset(0)
                setOffsetSearch(0)
                await getOrgs(searchQuery, 0)
            })()
        }
    }, [searchQuery])

    useEffect(() => {
        (async () => {
            if (loading) {
                await getOrgs()
                setLoading(false)
            }
        })()
    }, [loading])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)

        return () => document.removeEventListener('scroll', scrollHandler)
    }, [totalCount, orgs])

    const scrollHandler = e => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
            && orgs.length < totalCount) {
            setLoading(true)
        }
    }

    return (
        <PageWrapper discover={isMobile} backTo={'/discover'}>
            <div className={styles.orgsWrap}>
                <CompetitionsAside search setSearchQuery={setSearchQuery} getOrgs={getOrgs}/>
                {
                    orgs.length > 0 ? (
                        <div className={styles.orgs}>
                            <div className={styles.orgsList}>
                                {
                                    orgs.map(org => (
                                        <OrgItem data={org} key={org.id} join/>
                                    ))
                                }
                            </div>
                        </div>
                    ) : (
                        <div className={'empty-block'}>
                            {t('noOrganisations')}
                        </div>
                    )
                }
            </div>
        </PageWrapper>
    )
}
