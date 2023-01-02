import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Images
import logo from '../../../assets/images/logo.png'

// Styles
import styles from './index.module.scss'

// Components
import { OrgItem } from '../OrgItem'

import { useTranslation } from 'react-i18next'

export const FollowedOrgs = () => {
    const followedOrgs = useSelector(state => state.orgs.followedOrgs)

    const {t} =  useTranslation()

    return followedOrgs.length > 0 ? (<>
        <div className={styles.followedOrgsWrap}>
            <div className={styles.followedOrgsSubtitle}>
                {t("TheOrganizers")}
                <Link className={styles.followedOrgsSubtitleLink} to={'/organizations/followed'}>
                        {t("viewAll")}
                </Link>   
            </div>
            <div className={styles.followedOrgsList}>
                <Link to={'/organizations'} className={styles.followedOrgsExplore}>
                        <div className={styles.followedOrgsExploreImgWrap}>
                            <img className={styles.followedOrgsExploreImg} src={logo} alt='logo'/>
                        </div>
                        <div className={styles.followedOrgsExploreText}>
                            <div className={styles.followedOrgsExplorePlus}>
                                <span/>
                                <span/>
                            </div>
                            {t('explore')}
                        </div>
                    </Link>
                {
                    followedOrgs.map(follow => (
                        <div className={styles.followedOrgsItem} key={follow.id}>
                            <OrgItem className={styles.followedOrgsItemInner} data={follow} withName/>
                        </div>
                    ))
                }
            </div>
        </div>
    </>) : (
        <div className={'empty-block'}>
           {t("NoSubscription")}
        </div>
    )
}
