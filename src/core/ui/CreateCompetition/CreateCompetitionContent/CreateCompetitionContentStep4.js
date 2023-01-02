import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuid } from 'uuid'

// Styles
import styles from './index.module.scss'

// Components
import { Img } from '../../Img'
import { SvgSprite } from '../../SvgSprite/SvgSprite'
import { Datepicker } from '../../Datepicker'
import { addNotification } from '../../../../store/slices/notificationsSlice'
import { removeNotifTimeout } from '../../../functions/removeNotifTimeout'

// loading
import {Loader} from '../../Loader'
import i18next, { t } from 'i18next'

export const CreateCompetitionContentStep4 = ({data, orgID, isLeague}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const createCompetition = async () => {
        setLoading(true)
        const tempData = {...data}
        delete tempData.is_direct
        delete tempData.has_players_min

        if (isLeague) {
            delete tempData.show_games_hours
            delete tempData.number_of_groups
            delete tempData.qualified_per_group
            delete tempData.return_games_groups
            delete tempData.return_games_finals

            tempData.minutes_between_rounds = tempData.minutes_between_rounds * 24 * 60
        } else {
            delete tempData.return_games
            delete tempData.minutes_between_rounds
        }

        const date = `${new Date(tempData.start_date.day).getFullYear()}-${new Date(tempData.start_date.day).getMonth() + 1 < 10 ? '0' + (new Date(tempData.start_date.day).getMonth() + 1) : new Date(tempData.start_date.day).getMonth() + 1}-${new Date(tempData.start_date.day).getDate() < 10 ? '0' + new Date(tempData.start_date.day).getDate() : new Date(tempData.start_date.day).getDate()}T${new Date(tempData.start_date.time).getHours() < 10 ? '0' + new Date(tempData.start_date.time).getHours() : new Date(tempData.start_date.time).getHours()}:${new Date(tempData.start_date.time).getMinutes() < 10 ? '0' + new Date(tempData.start_date.time).getMinutes() : new Date(tempData.start_date.time).getMinutes()}`
        tempData.start_date = date
        tempData.organizer_id = orgID
        if (!tempData.players_min) delete tempData.players_min

        const formData = new FormData()

        for (let key in tempData) {
            formData.append(key, tempData[key])
        }

        try {
            const res = await axios({
                method: 'POST',
                url: `/api/v4/competitions/${tempData.type === 'squad'?'squad': 'solo'}/${isLeague ? 'leagues': 'tournaments'}`,
                data: formData,
                headers:{
                    'Accept-Language' : i18next.language,
                }
            })

            const successID = uuid()

            dispatch(addNotification({id: successID, type: 'success', text: 'Successfully created tournament'}))
            setLoading(false)
            dispatch(removeNotifTimeout(successID, 3000))
            navigate(`/${isLeague ? 'league' : 'tournament'}/${tempData.type === 'squad'?'squad': 'solo'}/${res.data.competition.id}`)
        } catch (error) {
            const errorID = uuid()
            let textError = 'Une erreur est survenue'
            setLoading(false)
            for (let errorField in error.response.data?.message) {
                textError = error.response.data.message[errorField]
            }

            dispatch(addNotification({id: errorID, type: 'error', text: textError +" "+ error?.response?.status}))
            dispatch(removeNotifTimeout(errorID, 3000))
        }
    }

    return !loading?(<>
        <div className={styles.createInner}>
            <div className={styles.createTop}>
                <div className={styles.createUploadWrap}>
                    {
                        data.picture ? (
                            <Img
                                className={styles.createUploadImg}
                                src={URL.createObjectURL(data.picture)}
                                alt={'photo'}
                            />
                        ) : <div className={styles.createUploadPlaceholder}/>
                    }
                </div>
                <div className={styles.createTopContent}>
                    <div className={styles.createTopName}>
                        {data.name || '(No name)'}
                    </div>
                    <div className={styles.createTopTimeWrap}>
                        <div className={styles.createTopTimeItem}>
                            <div className={styles.createTopTimeTitle}>
                                {t('date')}
                            </div>
                            <Datepicker initValue={data.start_date.day} disable/>
                        </div>
                        <div className={styles.createTopTimeItem}>
                            <div className={styles.createTopTimeTitle}>
                                {t('datetime')}
                            </div>
                            <Datepicker initValue={data.start_date.time} disable time/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.createContent}>
                <div className={styles.createContentItem}>
                    <div className={styles.createContentTitle}>
                       {t('yourRules')}
                    </div>
                    <div className={styles.createContentInner}>
                        <div className={styles.createContentInfo}>
                            <div className={styles.createContentInfoTitle}>
                                <SvgSprite spriteID={'format'}/>
                                {t('configuration')}
                            </div>
                            <div className={styles.createContentInfoText}>
                                {t('tournamentsOf')}
                                 {data.available_spots || ' ( '+t('noSpots')+' ) '} {t('teams')}, {data.number_of_groups || ' ( '+t('noGroups')+' ) '} 
                                 {t('groupsOf')}
                                  {data.available_spots && data.number_of_groups ? (data.available_spots / data.number_of_groups).toFixed() : ' ( '+t('noTeams')+' )'} {t('teams')}.
                            </div>
                        </div>
                        <div className={styles.createContentInfo}>
                            <div className={styles.createContentInfoTitle}>
                                <SvgSprite spriteID={'qualified'}/>
                                {t('qualified')}
                            </div>
                            <div className={styles.createContentInfoText}>
                                {t('firstAreQualified', {numTeams:2})}
                            </div>
                        </div>
                        <div className={styles.createContentInfo}>
                            <div className={styles.createContentInfoTitle}>
                                <SvgSprite spriteID={'arrows'}/>
                                {t('homeAway')}
                            </div>
                            <div className={styles.createContentInfoText}>
                                {t('groupsSingleGames')}, {t('finalsSingleGames')}.
                            </div>
                        </div>
                        <div className={styles.createContentInfo}>
                            <div className={styles.createContentInfoTitle}>
                                <SvgSprite spriteID={'user'}/>
                                {t('numPlayers')}
                            </div>
                            <div className={styles.createContentInfoText}>
                                {t('numPlayersFree')}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.createContentItem}>
                    <div className={styles.createContentTitle}>
                        {t('ifcRules')}
                    </div>
                    <div className={styles.createContentInner}>
                        <div className={styles.createContentInfo}>
                            <div className={styles.createContentInfoTitle}>
                                <SvgSprite spriteID={'communication'}/>
                                {t('chats')}
                            </div>
                            <div className={styles.createContentInfoText}>
                                {t('chatsRule')}
                            </div>
                        </div>
                        <div className={styles.createContentInfo}>
                            <div className={styles.createContentInfoTitle}>
                                <SvgSprite spriteID={'time'}/>
                                {t('delay')}
                            </div>
                            <div className={styles.createContentInfoText}>
                                {t('delayRule')}
                            </div>
                        </div>
                        <div className={styles.createContentInfo}>
                            <div className={styles.createContentInfoTitle}>
                                <SvgSprite spriteID={'competitions'}/>
                                {t('qualification')}
                            </div>
                            <div className={styles.createContentInfoText}>
                                {t('qualificationRule')}
                            </div>
                        </div>
                        <div className={styles.createContentInfo}>
                            <div className={styles.createContentInfoTitle}>
                                <SvgSprite spriteID={'bug'}/>
                                {t('bug')}
                            </div>
                            <div className={styles.createContentInfoText}>
                                {t('bugRule')}
                            </div>
                        </div>
                        <div className={styles.createContentInfo}>
                            <div className={styles.createContentInfoTitle}>
                                <SvgSprite spriteID={'flag'}/>
                                {t('forfeit')}
                            </div>
                            <div className={styles.createContentInfoText}>
                                {t('forfeitRule')}
                            </div>
                        </div>
                        <div className={styles.createContentInfo}>
                            <div className={styles.createContentInfoTitle}>
                                <SvgSprite spriteID={'celebration'}/>
                                {t('celebrations')}
                            </div>
                            <div className={styles.createContentInfoText}>
                                {t('celebrationsRule')}
                            </div>
                        </div>
                        <div className={styles.createContentInfo}>
                            <div className={styles.createContentInfoTitle}>
                                <SvgSprite spriteID={'logout'}/>
                                {t('leavingGame')}
                            </div>
                            <div className={styles.createContentInfoText}>
                                {t('leavingGameRule')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button className={styles.createBtn} onClick={createCompetition}>
            {
                isLeague ? t('createLaLeague') : t('createleTournament')
            }
        </button>
    </>):(<Loader />)
}
