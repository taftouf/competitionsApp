import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'
import { CompetitionTeamsSearch } from './CompetitionTeamsSearch'
import { SvgSprite } from '../../SvgSprite/SvgSprite'

export const CompetitionTeamsReplacePopup = ({replaceTeam, team, checkTeams, setTeamToReplace}) => {
    return team && (<>
        <div className={cn(styles.teamsPopupTitle, styles.teamsPopupTitleClose)}>
            Remplacer {team.participant.name}
            <button className={styles.teamsPopupTitleBtn} type={'button'} onClick={setTeamToReplace}>
                <SvgSprite spriteID={'close'} />
            </button>
        </div>
        <div className={styles.teamsPopupContent}>
            <CompetitionTeamsSearch checkTeams={checkTeams} replaceTeam={replaceTeam} />
        </div>
    </>)
}
