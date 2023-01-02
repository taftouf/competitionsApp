import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

// Functions
import { getDivisionPicture } from '../../../functions/getDivisionPicture'

// Styles
import styles from './index.module.scss'

// Components
import { Img } from '../../Img'
import { CompetitionItem } from '../CompetitionItem'
import { SvgSprite } from '../../SvgSprite/SvgSprite'
import cn from 'classnames'
import { Actions } from '../../Actions'
import { useDispatch } from 'react-redux'
import { addNotification } from '../../../../store/slices/notificationsSlice'
import { removeNotifTimeout } from '../../../functions/removeNotifTimeout'
import { handleError } from '../../../functions/handleError'
import { v4 as uuid } from 'uuid'
import { fetchData } from '../../../utils/fetchData'
import { useTranslation } from 'react-i18next'

export const CompetitionTeamsItem = ({
                                         team,
                                         idx,
                                         isAdmin,
                                         type,
                                         competition,
                                         setForfeitTeam,
                                         setTeamToDelete,
                                         setTeamToReplace,
                                         setTeamToEdit,
                                         getTeams,
                                     }) => {
    
    const dispatch = useDispatch()
    const {t} = useTranslation()
     
    const actions = useRef([
        type != "solo" &&
        {
            id: 1,
            text: 'modifySquad',
            icon: 'edit',
            onClick: () => setTeamToEdit({...team}),
        },
        ((!team.roster_locked && competition.current_round) || (team.roster_locked && competition.current_round)) && {
            id: 2,
            text: 'replace',
            icon: 'replace',
            onClick: () => setTeamToReplace({...team}),
        },
        !team.roster_locked && competition.current_round && {
            id: 3,
            text: 'forfeit',
            icon: 'flag',
            onClick: () => setForfeitTeam({...team}),
        },
        {
            id: 4,
            text: 'remove',
            icon: 'remove',
            onClick: () => setTeamToDelete({...team}),
            delete: true,
        },
    ])
    
    const lock = async (lock)=>{
        try{
            const url = competition.type === "tournament" ?
                            `/api/v4/competitions/squad/tournaments/${competition.id}/registrations/${team.id}`
                        :
                            `/api/v4/competitions/squad/leagues/${competition.id}/registrations/${team.id}`
            
            await fetchData(url, {
                method: 'PATCH',
                body: JSON.stringify({
                    roster_locked: lock
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const successID = uuid()
            getTeams()
            dispatch(addNotification({id: successID, type: 'success', text: t('updatedlockRoster')}))
            dispatch(removeNotifTimeout(successID, 3000))
        } catch (error) {
            handleError(dispatch, error)
        }
    }

    return (
        <li className={styles.teamsItem}>
            {
                (isAdmin && competition.lock_rosters) &&(
                    team.roster_locked ? (
                        <div className={styles.teamsItemLocked} onClick={() => lock(false)}>
                            <SvgSprite spriteID={'locked'}/>
                        </div>
                    ) : (
                        <div className={styles.teamUnlock} onClick={() => lock(true)}>
                            <SvgSprite spriteID={'unlock'}/>
                        </div>
                    )
                )
            }
            <div className={cn(styles.teamsItemInner, {
                [styles.teamsItemInnerAdmin]: isAdmin,
            })}>
                {type === "solo" ?(
                    <div className={cn(styles.teamsItemWrap,styles.disabled)}>
                        <Img
                            className={styles.teamsImg}
                            src={team.participant.picture}
                            alt={'team'}
                        />
                        <CompetitionItem
                            text={team.participant.name}
                            name
                            auto
                        />
                    </div>
                ):(
                   <Link to={`/teams/${team.participant.id}`} className={styles.teamsItemWrap}>
                        <Img
                            className={styles.teamsImg}
                            src={team.participant.picture}
                            alt={'team'}
                        />
                        <CompetitionItem
                            text={team.participant.name}
                            name
                            auto
                        />
                    </Link> 
                )}
                
                <div className={styles.teamsBox}>
                    <Img
                        className={styles.teamsImgDivision}
                        src={getDivisionPicture(team.participant.ranking?.division)}
                        alt={'division'}
                    />
                    {
                        !isAdmin && (
                            <CompetitionItem
                                title={idx === 0 && 'Rang'}
                                text={team.participant.ranking?.rank || '-'}
                            />
                        )
                    }
                </div>
                {
                    isAdmin && <Actions actions={actions.current}/>
                }
            </div>
        </li>
    )
}
