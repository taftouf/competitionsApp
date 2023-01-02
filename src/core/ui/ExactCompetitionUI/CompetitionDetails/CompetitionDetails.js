import React from 'react'

// Styles
import styles from './index.module.scss'

// translate
import { useTranslation } from 'react-i18next'

export const CompetitionDetails = ({data}) => {
    const {t} = useTranslation()
    return (
        <ul className={styles.details}>
            {
                data.map((item, idx) => (
                    <li className={styles.detailsItem} key={idx}>
                        <div className={styles.detailsResult}>
                            {t((item.result).replace(/\s/g,'').toLocaleLowerCase())}
                        </div>
                        <div className={styles.detailsXP}>
                            {item.xp}
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}
