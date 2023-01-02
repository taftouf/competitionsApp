import React, { useEffect, useState } from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Hooks
import { useToggle } from '../../hooks/useToggle'

// Images
import platform1 from '../../../assets/images/platform1.svg'
import platform2 from '../../../assets/images/platform2.svg'
import platform3 from '../../../assets/images/platform3.svg'
import platform1Active from '../../../assets/images/platform1-active.svg'
import platform2Active from '../../../assets/images/platform2-active.svg'
import platform3Active from '../../../assets/images/platform3-active.svg'

// Components
import { SvgSprite } from '../SvgSprite/SvgSprite'
import { Img } from '../Img'
import { useTranslation } from 'react-i18next'

export const CreateAsidePlatform = ({setTemplatePlatform, data, setDataChange}) => {
    const {t} = useTranslation()
    const {isOpened, toggleIsOpened} = useToggle()
    const [activePlatform, setActivePlatform] = useState(data?.platform || 'ps4')
    const [platforms, setPlatforms] = useState([
        {
            id: 1,
            active: true,
            name: 'Ps4',
            value: 'ps4',
            photo: platform1,
            photoActive: platform1Active,
        },
        {
            id: 2,
            name: 'Ps5',
            value: 'ps5',
            photo: platform1,
            photoActive: platform1Active,
        },
        {
            id: 3,
            name: 'Xbox',
            value: 'xbox',
            photo: platform2,
            photoActive: platform2Active,
        },
        {
            id: 4,
            name: 'PC',
            value: 'pc',
            photo: platform3,
            photoActive: platform3Active,
        },
    ])

    const changePlatform = platform => {
        const tempPlatforms = [...platforms]

        tempPlatforms.forEach(platformItem => {
            platformItem.active = platformItem.id === platform.id
        })

        setPlatforms([...tempPlatforms])
        setActivePlatform(platform.value)
        toggleIsOpened()
    }

    useEffect(() => {
        setTemplatePlatform(activePlatform)
        if(activePlatform != data?.platform) setDataChange(false)
    }, [activePlatform])

    return (
        <div className={styles.asideToggle}>
            <div className={cn(styles.asideToggleBtn, {
                [styles.asideToggleBtnActive]: isOpened,
            })} onClick={toggleIsOpened}>
                {t('choosePlatform')}
                <SvgSprite spriteID={'arrow'} />
            </div>
            {
                isOpened && (
                    <div className={styles.asideToggleContent}>
                        <ul className={styles.asidePlatformsList}>
                            {
                                platforms.map(platform => (
                                    <li
                                        className={cn(styles.asidePlatformsItem, {
                                        [styles.asidePlatformsItemActive]: platform.active,
                                    })}
                                        key={platform.id}
                                        onClick={() => changePlatform(platform)}
                                    >
                                        <Img
                                            className={styles.asidePlatformsImg}
                                            src={platform.active ? platform.photoActive : platform.photo}
                                            alt={'platform'}
                                        />
                                        {platform.name}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    )
}
