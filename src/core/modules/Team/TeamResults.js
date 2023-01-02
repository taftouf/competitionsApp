import React from 'react'
import { Link } from 'react-router-dom'

// Styles
import styles from './index.module.scss'

// Components
import { Img } from '../../ui/Img'
import { OrgItem } from '../../ui/OrgItem'
import { useTranslation } from 'react-i18next'

export const TeamResults = ({feed}) => {
    const {t} = useTranslation()

    return (
        <div className={styles.teamResults}>
            {
                feed.length > 0 ? feed.map(feedItem => (
                    <div className={styles.teamResultsItem} key={feedItem.id}>
                        <div className={styles.teamResultsTop}>
                            <Img
                                className={styles.teamResultsTopImg}
                                src={feedItem.organizer.picture}
                                alt={'team'}
                            />
                            <div className={styles.teamResultsTopContent}>
                                <div className={styles.teamResultsTopContentBox}>
                                    <Link className={styles.teamResultsTopContentLink} to={'/dashboard'}>
                                        {feedItem.organizer.name}
                                    </Link>
                                    <span>{t('finished')}</span>
                                    {/* <Img
                                        className={styles.teamResultsTopContentImg}
                                        src={feedItem.picture}
                                        alt={'feed picture'}
                                    /> */}
                                    <Link className={styles.teamResultsTopContentLink} to={`/${feedItem.type}/${feedItem.mode}/${feedItem.id}`}>
                                        {feedItem.name}
                                    </Link>
                                </div>
                                <div className={styles.teamResultsTopContentDate}>
                                    {feedItem.date.date}
                                </div>
                            </div>
                        </div>
                        <div className={styles.teamResultsContent}>
                            <div className={styles.teamResultsContentBox}>
                                <OrgItem result={feedItem.result} data={feedItem} big feed />
                            </div>
                            <div className={styles.teamResultsWinner}>
                                <Img
                                    className={styles.teamResultsWinnerImg}
                                    src={feedItem.winner.picture}
                                    alt={'team'}
                                />
                                <div className={styles.teamResultsWinnerName}>
                                    {feedItem.winner.name}
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className={'empty-block'}>
                        {t('noTeamFlow')}
                    </div>
                )
            }
        </div>
    )
}
