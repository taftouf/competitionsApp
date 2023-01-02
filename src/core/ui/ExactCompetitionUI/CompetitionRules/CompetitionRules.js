import React from 'react'

// Styles
import styles from './index.module.scss'

export const CompetitionRules = ({data}) => {
    return (
        <ul className={styles.rules}>
            {
                data.map((item, idx) => (
                    <li className={styles.rulesItem} key={idx}>
                        <div className={styles.rulesTitle}>
                            {item.title}
                        </div>
                        <div className={styles.rulesText}>
                            {item.text}
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}
