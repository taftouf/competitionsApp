import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Components
import { SvgSprite } from '../../SvgSprite/SvgSprite'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const CompetitionItem = ({title, text, auto, name, big, id, general, children, edit}) => {
    const {t} = useTranslation()
    return (
        <div className={cn(styles.item, {
            [styles.itemName]: name,
            [styles.itemAuto]: auto,
            [styles.itemBig]: big,
            [styles.itemEdit]: edit,
        })}>
            {title && <div className={styles.itemTitle}>{t(title)}</div>}
            {
                typeof text === 'boolean' ? <SvgSprite spriteID={'check'} /> : name && general?(<Link to={`/teams/${id}`}>{text}</Link> ):text
            }
            {
                children && children
            }
        </div>
    )
}
