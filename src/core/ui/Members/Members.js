import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Components
import { Select } from '../Select'
import { Loader } from '../Loader'
import { Img } from '../Img'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Actions } from '../Actions'
import { Popup } from '../Popup'
import { MembersChangeRole } from './MembersChangeRole'
import { MembersChangePosition } from './MembersChangePosition'
import { MembersRemove } from './MembersRemove'
import { setPositionsData } from '../../functions/setPositionsData'
import { setRolesData } from '../../functions/setRolesData'
import { MembersAccepts } from './MembersAccepts'
import { MembersRejected } from './MembersRejected'

export const Members = ({membersRole, membersCompose, org, template, id, getTeam, team, status, admin}) => {
    const dispatch = useDispatch()
    const isAdmin = ( admin === true ? admin : useSelector(state => state.user.isAdmin) )
    const positions = useSelector(state => state.teams.positions)
    const roles = useSelector(state => state.teams.roles)
    const {t} = useTranslation()

    const [members, setMembers] = useState([])
    const [filterValue, setFilterValue] = useState('role')
    const [changeRole, setChangeRole] = useState(false)
    const [changePosition, setChangePosition] = useState(false)
    const [removeMember, setRemoveMember] = useState(false)
    const [activeMember, setActiveMember] = useState()
    const [acceptMember, setAcceptMember] = useState(false)
    const [rejectedMember, setRejectedMember] = useState(false)

    const filters = useRef([
        {
            id: 1,
            name: 'roleView',
            value: 'role',
        },
        {
            id: 2,
            name: 'lineupView',
            value: 'composition',
        },
    ])

    const actions = useRef([
        {
            id: 1,
            text: 'changeRole',
            icon: 'changeRole',
            onClick: () => setChangeRole(true),
        },
        team && {
            id: 2,
            text: 'changePosition',
            icon: 'changePosition',
            onClick: () => setChangePosition(true),
        },
        {
            id: 3,
            text: 'leaveteam',
            icon: 'logout',
            onClick: () => setRemoveMember(true),
            delete: true,
        },
    ])

    const pendingActions = useRef([
        {
            id: 1,
            text: 'approve',
            icon: 'changeRole',
            onClick: () => setAcceptMember(true),
        },
        {
            id: 2,
            text: 'dismiss',
            icon: 'logout',
            onClick: () => setRejectedMember(true),
            delete: true,
        },
    ])

    useEffect(() => {
        switch (filterValue) {
            case 'role':
                return setMembers([...membersRole])
            case 'composition':
                return setMembers([...membersCompose])
            default:
                return setMembers([...membersRole])
        }
    }, [filterValue, membersCompose, membersRole])

    useEffect(() => {
        (async () => {
            if (roles.length === 0 && positions.length === 0) {
                await Promise.all([
                    dispatch(setPositionsData()),
                    dispatch(setRolesData()),
                ])
            }
        })()
    }, [])

    return (
        <div className={styles.members}>
            <div className={styles.membersTop}>
                {team?t('Joueurs'):t('members')}
            </div>
            {
                !org && (
                    <div className={styles.membersFilterWrap}>
                        <Select setNewValue={setFilterValue} values={filters.current}/>
                    </div>
                )
            }
            {
                status != 'pending' ?(<>
                    {
                        members.length > 0 || template ? (
                            <div className={styles.membersContent}>
                                {
                                    members.length > 0 ? members.map(membersItem => {
                                        const members = membersItem.players || membersItem.members
                                        
                                        return members.find(m => m.status === 'approved') && (
                                            <div className={styles.membersRole} key={membersItem.role.text}>
                                                <div className={styles.membersContentTitle}>
                                                    {membersItem.role.text}
                                                </div>
                                                <div className={styles.membersContentItems}>
                                                    {
                                                        members.map(member => (member.status === 'approved') &&(
                                                            <div className={cn(styles.membersContentItem, {
                                                                [styles.membersContentItemAdmin]: isAdmin,
                                                            })} key={member.id}>
                                                                <div
                                                                    className={styles.membersContentItemWrap}
                                                                    key={member.id}
                                                                    state={[id, member.id]}>
                                                                    <Img
                                                                        className={styles.membersContentItemImg}
                                                                        src={member.user.picture}
                                                                        alt={'player'}
                                                                    />
                                                                    {member.user.pseudo || `${member.user.first_name} ${member.user.last_name}`}
                                                                </div>
                                                                {
                                                                    isAdmin && <Actions
                                                                        setActiveItem={() => setActiveMember(member)}
                                                                        actions={actions.current}
                                                                    />
                                                                }
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }) : <div className={'empty-block'}>{t('noMembers')}</div>
                                }
                                {
                                    members.length > 0 && isAdmin && members.map(membersItem => {
                                        const members = membersItem.players || membersItem.members
                                        const pendingMember = members.filter(m => m.status === 'pending')
                                        return pendingMember.length > 0 && (
                                            <div className={styles.membersRole} key={membersItem.role.text}>
                                                <div className={styles.membersContentTitle}>
                                                    {t('pendingMembers')}
                                                </div>
                                                <div className={styles.membersContentItems}>
                                                    {
                                                        pendingMember.map(member => (
                                                            <div className={cn(styles.membersContentItem, {
                                                                [styles.membersContentItemAdmin]: isAdmin,
                                                            })} key={member.id}>
                                                                <div
                                                                    className={styles.membersContentItemWrap}
                                                                    key={member.id}
                                                                    state={[id, member.id]}>
                                                                    <Img
                                                                        className={styles.membersContentItemImg}
                                                                        src={member.user.picture}
                                                                        alt={'player'}
                                                                    />
                                                                    {member.user.pseudo || `${member.user.first_name} ${member.user.last_name}`}
                                                                </div>
                                                                {
                                                                    isAdmin && <Actions
                                                                        setActiveItem={() => setActiveMember(member)}
                                                                        actions={pendingActions.current}
                                                                    />
                                                                }
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) : <Loader />
                    }
                </>):(
                    <div className={styles.pending}>{t('noMembers')}</div>
                )
            }
            <Popup isOpenedPopup={changeRole} closePopup={() => setChangeRole(false)}>
                <MembersChangeRole
                    data={roles}
                    member={activeMember}
                    closePopup={() => setChangeRole(false)}
                    id={id}
                    getTeam={getTeam}
                    team={team}
                />
            </Popup>
            <Popup isOpenedPopup={changePosition} closePopup={() => setChangePosition(false)}>
                <MembersChangePosition
                    data={positions}
                    member={activeMember}
                    closePopup={() => setChangePosition(false)}
                    id={id}
                    getTeam={getTeam}
                    team={team}
                />
            </Popup>
            <Popup isOpenedPopup={removeMember} closePopup={() => setRemoveMember(false)}>
                <MembersRemove
                    member={activeMember}
                    closePopup={() => setRemoveMember(false)}
                    id={id}
                    getTeam={getTeam}
                    team={team}
                />
            </Popup>
            <Popup isOpenedPopup={acceptMember} closePopup={() => setAcceptMember(false)}>
                <MembersAccepts
                    member={activeMember}
                    closePopup={() => setAcceptMember(false)}
                    id={id}
                    getTeam={getTeam}
                    team={team}
                />
            </Popup>
            <Popup isOpenedPopup={rejectedMember} closePopup={() => setRejectedMember(false)}>
                <MembersRejected
                    member={activeMember}
                    closePopup={() => setRejectedMember(false)}
                    id={id}
                    getTeam={getTeam}
                    team={team}
                />
            </Popup>
        </div>
    )
}
