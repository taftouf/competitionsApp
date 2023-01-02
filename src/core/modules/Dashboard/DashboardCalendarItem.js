import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Components
import { Img } from '../../ui/Img'
import { useSelector } from 'react-redux'

export const DashboardCalendarItem = ({competitionInfo, gameInfo, slice}) => {
    const userTeams = useSelector(state => state.teams.teams)
    const userInfo = useSelector(state => state.user.userInfo)

    return (
        <div className={styles.dashboardCompetitionItem}>
            <div className={styles.dashboardCompetitionHead}>
                {/* <Img
                    className={styles.dashboardCompetitionPhoto}
                    src={competitionInfo.picture}
                    alt='competition'
                /> */}
                <Link className={styles.dashboardCompetitionName}
                      to={competitionInfo.type === 'tournament' ? `/competitions/${competitionInfo.mode}/tournament/${competitionInfo.id}` : `/competitions/${competitionInfo.mode}/league/${competitionInfo.id}`}
                >
                    {competitionInfo.name}
                </Link>
                <div className={styles.dashboardCompetitionGroup}>
                    {gameInfo.section?.name || gameInfo.round.name}
                </div>
            </div>
            <div className={styles.dashboardCompetitionGame}>
                <Link to={competitionInfo.mode === 'solo'?"":`/teams/${gameInfo.home.id}`}
                    className={cn(styles.dashboardCompetitionGameTeam, styles.dashboardCompetitionGameTeamHome, {
                        [styles.dashboardCompetitionGameTeamActive]: userTeams.find(team => team.id === gameInfo.home.id) || gameInfo.home.id === userInfo.id
                    })}
                    style={{cursor:`${competitionInfo.mode==='solo'?'auto':'pointer'}`}}>
                    {gameInfo.home.name.length > 6 && slice ? gameInfo.home.name.slice(0, 6) + '...' : gameInfo.home.name}
                    <Img
                        className={styles.dashboardCompetitionGameImg}
                        src={gameInfo.home.picture}
                        alt='team picture'
                    />
                </Link>
                <Link 
                    to={`/competitions/${competitionInfo.mode}/${competitionInfo.type}/${competitionInfo.id}/game/${
                        gameInfo.id
                    }${competitionInfo.mode === 'solo' ? `/${gameInfo.round.name}` : ''}`}
                    className={styles.dashboardCompetitionGameDate}>
                    <span>{gameInfo.date.iso}</span>
                    <span>{gameInfo.date.time}</span>
                </Link>
                <Link to={competitionInfo.mode === 'solo'?"":`/teams/${gameInfo.visitors.id}`}
                    className={cn(styles.dashboardCompetitionGameTeam, styles.dashboardCompetitionGameTeamVisitor, {
                        [styles.dashboardCompetitionGameTeamActive]: userTeams.find(team => team.id === gameInfo.visitors.id) || gameInfo.visitors.id === userInfo.id
                    })}
                    style={{cursor:`${competitionInfo.mode==='solo'?'auto':'pointer'}`}}>
                    <Img
                        className={styles.dashboardCompetitionGameImg}
                        src={gameInfo.visitors.picture}
                        alt='team picture'
                    />
                     {gameInfo.visitors.name.length > 6 && slice ? gameInfo.visitors.name.slice(0, 6) + '...' : gameInfo.visitors.name}
                </Link>
            </div>
        </div>
    )
}
