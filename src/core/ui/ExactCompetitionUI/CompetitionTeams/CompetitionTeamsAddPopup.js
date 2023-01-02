import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'
import { CompetitionTeamsSearch } from './CompetitionTeamsSearch'
import { SvgSprite } from '../../SvgSprite/SvgSprite'
import { useTranslation } from 'react-i18next'

export const CompetitionTeamsAddPopup = ({id, setTeamToAdd, checkTeams, type, competitionType,setNewTeam}) => {
    const {t} = useTranslation()
    
    return (<>
        <div className={cn(styles.teamsPopupTitle, styles.teamsPopupTitleClose)}>
            { t('addParticipants') }
            <button className={styles.teamsPopupTitleBtn} type={'button'} onClick={()=>setTeamToAdd(false)}>
                <SvgSprite spriteID={'close'} />
            </button>
        </div>
        <div className={styles.teamsPopupContent}>
            <CompetitionTeamsSearch
                checkTeams={checkTeams}
                type={type}
                competitionType={competitionType}
                competitionID={id}
                setNewTeam={setNewTeam}
            />
        </div>
    </>)
}
