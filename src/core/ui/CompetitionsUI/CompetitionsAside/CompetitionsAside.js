import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import cn from 'classnames'
import debounce from 'lodash.debounce'
import { useSelector } from 'react-redux'

// Styles
import styles from './index.module.scss'

// Components
import { SvgSprite } from '../../SvgSprite/SvgSprite'
import { Img } from '../../Img'
import { Btn } from '../../Btn'
import { Form } from '../../Form'

import { useTranslation } from 'react-i18next'

export const CompetitionsAside = ({search, withoutDiscover, setSearchQuery, getOrgs}) => {
    const {t} = useTranslation()
    const [searchValue, setSearchValue] = useState('')

    const teams = useSelector(state => state.teams.teams)
    const orgs = useSelector(state => state.orgs.orgs)

    const onChange = e => setSearchValue(e?.target?.value)
    const debounceChange = debounce(onChange, 200)

    const searchResults = () => {
        setSearchQuery(searchValue)

        if (!searchValue) getOrgs()
    }

    useEffect(() => {
        if (search) searchResults(searchValue)
    }, [searchValue])

    return (
        <aside className={styles.aside}>
            {
                search ? (<>
                    <div className={styles.asideTitle}>
                        {t('organizations')}
                    </div>
                    <Form className={styles.asideSearchWrap} onSubmit={searchResults} noStyles>
                        <Btn type={'submit'} className={styles.asideSearchBtn}>
                            <SvgSprite spriteID={'search'}/>
                        </Btn>
                        <input
                            className={styles.asideSearch}
                            type={'text'}
                            placeholder={t('searchForOrganizations')}
                            onChange={debounceChange}
                        />
                    </Form>
                </>) : (<>
                    {
                        !withoutDiscover && (<>
                            <div className={styles.asideTitle}>
                                {t('competitions')}
                            </div>
                            <div className={styles.asideItem}>
                                <NavLink
                                    to={'/discover'}
                                    className={({isActive}) => cn(styles.asideLink, {
                                        [styles.asideLinkActive]: isActive,
                                    })}
                                >
                                    <SvgSprite spriteID={'discover'}/>
                                    {t('discover')}
                                </NavLink>
                            </div>
                        </>)
                    }
                    <div className={styles.asideItem}>
                        <div className={styles.asideSubtitle}>
                            {t('myTeams')}
                        </div>
                        <ul className={styles.asideList}>
                            {
                                teams.map(team => (
                                    <li className={styles.asideListItem} key={team.id}>
                                        <NavLink
                                            to={`/teams/${team.id}/competitions`}
                                            className={({isActive}) => cn(styles.asideLink, {
                                                [styles.asideLinkActive]: isActive,
                                            })}
                                        >
                                            <Img
                                                className={styles.asideImg}
                                                src={team.picture}
                                                alt='team'
                                            />
                                            {team.name}
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                        <Link className={styles.asideAdd} to={'/new-team'}>
                            + {t('newTeam')}
                        </Link>
                    </div>
                    <div className={styles.asideItem}>
                        <div className={styles.asideSubtitle}>
                            {t('myOrganizations')}
                        </div>
                        <ul className={styles.asideList}>
                            {
                                orgs.map(org => org.status === "approved" &&(
                                    <li className={styles.asideListItem} key={org.id}>
                                        <NavLink
                                            to={`/organizations/${org.id}/competitions`}
                                            className={({isActive}) => cn(styles.asideLink, {
                                                [styles.asideLinkActive]: isActive,
                                            })}
                                        >
                                            <Img
                                                className={styles.asideImg}
                                                src={org.picture}
                                                alt='team'
                                            />
                                            {org.name}
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                        <Link className={styles.asideAdd} to={'/new-org'}>
                            + {t('newOrganization')}
                        </Link>
                    </div>
                </>)
            }
        </aside>
    )
}
