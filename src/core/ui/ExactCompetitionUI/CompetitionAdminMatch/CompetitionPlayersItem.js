import React, { useEffect, useState } from 'react'
import cn from 'classnames'

// Hooks
import { useToggle } from '../../../hooks/useToggle'
import { useInput } from '../../../hooks/useInput'
import { useMobile } from '../../../hooks/useMobile'

// Styles
import styles from './index.module.scss'

// Components
import { Img } from '../../Img'
import { CompetitionItem } from '../CompetitionItem'
import { SvgSprite } from '../../SvgSprite/SvgSprite'
import { Counter } from '../../Counter'
import { Checkbox } from '../../Checkbox'

//traduction
import { useTranslation } from 'react-i18next'

export const CompetitionPlayersItem = ({player, stats, editPlayer, idx}) => {
    const isTablet = useMobile(1025)
    const {isOpened, toggleIsOpened} = useToggle()
    const {t} = useTranslation()
    const [but, setBut] = useState(0)
    const [passes, setPasses] = useState(0)
    const [cleansheet, setCleansheet] = useState(false)
    const rating = useInput(stats.find(stat => stat.player.id === player.id)?.rating || '-')
    const [mvp, setMvp] = useState(false)

    const [editedPlayer, setEditedPlayer] = useState({})

    useEffect(() => {
        setEditedPlayer(prevState => ({
            ...prevState,
            player_id: player.id,
            goals: but,
            assists: passes,
            rating: +rating.value,
            man_of_the_match: mvp,
            clean_sheet: cleansheet,
        }))
    }, [but, passes, cleansheet, rating.value, mvp])

    useEffect(() => {
        editPlayer(editedPlayer)
    }, [editedPlayer])

    return (
        <li className={styles.matchPlayersEditItem}>
            <div className={cn(styles.matchPlayersItemBtn, {
                [styles.matchPlayersItemBtnInteractive]: isTablet,
                [styles.matchPlayersItemBtnActive]: isOpened,
            })} onClick={() => isTablet && toggleIsOpened()}>
                <div className={styles.matchPlayersItemWrap}>
                    <Img
                        className={styles.matchPlayersItemImg}
                        src={player.user.picture}
                        alt={'player'}
                    />
                    <CompetitionItem
                        text={player.user.pseudo || player.user.full_name}
                        name
                        auto
                    />
                </div>
                {
                    isTablet ? (
                        <SvgSprite className={cn(styles.matchPlayersArrow, {
                            [styles.matchPlayersArrowActive]: isOpened,
                        })} spriteID={'arrow'} />
                    ) : (<div className={styles.matchPlayersItemBox}>
                        <CompetitionItem
                            title={idx === 0 && 'Motm'}
                            auto
                            edit
                        >
                            <Checkbox
                                setIsChecked={setMvp}
                                initValue={stats.find(stat => stat.player.id === player.id)?.man_of_the_match || false}
                                toggle
                            />
                        </CompetitionItem>
                        <CompetitionItem
                            title={idx === 0 && 'Cleansh.'}
                            auto
                            edit
                        >
                            <Checkbox
                                setIsChecked={setCleansheet}
                                initValue={stats.find(stat => stat.player.id === player.id)?.clean_sheet || false}
                                toggle
                            />
                        </CompetitionItem>
                        <CompetitionItem
                            title={idx === 0 && 'Note'}
                            auto
                            edit
                        >
                            <input
                                className={styles.matchPlayersSubItemInp}
                                type={'text'}
                                value={rating.value}
                                onChange={rating.onChange}
                            />
                        </CompetitionItem>
                        <CompetitionItem
                            title={idx === 0 && 'Buts'}
                            auto
                            edit
                        >
                            <Counter setValue={setBut} initValue={stats.find(stat => stat.player.id === player.id)?.goals || 0} />
                        </CompetitionItem>
                        <CompetitionItem
                            title={idx === 0 && 'Passes D.'}
                            auto
                            edit
                        >
                            <Counter setValue={setPasses} initValue={stats.find(stat => stat.player.id === player.id)?.assists || 0} />
                        </CompetitionItem>
                    </div>)
                }
            </div>
            <div className={cn(styles.matchPlayersItemContent, {
                [styles.matchPlayersItemContentActive]: isOpened,
            })}>
                <div className={styles.matchPlayersSubItem}>
                    <div className={styles.matchPlayersSubItemText}>
                        {t('goals')}
                    </div>
                    <div className={styles.matchPlayersSubItemRight}>
                        <Counter setValue={setBut} initValue={stats.find(stat => stat.player.id === player.id)?.goals || 0} />
                    </div>
                </div>
                <div className={styles.matchPlayersSubItem}>
                    <div className={styles.matchPlayersSubItemText}>
                        {t('assists')}
                    </div>
                    <div className={styles.matchPlayersSubItemRight}>
                        <Counter setValue={setPasses} initValue={stats.find(stat => stat.player.id === player.id)?.assists || 0} />
                    </div>
                </div>
                <div className={styles.matchPlayersSubItem}>
                    <div className={styles.matchPlayersSubItemText}>
                        {t('cleansheet')}
                    </div>
                    <div className={cn(styles.matchPlayersSubItemRight, styles.matchPlayersSubItemRightPadding)}>
                        <Checkbox
                            setIsChecked={setCleansheet}
                            initValue={stats.find(stat => stat.player.id === player.id)?.clean_sheet || false}
                            toggle
                        />
                    </div>
                </div>
                <div className={styles.matchPlayersSubItem}>
                    <div className={styles.matchPlayersSubItemText}>
                        {t('gameRating')}
                    </div>
                    <div className={cn(styles.matchPlayersSubItemRight, styles.matchPlayersSubItemRightPadding)}>
                        <input
                            className={styles.matchPlayersSubItemInp}
                            type={'text'}
                            value={rating.value}
                            onChange={rating.onChange}
                        />
                    </div>
                </div>
                <div className={styles.matchPlayersSubItem}>
                    <div className={styles.matchPlayersSubItemText}>
                        {t('ManMatch')}
                    </div>
                    <div className={cn(styles.matchPlayersSubItemRight, styles.matchPlayersSubItemRightPadding)}>
                        <Checkbox
                            setIsChecked={setMvp}
                            initValue={stats.find(stat => stat.player.id === player.id)?.man_of_the_match || false}
                            toggle
                        />
                    </div>
                </div>
            </div>
        </li>
    )
}
