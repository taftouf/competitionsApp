import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

// Styles
import styles from './index.module.scss'

// Slices
import { addNotification } from '../../../../store/slices/notificationsSlice'
import { removeNotifTimeout } from '../../../functions/removeNotifTimeout'

// Functions
import { fetchData } from '../../../utils/fetchData'

// Components
import { SvgSprite } from '../../SvgSprite/SvgSprite'
import { CompetitionMatch } from '../CompetitionMatch'
import { Tabs } from '../../Tabs/Tabs'
import { CompetitionPlayersStandard } from './CompetitionPlayersStandard'
import { Loader } from '../../Loader'
import { CompetitionPlayersEdit } from './CompetitionPlayersEdit'
import { useDispatch, useSelector } from 'react-redux'
import { useInput } from '../../../hooks/useInput'
import { useMobile } from '../../../hooks/useMobile'
import { useNavigate } from 'react-router-dom'
import { Popup } from '../../Popup'
import { CompetionAdminDeleteScore } from './CompetionAdminDeleteScore'
import { validateStats } from '../../../functions/validateStats'
import { Btn } from '../../Btn'
import { CompetitionAdminValiderPopup } from './CompetitionAdminValiderPopup'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const CompetitionAdminMatch = ({
                                          data,
                                          competitionType,
                                          round,
                                          competitionID,
                                          type,
                                          goPrevious,
                                          goNext,
                                          updateData,
                                          wrap,
                                          teams,
                                          userTeams,
                                          havePermissions,
                                          exactGames,
                                          goBack,
                                          isCompetitionAdmin
                                      }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isTablet = useMobile(769)
    const isAdmin = useSelector(state => state.user.isAdmin)?useSelector(state => state.user.isAdmin):isCompetitionAdmin

    const {t} = useTranslation()
    const [searchParams] = useSearchParams()

    const score_1 = data.score_1 !=null ? data.score_1 : ( data.home_score_1 != null ? data.home_score_1 : data.visitors_score_1 )
    const score_2 = data.score_2 !=null ? data.score_2 : ( data.home_score_2!=null ? data.home_score_2 : data.visitors_score_2 )

    const [activeTeamID, setActiveTeamID] = useState(data.home?.id)
    const [players, setPlayers] = useState([])
    const [stats, setStats] = useState([])
    const [viewType, setViewType] = useState('info')
    const [editedPlayers, setEditedPlayers] = useState([])
    const [loadingPlayers, setLoadingPlayers] = useState(false)

    const homeScore = useInput(data.score_1)
    const visitorScore = useInput(data.score_2)
    const [isForfeited, setIsForfeited] = useState(false)

    const [scoresToDelete, setScoresToDelete] = useState(false)
    const [scoresToValider, setScoresToValider] = useState(false)

    const first = useState(exactGames && exactGames[0].id)
    const last = useState(exactGames && exactGames[exactGames.length - 1].id)

    const [tabs, setTabs] = useState([
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

    const showNotification = async response => {
        const dataEdited = await response.json()

        if (!response.ok) {
            const errorID = uuid()

            dispatch(addNotification({id: errorID, type: 'error', text: dataEdited.message}))
            dispatch(removeNotifTimeout(errorID, 3000))
        } else {
            const successID = uuid()

            dispatch(addNotification({id: successID, type: 'success', text: 'Successfully edited'}))
            dispatch(removeNotifTimeout(successID, 3000))
        }
    }

    const editPlayers = async (meth) => {
        const validate = validateStats(data, activeTeamID, editedPlayers, stats, dispatch, players.length)
       
        const methode = meth ? meth : (havePermissions && !isAdmin) ? 'POST' : 'PUT'
        const body = new FormData()
        editedPlayers.forEach(stats => body.append("stats", JSON.stringify(stats)))

        if (validate) {

            const res = await fetchData(`/api/v4/competitions/${type}/${competitionType}s/${competitionID}/games/${data.id}/stats`, {
                method: methode,
                body: methode != 'POST' ?
                                        JSON.stringify({
                                            stats: [...editedPlayers],
                                        })
                                        :
                                        body,
                headers: methode != 'POST' ?
                {
                    'Content-Type': 'application/json',
                }:{
                    'Content-Disposition': 'form-data; name="stats"',
                },
            })
           
            showNotification(res)
            getStats()
            setViewType('info')
        }
    }

    const changeScores = async method => {
        const res = await fetchData(`/api/v4/competitions/${type}/${competitionType}s/${competitionID}/games/${data.id}`, {
            method,
            body: JSON.stringify({
                score_1: +homeScore.value,
                score_2: +visitorScore.value,
                is_forfeit: isForfeited,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (method === 'DELETE') {
            setViewType('info')
            setIsForfeited(false)
        }
        showNotification(res)
        setScoresToDelete(false)
        updateData()
    }

    useEffect(() => {
        if (activeTeamID) {
            (async () => {
                setLoadingPlayers(true)
                const team = teams?.find(team => team.participant.id === data.home.id || team.id === data.visitors.id)

                if (team?.roster_locked) {
                    const res = await fetchData(`/api/v4/competitions/${type}/${competitionType}s/${competitionID}/roster?team_id=${activeTeamID}`)
                    const data = await res.json()

                    setPlayers([...data.roster])
                } else {
                    const res = await fetchData(`/api/v4/teams/${activeTeamID}/players?status=approved`)
                    const data = await res.json()

                    setPlayers([...data.players])
                }

                setLoadingPlayers(false)
            })()
        }
    }, [activeTeamID])

    const getStats = async () => {
        const res = await fetchData(`/api/v4/competitions/${type}/${competitionType}s/${competitionID}/games/${data.id}/stats`)
        const resData = await res.json()

        setStats([...resData.stats])
    }

    useEffect(() => {
        getStats()
    }, [])

    useEffect(() => {
        if (exactGames) {
            if (data.id) {
                navigate({
                    pathname: `/competitions/${type}/${competitionType}/${competitionID}`,
                    search: `?gameID=${data.id}&filterValue=${round}`,
                })
            } else {
                navigate({
                    pathname: `/competitions/${type}/${competitionType}/${competitionID}`,
                })
            }
        }

        return () => exactGames && navigate({
            pathname: `/competitions/${type}/${competitionType}/${competitionID}`,
        })
    }, [data])

    useEffect(() => {
        setActiveTeamID(data.home?.id)
        setTabs([
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
        homeScore.setNewValue(data.score_1 !=null ? data.score_1:data.home_score_1!=null?data.home_score_1:data.visitors_score_1)
        visitorScore.setNewValue(data.score_2!=null ? data.score_2:data.home_score_2!=null?data.home_score_2:data.visitors_score_2)
    }, [data])

    useEffect(() => {
        if (!userTeams.find(team => team.id === activeTeamID)) {
            setViewType('info')
        }
    }, [activeTeamID])

    return (<>
        <div className={cn(styles.match, {
            [styles.matchWrap]: wrap,
        })}>
            {
                exactGames && (
                <>
                    <div className={styles.matchTop}>
                        <div className={styles.matchArrowLink} onClick={goBack}>
                            <SvgSprite spriteID={'arrow'}/>
                            {t('allMatches')}
                        </div>
                        <div className={styles.matchTopText}>
                            Admin
                        </div>
                    </div>
                </>
                    
                )
            }
            <div className={styles.matchItem}>
                <div className={styles.matchSubtitle}>
                    {t('matchSheet')}
                </div>
                <div className={styles.matchText}>
                    {round}
                </div>
                {
                    isTablet && (
                        <CompetitionMatch
                            data={data}
                            competitionID={competitionID}
                            type={type}
                            round={round}
                            competitionType={competitionType}
                            adminStyle
                            userTeams={userTeams}
                            havePermissions={havePermissions}
                        />
                    )
                }
                <CompetitionMatch
                    data={data}
                    competitionID={competitionID}
                    type={type}
                    round={round}
                    competitionType={competitionType}
                    adminView
                    homeInput={homeScore}
                    visitorInput={visitorScore}
                    setIsForfeited={setIsForfeited}
                    userTeams={userTeams}
                    havePermissions={havePermissions}
                    isForfeited={isForfeited}
                    changeScores={changeScores}
                    isAdmin={isAdmin}
                    scoresToDelete={scoresToDelete}
                />
                <div className={styles.matchActions}>
                    {(data.score_1 != null && data.score_2 != null) && isAdmin &&(
                        <button
                            className={styles.matchActionsItem}
                            type={'button'}
                            onClick={() => setScoresToDelete(true)}
                        >
                            {t('resetScore')}
                        </button>
                    )}
                    {(!isForfeited && data.home && isAdmin) && (
                        <button
                            className={cn(styles.matchActionsItem, styles.matchActionsItemRed,{
                                [styles.disable]: (typeof data.score_1 === 'number' && typeof data.score_2 === 'number' && isAdmin) || (typeof score_1 === 'number' && typeof score_2 === 'number' && !isAdmin)
                            })}
                            type={'button'}
                            onClick={() => setScoresToValider(true)}  
                        >
                            {t('validateScore')}
                        </button>
                    )}
                </div>
            </div>
            {!isForfeited && type != 'solo' && activeTeamID && (
                <div className={styles.matchItem}>
                    <div className={styles.matchSubtitle}>
                        {t('statistics')}
                    </div>
                    <div className={styles.matchTabsWrap}>
                        <Tabs setActiveTab={setActiveTeamID} initTabs={tabs}/>
                    </div>
                    <div className={styles.matchContent}>
                        {
                            !loadingPlayers ? (<>
                                {
                                    viewType === 'info' && (<>
                                        <CompetitionPlayersStandard data={players} stats={stats}/>

                                        {
                                            players.length > 0 && (data.score_1 !== null && data.score_2 !== null || data.home_score_1 !== null || data.visitors_score_1 !== null) && (
                                                <div className={styles.matchActions}>
                                                    <div className={styles.matchActions}>
                                                        {isAdmin && stats.find(stat => stat.status === "pending") && (
                                                            <Btn className={cn(styles.matchActionsItem, styles.active, styles.pendingBtn)} 
                                                                type={'button'}
                                                                onClick={() => editPlayers('PATCH')}
                                                            >
                                                                {t('validate')}
                                                            </Btn>
                                                        )}
                                                        <Btn className={cn(styles.matchActionsItem, styles.pendingBtn)} type={'button'}
                                                             onClick={() => setViewType('edit')}
                                                             disable={( isAdmin === true? false:(!userTeams.find(team => team.id === activeTeamID)) ) || ( !isAdmin && stats.find(stat => stat.status === "approved") ) }
                                                        >
                                                            {t('addStatistics')}
                                                        </Btn>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </>)
                                }
                                {
                                    viewType === 'edit' && (<>
                                        <CompetitionPlayersEdit setEditedPlayers={setEditedPlayers} data={players}
                                                                stats={stats}/>
                                        {
                                            players.length > 0 && (
                                                <div className={styles.matchActions}>
                                                    <button
                                                        className={styles.matchActionsItem}
                                                        type={'button'}
                                                        onClick={() => setViewType('info')}
                                                    >
                                                        {t('cancel')}
                                                    </button>
                                                    <button
                                                        className={cn(styles.matchActionsItem, styles.matchActionsItemRed)}
                                                        type={'button'}
                                                        onClick={()=>editPlayers()}
                                                    >
                                                        {t('validateStatistics')}
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </>)
                                }
                            </>) : <Loader/>
                        }
                    </div>
                </div>
            )}

            {/* {
                 !havePermissions && (*/}
            {
                exactGames && (
                    <div className={styles.matchBottom}>
                        {first[0] !== parseInt(searchParams.get('gameID')) ? (
                            <div className={styles.matchArrowLink} onClick={goPrevious}>
                                <SvgSprite spriteID={'arrow'}/>
                                {t('previousGame')}
                            </div>
                        ) : <div></div>}
                        {last[0] !== parseInt(searchParams.get('gameID')) ? (
                            <div className={cn(styles.matchArrowLink, styles.matchArrowLinkNext)} onClick={goNext}>
                                {t('nextGame')}
                                <SvgSprite spriteID={'arrow'}/>
                            </div>
                        ) : <div></div>}
                    </div>
                )
            }
            {/* ) */}
            {/* } */}
        </div>
        <Popup isOpenedPopup={scoresToDelete} closePopup={() => setScoresToDelete()}>
            <CompetionAdminDeleteScore
                changeScores={changeScores}
                setScoresToDelete={() => setScoresToDelete()}
            />
        </Popup>
        <Popup isOpenedPopup={scoresToValider} closePopup={() => setScoresToValider()}>
            <CompetitionAdminValiderPopup
                changeScores={changeScores}
                havePermissions={havePermissions}
                isAdmin={isAdmin}
                setScoresToValider={() => setScoresToValider()}
            />
        </Popup>

    </>)
}
