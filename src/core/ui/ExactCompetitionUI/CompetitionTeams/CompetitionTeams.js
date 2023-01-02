import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

// Styles
import styles from './index.module.scss'

// Functions
import { fetchData } from '../../../utils/fetchData'

// Slices
import { addNotification } from '../../../../store/slices/notificationsSlice'
import { removeNotifTimeout } from '../../../functions/removeNotifTimeout'

// Components
import { Select } from '../../Select'
import { Loader } from '../../Loader'
import { CompetitionTeamsItem } from './CompetitionTeamsItem'
import { SvgSprite } from '../../SvgSprite/SvgSprite'
import { Popup } from '../../Popup'
import { CompetitionTeamsCalendarPopup } from './CompetitionTeamsCalendarPopup'
import { CompetitionTeamsForfeitPopup } from './CompetitionTeamsForfeitPopup'
import { CompetitionTeamsDeletePopup } from './CompetitionTeamsDeletePopup'
import { CompetitionTeamsReplacePopup } from './CompetitionTeamsReplacePopup'
import { CompetitionTeamsEditPopup } from './CompetitionTeamsEditPopup'

import { useTranslation } from 'react-i18next'
import { CompetitionTeamsAddPopup } from './CompetitionTeamsAddPopup'

export const CompetitionTeams = ({data, withGroup, rounds, type, limit, setLimit, id, setCompetition, competitionType, competition, isCompetitionAdmin}) => {
    const isAdmin = useSelector(state => state.user.isAdmin) || isCompetitionAdmin
    const dispatch = useDispatch()

    const {t} = useTranslation()

    const [calendarPopup, setCalendarPopup] = useState(false)
    const [forfeitTeam, setForfeitTeam] = useState()
    const [teamToDelete, setTeamToDelete] = useState()
    const [teamToReplace, setTeamToReplace] = useState()
    const [teamToEdit, setTeamToEdit] = useState()
    const [teamToAdd, setTeamToAdd] = useState()

    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(false)

    const [newTeam, setNewTeam] = useState()
    const [offset, setOffset] = useState(limit >= 10 ?limit-10:0)
    const [all, setAll] = useState(false)
    const [batch, setBatch] = useState(false)
    const [filterItems, setFilterItems] = useState([])
    const [filterValue, setFilterValue] = useState(rounds && rounds[0])

    const getTeams = async group => {
        setBatch(true)
        var res
        if(!all){
            res = await fetchData(`/api/v4/competitions/${type}/${competitionType}/${id}/registrations?${group ? `group=${group}&` : ''}limit=${limit}&offset=${offset}`)
        }else{
            res = await fetchData(`/api/v4/competitions/${type}/${competitionType}/${id}/registrations?${group ? `group=${group}&` : ''}`)
        }
        const data = await res.json()
        setLimit(data.count)
        setTeams([...data.registrations].reverse())

        if(offset-10 >= 0){
            setOffset(offset-10)
            setBatch(false)
        }else{
            if(offset > 0 && !all) setBatch(false)
            else setBatch(true)
            setAll(true)
        }
    }

    const showNotifications = (res, data, text) => {
        if (res.ok) {
            setCalendarPopup(false)
            const successID = uuid()

            dispatch(addNotification({id: successID, type: 'success', text}))
            dispatch(removeNotifTimeout(successID, 3000))
        } else {
            const errorID = uuid()

            dispatch(addNotification({id: errorID, type: 'error', text: data.message}))
            dispatch(removeNotifTimeout(errorID, 3000))
        }
    }

    const setCalendar = async () => {
        const res = await fetchData(`/api/v4/competitions/${type}/${competitionType}/${id}/games`, {
            method: 'PUT',
        })
        const data = await res.json()
        if(data.ok)
            setCompetition(data.competition)
        showNotifications(res, data, 'Successfully set calendar')
    }

    const setForfeit = async () => {
        const res = await fetchData(`/api/v4/competitions/${type}/${competitionType}/${id}/registrations/${forfeitTeam.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                status: 'forfeited',
            }),
        })
        const data = await res.json()

        setForfeitTeam()
        showNotifications(res, data, 'Successfully changed team status')
    }

    const deleteTeam = async () => {
        const res = await fetchData(`/api/v4/competitions/${type}/${competitionType}/${id}/registrations/${teamToDelete.id}`, {
            method: 'DELETE',
        })
        if(res.ok){
            setTeams(teams => teams.filter((item) => item.id !== teamToDelete.id))
        }
        setTeamToDelete()
        showNotifications(res, data, 'Successfully deleted team')
    }

    const replaceTeam = async teamID => {
        const formData = new FormData();
        formData.append("participant_id", teamID);
        const res = await fetchData(`/api/v4/competitions/${type}/${competitionType}/${id}/registrations/${teamToReplace.id}`, {
            method: 'PATCH',
            body: formData
        })
        const data = await res.json()
        const newTeams = teams.filter((item) => item.id !== teamToReplace.id)
        setTeams([...newTeams,data.registration])
        showNotifications(res, data, 'Successfully replaced team')
    }

    const editTeam = async playersIDs => {
        const res = await fetchData(`/api/v4/competitions/${type}/${competitionType}/${id}/roster?team_id=${teamToEdit.participant.id}`, {
            method: 'POST',
            body: JSON.stringify({
                player_ids: playersIDs,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()

        showNotifications(res, data, 'Successfully edited team')
    }

    useEffect(() => {
        if (withGroup && rounds) {
            const tempItems = []

            rounds.forEach((round, idx) => {
                tempItems.push({
                    id: idx,
                    name: round,
                    value: round,
                })
            })

            setFilterItems([...tempItems])
        }
    }, [rounds])

    useEffect(() => {
        if (withGroup) {
            (async () => {
                setLoading(true)
                await getTeams(filterValue)
                setLoading(false)
            })()
        } 
        // else setTeams([...data])
    }, [filterValue])

    useEffect(() => {
        (async ()=>{
            setLoading(true)
            await getTeams()
            setLoading(false)
        })()
        
    }, [limit])

    useEffect(()=>{
        if(newTeam){
            setTeams(teams=>[...teams, newTeam])
        }
    },[newTeam])
    return (
        <>
            {
                withGroup && filterItems.length > 0 && !isAdmin && (
                    <div className={styles.teamsFilterWrap}>
                        <Select values={filterItems} setNewValue={setFilterValue}/>
                    </div>
                )
            }
            {
                !loading && teams.length > 0 ? (
                    <ul className={styles.teams}>
                        {
                            teams.map((team, idx) => (
                                <CompetitionTeamsItem
                                    key={team.id}
                                    team={team}
                                    idx={idx}
                                    type={type}
                                    isAdmin={isAdmin}
                                    competition={competition}
                                    setForfeitTeam={setForfeitTeam}
                                    setTeamToDelete={setTeamToDelete}
                                    setTeamToReplace={setTeamToReplace}
                                    setTeamToEdit={setTeamToEdit}
                                    getTeams={getTeams}
                                />
                            ))
                        }
                        {!(all && batch) && 
                            <div className={styles.viewPlus}>
                                <button
                                    className={cn(styles.teamsBtnBottomStyle, {
                                        [styles.teamsBtnBottomDisabledStyle]: batch,
                                    })}
                                    type={'button'}
                                    onClick={() => getTeams()}
                                >
                                    {t('voirPlus')}
                                </button>
                            </div>
                        }
                    </ul>
                ):loading ? <Loader/> :!isCompetitionAdmin && (<div className={styles.messageVide}>{t('noTeams')}</div>)
            }
            {
                isAdmin && (
                    <div className={styles.teamsBtns}>
                        {
                            !competition.current_round && (
                                <button
                                    className={cn(styles.teamsBtnBottom, {
                                        [styles.teamsBtnBottomDisabled]: teams.length <= 1,
                                    })}
                                    type={'button'}
                                    onClick={() => setCalendarPopup(true)}
                                >
                                    {t('generateSchedule')}
                                </button>
                            )
                        }
                        <button
                            className={cn(styles.teamsBtnBottom, {
                                [styles.teamsBtnBottomDisabled]: limit===competition.available_spots|| teams.length === competition.available_spots,
                            })}
                            type={'button'}
                            onClick={() => setTeamToAdd(true)}
                        >
                            <SvgSprite spriteID={'plus'}/>
                            {t('addParticipants')} {limit === 0 ? teams.length: limit}/{competition.available_spots}
                        </button>
                    </div>
                )
            }
            <Popup isOpenedPopup={calendarPopup} closePopup={() => setCalendarPopup(false)} small>
                <CompetitionTeamsCalendarPopup
                    setCalendar={setCalendar}
                    setCalendarPopup={setCalendarPopup}
                />
            </Popup>
            <Popup isOpenedPopup={forfeitTeam} closePopup={() => setForfeitTeam()}>
                <CompetitionTeamsForfeitPopup
                    team={forfeitTeam}
                    setForfeit={setForfeit}
                    setForfeitTeam={() => setForfeitTeam()}
                />
            </Popup>
            <Popup isOpenedPopup={teamToDelete} closePopup={() => setTeamToDelete()}>
                <CompetitionTeamsDeletePopup
                    team={teamToDelete}
                    deleteTeam={deleteTeam}
                    setTeamToDelete={() => setTeamToDelete()}
                />
            </Popup>
            <Popup isOpenedPopup={teamToReplace} closePopup={() => setTeamToReplace()}>
                <CompetitionTeamsReplacePopup
                    team={teamToReplace}
                    replaceTeam={replaceTeam}
                    checkTeams={teams}
                    setTeamToReplace={() => setTeamToReplace()}
                />
            </Popup>
            <Popup isOpenedPopup={teamToEdit} closePopup={() => setTeamToEdit()}>
                <CompetitionTeamsEditPopup
                    team={teamToEdit}
                    editTeam={editTeam}
                    checkTeams={teams}
                    setTeamToEdit={() => setTeamToEdit()}
                    type={type}
                    competitionType={competitionType}
                    id={id}
                />
            </Popup>
            <Popup isOpenedPopup={teamToAdd} closePopup={setTeamToAdd}>
                <CompetitionTeamsAddPopup
                    id={id}
                    competitionType={competitionType}
                    type={type}
                    checkTeams={teams}
                    setTeamToAdd={setTeamToAdd}
                    setNewTeam={setNewTeam}/>
            </Popup>
        </>)
}
