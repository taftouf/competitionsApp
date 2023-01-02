import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { useDispatch } from 'react-redux'

// Functions
import { fetchData } from '../../../utils/fetchData'

// Styles
import styles from './index.module.scss'

// Slices
import { addNotification } from '../../../../store/slices/notificationsSlice'
import { removeNotifTimeout } from '../../../functions/removeNotifTimeout'

// Components
import { SvgSprite } from '../../SvgSprite/SvgSprite'
import { Form } from '../../Form'
import { Loader } from '../../Loader'
import { Img } from '../../Img'
import { CompetitionItem } from '../CompetitionItem'
import cn from 'classnames'
import { useMobile } from '../../../hooks/useMobile'
import { setNeedToUpdate } from '../../../../store/slices/teamsSlice'
import debounce from 'lodash.debounce'

// import { useTranslation } from 'react-i18next'

export const CompetitionTeamsSearch = ({type, competitionType, checkTeams, replaceTeam, competitionID, setNewTeam}) => {
    const isMobile = useMobile(401)
    const dispatch = useDispatch()

    // const {t} = useTranslation()

    const [searchValue, setSearchValue] = useState('')
    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(false)

    const onChange = e => setSearchValue(e?.target?.value)
    const debounceChange = debounce(onChange, 300)

    const searchTeams = async () => {
        if (searchValue) {
            setLoading(true)
            const res = await fetchData(`/api/v3/${type === 'solo'?'users':'teams'}?name=${searchValue}&active=true`)
            const data = await res.json()

            setTeams(type === 'solo'? [...data.users] : [...data.teams])
            setLoading(false)
        } else {
            setTeams([])
        }
    }

    useEffect(() => {
        if (searchValue) {
            if (!loading) searchTeams()
        } else {
            setTeams([])
        }
    }, [searchValue])

    const registerParticipant = async id => {
        const res = await fetchData(`/api/v4/competitions/${type}/${competitionType}/${competitionID}/registrations`, {
            method: 'POST',
            body: JSON.stringify({
                participant_id: id,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()

        setNewTeam(data.registration)
        if (res.ok) {
            const successID = uuid()

            dispatch(addNotification({id: successID, type: 'success', text: 'Successfully registered participant'}))
            dispatch(removeNotifTimeout(successID, 3000))
            dispatch(setNeedToUpdate(true))
        } else {
            const errorID = uuid()

            dispatch(addNotification({id: errorID, type: 'error', text: data.message}))
            dispatch(removeNotifTimeout(errorID, 3000))
        }
    }

    return (
        <div className={styles.teamsSearch}>
            <div className={cn(styles.teamsSearchTop, {
                [styles.teamsSearchTopReplace]: replaceTeam,
            })}>
                {/* {
                    !replaceTeam && (
                        <div className={styles.teamsSearchTitle}>
                            {t('addParticipants')}
                        </div>
                    )
                } */}
                <Form className={styles.teamsSearchInpWrap} noStyles onSubmit={searchTeams}>
                    <input
                        className={styles.teamsSearchInp}
                        type='text'
                        placeholder={'Search'}
                        onChange={debounceChange}
                    />
                    <button className={styles.teamsSearchBtn} type={'submit'}>
                        <SvgSprite spriteID={'search'}/>
                    </button>
                </Form>
            </div>
            {
                !loading && teams.length > 0 ? (
                    <div className={cn(styles.teamsContent, {
                        [styles.teamsContentReplace]: replaceTeam,
                    })}>
                        <ul className={styles.teamsContentList}>
                            {
                                teams.map(team => (
                                    <li className={styles.teamsContentItem} key={team.id}>
                                        <Link to={`/teams/${team.id}`} className={styles.teamsItemWrap}>
                                            <Img
                                                className={styles.teamsImg}
                                                src={team.picture}
                                                alt={'team'}
                                            />
                                            <CompetitionItem
                                                text={isMobile ? team.name.length > 8 ? team.name.slice(0, 5) + '...' : team.name : team.name}
                                                name
                                                auto
                                            />
                                        </Link>
                                        <div className={styles.teamsBox}>
                                            {
                                                checkTeams?.find(checkTeam => checkTeam.participant.id === team.id) ? (
                                                    <div className={styles.teamsParticipant}>
                                                        Inscrit
                                                        <SvgSprite spriteID={'check'}/>
                                                    </div>
                                                ) : (

                                                    <button
                                                        className={styles.teamsBtn}
                                                        type={'button'}
                                                        onClick={() => replaceTeam ? replaceTeam(team.id) : registerParticipant(team.id)}
                                                    >
                                                        {
                                                            replaceTeam ? 'Choisir' : 'Ajouter'
                                                        }
                                                    </button>
                                                )
                                            }
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ) : loading ? <Loader/> : <div className={'empty-block'}>No teams</div>
            }

        </div>
    )
}
