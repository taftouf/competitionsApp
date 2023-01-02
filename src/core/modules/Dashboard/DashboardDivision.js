import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

// Functions
import { getDivisionPicture } from '../../functions/getDivisionPicture'

// Styles
import styles from './index.module.scss'

// Components
import { Img } from '../../ui/Img'

// import { useTranslation } from 'react-i18next'
import { fetchData } from '../../utils/fetchData'

export const DashboardDivision = ({divisionInfo}) => {
    const [divisionTeams, setDivisionTeams] = useState([])

    // const {t} = useTranslation()

    useEffect(() => {
        (async () => {
            const res = await fetchData(`/api/v4/squad/ranking?week=${divisionInfo.week}&offset=${divisionInfo.rank-5}`)
            const data = await res.json()

            const divisionsTemp = []

            data.ranking.forEach((division, idx) => {
                if (division.id === divisionInfo.id) {
                    if (data.ranking[idx - 1]) divisionsTemp.push({...data.ranking[idx - 1], positionRank: divisionInfo.rank - 1})
                    divisionsTemp.push({...data.ranking[idx], positionRank: divisionInfo.rank})
                    if (data.ranking[idx + 1]) divisionsTemp.push({...data.ranking[idx + 1], positionRank: divisionInfo.rank + 1})
                }
            })

            setDivisionTeams([...divisionsTemp])
        })()
    }, [])

    return (<>
        <div className={styles.dashboardSubtitle}>
            Division
            <Img
                className={styles.dashboardSubtitleImg}
                src={getDivisionPicture(divisionInfo.division)}
                alt='division'
            />
        </div>
        {
            divisionTeams.length > 0 && divisionTeams.map((division, idx) => (
                <div className={cn(styles.dashboardDivisionItem, {
                    [styles.dashboardDivisionItemActive]: division.id === divisionInfo.id,
                })} key={division.id}>
                    <div className={styles.dashboardTableDivisionRank}>
                        {division.positionRank}
                    </div>
                    <Link className={cn(styles.dashboardTableInfo, {
                        [styles.cursorInit] : !division?.entity?.active
                    })} to={division.entity.active ? `/teams/${division?.entity?.id}` : ""}>
                        <Img
                            className={styles.dashboardTableInfoImg}
                            src={division.entity.picture}
                            alt='team picture'
                        />
                        <span>{division.entity.name}</span>
                    </Link>
                    <div className={styles.dashboardTableRank}>
                        {division.rank}
                        {
                            idx === 0 && (
                                <div className={styles.dashboardTableRankName}>
                                    Rang
                                </div>
                            )
                        }
                    </div>
                    <div className={styles.dashboardTableXP}>
                        {division.xp} xp
                    </div>
                </div>
            ))
        }
        <div className={styles.dashboardLinkWrap}>
            {/* <div className={styles.dashboardLink}>
                {t('SeeAllTeamDivisions')}
            </div> */}
        </div>
    </>)
}
