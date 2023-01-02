import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

// Styles
import styles from './index.module.scss'

// Components
import { Img } from '../Img'

import { useTranslation } from 'react-i18next'

export const OrgItem = ({data, small, withName, join, big, feed, to, className, maxHeigth, result}) => {
    const {t} = useTranslation()
    
    return (
        <Link to={result ? "" : to || `/organizations/${data.id}`} className={cn(styles.orgItem, {
            [styles.orgItemSmall]: small,
            [styles.orgItemBig]: big,
            [className]: className,
            [styles.maxHeigth] : maxHeigth,
        })}>
            {
               data.registered_participants !== undefined || join  ? (
                    <div className={styles.orgItemTeam}>
                        {data.followers || data.registered_participants || 0} {join ? t('followers') : data?.mode === 'solo' ? t('Joueurs') : t('teams')}
                    </div>
                ) : <></>
            }

            <div className={styles.orgItemImgWrap}>
                <Img
                    className={styles.orgItemImg}
                    src={data.picture}
                    alt='organization'
                />
            </div>
            {
                join ? (
                    <div className={styles.orgItemBottom}>
                        <div>{data.name}</div>
                        {/* <div className={styles.orgItemJoin}>
                            {data.followers || 0} {t('followers')} 
                        </div> */}
                    </div>
                ) : (
                    <div className={styles.orgItemBottom}>
                        {
                            withName ? data.name : (<>
                                {
                                    big && (
                                        <div className={cn(styles.orgItemBottomName, {
                                            [styles.orgItemBottomNameFeed]: feed,
                                        })}>
                                            {result? result :data.name}
                                        </div>
                                    )
                                }
                                {
                                    !feed && <>Le {data.start_date.date}</>
                                }
                            </>)
                        }
                    </div>
                )
            }
        </Link>
    )
}
