import React from 'react'

// Styles
import styles from './index.module.scss'

export const CompetitionDetails = ({data}) => {
    return (
        <ul className={styles.details}>
            {
                data.map((item, idx) => (
                    <li className={styles.detailsItem} key={idx}>
                        <div className={styles.detailsResult}>
                            {item.result}
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
