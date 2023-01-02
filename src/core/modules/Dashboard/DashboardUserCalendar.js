import React, { useEffect, useState } from 'react'
//import { Link } from 'react-router-dom'

// Styles
import styles from './index.module.scss'

// Components
import { DashboardCalendarItem } from './DashboardCalendarItem'
import { Loader } from '../../ui/Loader'

import { useTranslation } from 'react-i18next'
import { fetchData } from '../../utils/fetchData'

export const DashboardUserCalendar = ({userInfo}) => {
    const [loading, setLoading] = useState(false)
    const [userCalendar, setUserCalendar] = useState([])
    const {t} = useTranslation()

    var start_date = new Date()
    var end_date = new Date(new Date().setDate(new Date().getDate() + 365))

    start_date = start_date.toISOString().substring(0, start_date.toISOString().lastIndexOf(':'))
    end_date = end_date.toISOString().substring(0, end_date.toISOString().lastIndexOf(':'))

    useEffect(() => {
        if (userInfo) {
            (async () => {
                setLoading(true)
                const res = await fetchData(`/api/v4/users/${userInfo.id}/calendar?start_date=${start_date}&end_date=${end_date}`)
                const data = await res.json()

                data.calendar && setUserCalendar([...data.calendar.slice(0, 3)])
                setLoading(false)
            })()
        }
    }, [userInfo])

    return (
        <div className={styles.dashboardContentItem}>
            {
                !loading ? (<>
                    {
                        userCalendar.length > 0 ? (<>
                            <div className={styles.dashboardTitle}>
                                {t('myCalendar')}
                            </div>
                            <div className={styles.dashboardContentCalendar}>
                                {
                                    userCalendar.map(match => (
                                        <DashboardCalendarItem
                                            key={match.game.id}
                                            competitionInfo={match.competition}
                                            gameInfo={match.game}
                                        />
                                    ))
                                }
                                {/* <div className={styles.dashboardLinkWrap}>
                                    <Link className={styles.dashboardLink} to={'/dashboard'}>
                                        {t("SeeCalendar")}
                                    </Link>
                                </div> */}
                            </div>
                        </>) : (
                            <div className={'empty-block'}>
                                {t("noGamesCome")}
                            </div>
                        )
                    }
                </>) : <Loader/>
            }
        </div>
    )
}
