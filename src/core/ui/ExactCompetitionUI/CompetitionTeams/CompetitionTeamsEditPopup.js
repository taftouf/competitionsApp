import React, { useEffect, useState } from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Components
import { SvgSprite } from '../../SvgSprite/SvgSprite'
import { Img } from '../../Img'
import { CompetitionItem } from '../CompetitionItem'
import { fetchData } from '../../../utils/fetchData'
import { Loader } from '../../Loader'

import { useTranslation } from 'react-i18next'

export const CompetitionTeamsEditPopup = ({editTeam, team, setTeamToEdit, type, competitionType, id}) => {
    const [loading, setLoading] = useState(false)
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [existsPlayers, setExistsPlayers] = useState([])
    const [notExistsPlayers, setNotExistsPlayers] = useState([])
    const [checkTeams, setCheckTeams] = useState([])

    const {t} = useTranslation()
    const movePlayer = (fromArr, setFromArr, toArr, setToArr, id) => {
        const playerIndex = fromArr.findIndex(player => player.id === id)
        const tempToArr = [...toArr]
        const tempFromArr = [...fromArr]

        tempToArr.push({...fromArr[playerIndex]})
        tempFromArr.splice(playerIndex, 1)
        setToArr([...tempToArr])
        setFromArr([...tempFromArr])

        setDisabledBtn(false)
    }

    const groupIDs = () => {
        const playersIDs = []
        existsPlayers.forEach(player => playersIDs.push(player.id))

        editTeam(playersIDs)
        setTeamToEdit(false)
    }

    useEffect(() => {
        if (existsPlayers.length === 0) setDisabledBtn(true)
    }, [existsPlayers])

    useEffect(() => {
        if (team) {
            (async () => {
                setLoading(true)
                const res = await fetchData(`/api/v4/competitions/${type}/${competitionType}/${id}/roster?team_id=${team.participant.id}`)
                const data = await res.json()

                setCheckTeams([...data.roster])

                if (data.roster.length === 0) setLoading(false)
            })()
        }
    }, [team])

    useEffect(() => {
        if (checkTeams.length > 0 || !loading) {
            (async () => {
                const res = await fetchData(`/api/v4/teams/${team.participant.id}/players?status=approved`)
                const data = await res.json()

                const tempExistsPlayers = data.players.filter(player => checkTeams.find(checkTeam => checkTeam.id === player.id))
                const tempNotExistsPlayers = data.players.filter(player => !checkTeams.find(checkTeam => checkTeam.id === player.id))

                setExistsPlayers([...tempExistsPlayers])
                setNotExistsPlayers([...tempNotExistsPlayers])
                setLoading(false)
            })()
        }
    }, [checkTeams])

    return team && (<>
        <div className={cn(styles.teamsPopupTitle, styles.teamsPopupTitleClose)}>
            {t('leagueRoster')}
            <button className={styles.teamsPopupTitleBtn} type={'button'} onClick={setTeamToEdit}>
                <SvgSprite spriteID={'close'} />
            </button>
        </div>
        {
            !loading ? (
                <div className={styles.teamsPopupContent}>
                    {
                        existsPlayers.length > 0 ? (
                            <div className={styles.teamsPopupPlayersListWrap}>
                                <ul className={styles.teamsPopupPlayersList}>
                                    {
                                        existsPlayers.map(player => (
                                            <li className={styles.teamsContentItem} key={player.id}>
                                                <div className={styles.teamsItemWrap}>
                                                    <Img
                                                        className={styles.teamsImg}
                                                        src={player.user.picture}
                                                        alt={'team'}
                                                    />
                                                    <CompetitionItem
                                                        text={player.user.pseudo || player.user.full_name}
                                                        name
                                                        auto
                                                    />
                                                </div>
                                                <div className={styles.teamsBox}>
                                                    <button
                                                        className={styles.teamsPlayerBtn}
                                                        type={'button'}
                                                        onClick={() => movePlayer(existsPlayers, setExistsPlayers, notExistsPlayers, setNotExistsPlayers, player.id)}
                                                    >
                                                        <SvgSprite spriteID={'minus'} />
                                                    </button>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ) : <div className={'empty-block'}>{t('noExistingPlayers')}</div>
                    }
                    {
                        notExistsPlayers.length > 0 ? (
                            <div className={cn(styles.teamsPopupPlayersListWrap, styles.teamsPopupPlayersListWrapGray)}>
                                <ul className={styles.teamsPopupPlayersList}>
                                    {
                                        notExistsPlayers.map(player => (
                                            <li className={styles.teamsContentItem} key={player.id}>
                                                <div className={styles.teamsItemWrap}>
                                                    <Img
                                                        className={styles.teamsImg}
                                                        src={player.user.picture}
                                                        alt={'team'}
                                                    />
                                                    <CompetitionItem
                                                        text={player.user.pseudo || player.user.full_name}
                                                        name
                                                        auto
                                                    />
                                                </div>
                                                <div className={styles.teamsBox}>
                                                    <button
                                                        className={cn(styles.teamsPlayerBtn, styles.teamsPlayerBtnPlus)}
                                                        type={'button'}
                                                        onClick={() => movePlayer(notExistsPlayers, setNotExistsPlayers, existsPlayers, setExistsPlayers, player.id)}
                                                    >
                                                        <SvgSprite spriteID={'plus'} />
                                                    </button>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ) : <div className={'empty-block'}>{t('noExistingPlayers')}</div>
                    }
                    <div className={styles.teamsPopupBtns}>
                        <button
                            className={cn(styles.teamsPopupBtn, styles.teamsPopupBtnGray)}
                            type={'button'}
                            onClick={setTeamToEdit}
                        >
                            {t('cancel')}
                        </button>
                        <button className={cn(styles.teamsPopupBtn, {
                            [styles.teamsBtnBottomDisabled]: disabledBtn,
                        })} type={'button'} onClick={groupIDs}>
                            {t('saveLineup')}
                        </button>
                    </div>
                </div>
            ) : <Loader />
        }
    </>)
}
