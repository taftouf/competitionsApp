import React, { useEffect } from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Hooks
import { useToggle } from '../../hooks/useToggle'

// Components
import { SvgSprite } from '../SvgSprite/SvgSprite'
import { useInput } from '../../hooks/useInput'
import { useTranslation } from 'react-i18next'

export const CreateAsideSocials = ({setSocials, errors, data, setDataChange}) => {
    const {t} = useTranslation()
    const {isOpened, toggleIsOpened} = useToggle()
    const youtubeInp = useInput(data?.youtube || '')
    const twitchInp = useInput(data?.twitch || '')
    const twitterInp = useInput(data?.twitter || '')
    const facebookInp = useInput(data?.facebook || '')

    const socials = [
        {
            id: 1,
            icon: 'youtube',
            placeholder: 'https://youtube.com',
            input: youtubeInp,
        },
        {
            id: 2,
            icon: 'twitch',
            placeholder: 'https://twitch.com',
            input: twitchInp,
        },
        {
            id: 3,
            icon: 'twitter',
            placeholder: 'https://twitter.com',
            input: twitterInp,
        },
        {
            id: 4,
            icon: 'facebook',
            placeholder: 'https://facebook.com',
            input: facebookInp,
        },
    ]

    useEffect(() => {
        if((data?.youtube != 'null') && (youtubeInp.value != '') && (data?.youtube != youtubeInp.value) ||
            (data?.twitch != 'null') && (twitchInp.value != '') && (data?.twitch != twitchInp.value) ||
            (data?.twitter != 'null') && (twitterInp.value != '') && (data?.twitter != twitterInp.value) ||
            (data?.facebook != 'null') && (facebookInp.value != '') && (data?.facebook != facebookInp.value)
        ) setDataChange(false)
        
        setSocials({
            youtube: youtubeInp.value,
            twitch: twitchInp.value,
            twitter: twitterInp.value,
            facebook: facebookInp.value,
        })
    }, [youtubeInp.value, twitchInp.value, twitterInp.value, facebookInp.value])

    return (
        <div className={cn(styles.asideToggle, {
            [styles.asideInpError]: errors.socials,
        })}>
            <div className={cn(styles.asideToggleBtn, {
                [styles.asideToggleBtnActive]: isOpened,
            })} onClick={toggleIsOpened}>
                {t('socials')}
                <SvgSprite spriteID={'arrow'}/>
            </div>
            {
                isOpened && (
                    <div className={styles.asideToggleContent}>
                        <ul className={styles.asideSocialsList}>
                            {
                                socials.map(socialsItem => (
                                    <li className={cn(styles.asideSocialsItem, {
                                        [styles.asideSocialsItemActive]: socialsItem.input.value,
                                    })} key={socialsItem.id}>
                                        <SvgSprite spriteID={socialsItem.icon}/>
                                        <input
                                            className={cn(styles.asideInp, styles.asideSocialsInp)}
                                            type='text'
                                            placeholder={socialsItem.placeholder}
                                            value={socialsItem.input.value}
                                            onChange={socialsItem.input.onChange}
                                        />
                                        <button
                                            className={styles.asideSocialsClose}
                                            type={'button'}
                                            onClick={() => socialsItem.input.setNewValue('')}
                                        >
                                            <span/>
                                            <span/>
                                        </button>
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
