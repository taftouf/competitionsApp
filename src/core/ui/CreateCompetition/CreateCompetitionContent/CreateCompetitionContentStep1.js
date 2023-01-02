import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Hooks
import { useInput } from '../../../hooks/useInput'

// Components
import { Img } from '../../Img'
import { SvgSprite } from '../../SvgSprite/SvgSprite'
import { Checkbox } from '../../Checkbox'
import { Datepicker } from '../../Datepicker'

import { useTranslation } from 'react-i18next'
import { Select } from '../../Select'

export const CreateCompetitionContentStep1 = ({data, setResult, setNextStep, isLeague}) => {
    const nameInp = useInput('')
    const [uploadedFile, setUploadedFile] = useState(null)
    const [hasReward, setHasReward] = useState(false)
    const [isInternational, setIsInternational] = useState(false)
    const [showGameHours, setShowGameHours] = useState(false)
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [gameType, setGameType] = useState(null)

    const [errors, setErrors] = useState({})
    const {t} = useTranslation()

    const gameTypeItems = useRef([
        {
            id: 1,
            name: t('squad'),
            value: 'squad',
        },
        {
            id: 2,
            name: t('solo'),
            value: 'solo',
        },
    ])

    const checkFields = () => {
        const tempErrors = {}

        if (!nameInp.value) tempErrors.name = true
        if (!uploadedFile) tempErrors.picture = true

        setErrors({...tempErrors})
        if (Object.keys(tempErrors).length > 0) return

        setNextStep()
    }

    const handleUpload = e => {
        if (e.target.files.length > 0) {
            const image = e.target.files[0]
            setUploadedFile(image)
        }
    }

    useEffect(() => {
        setResult({
            picture: uploadedFile,
            name: nameInp.value,
            is_international: isInternational,
            has_reward: hasReward,
            show_games_hours: showGameHours,
            start_date: {
                day: date,
                time: time,
            },
            type : gameType,
        })
    }, [uploadedFile, nameInp.value, hasReward, isInternational, showGameHours, date, time, gameType])

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            setUploadedFile(data.picture)
            nameInp.setNewValue(data.name)
            setHasReward(data.has_reward)
            setIsInternational(data.is_international)
            setShowGameHours(data.show_games_hours)
            setDate(data.start_date.day)
            setTime(data.start_date.time)
            setGameType(data.type)
        }
    }, [])

    return (<>
        <div className={styles.createInner}>
            <div className={styles.createTop}>
                <div className={styles.createUploadWrap}>
                    {
                        uploadedFile ? (
                            <Img
                                className={styles.createUploadImg}
                                src={URL.createObjectURL(uploadedFile)}
                                alt={'photo'}
                            />
                        ) : <div className={cn(styles.createUploadPlaceholder, {
                            [styles.createError]: errors.picture,
                        })}/>
                    }
                    <label className={styles.createUploadButton}>
                        <SvgSprite spriteID={'pencil'}/>
                        <input type='file' onChange={handleUpload} accept={'.jpg, .jpeg, .png'}/>
                    </label>
                </div>
                <div className={styles.createTopContent}>
                    <input
                        className={cn(styles.createTopNameInp, {
                            [styles.createError]: errors.name,
                        })}
                        type={'text'}
                        value={nameInp.value}
                        onChange={nameInp.onChange}
                        placeholder={t('tournamentName')}
                    />
                    <div className={styles.createTopTimeWrap}>
                        <div className={styles.createTopTimeItem}>
                            <div className={styles.createTopTimeTitle}>
                                {t('date')}
                            </div>
                            <Datepicker initValue={date} setDateTime={setDate} />
                        </div>
                        <div className={styles.createTopTimeItem}>
                            <div className={styles.createTopTimeTitle}>
                                {t('datetime')}
                            </div>
                            <Datepicker initValue={time} setDateTime={setTime} time />
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={cn(styles.createItem, styles.createItemToggle)}
                onClick={() => setHasReward(!hasReward)}
            >
                <span>{t('cashPrize')}</span>
                <Checkbox
                    initValue={hasReward}
                    setIsChecked={setHasReward}
                    disableClick
                    toggle
                />
            </div>
            <Select
                className={cn(styles.createItem, styles.createItemSelect)}
                initValue={gameType}
                values={gameTypeItems.current}
                setNewValue={setGameType}
                text={t('competitionType')}
            />
            <div
                className={cn(styles.createItem, styles.createItemToggle)}
                onClick={() => setIsInternational(!isInternational)}
            >
                <span>{t('internationalCompetition')}</span>
                <Checkbox
                    initValue={isInternational}
                    disableClick
                    toggle
                />
            </div>
            {
                !isLeague && (<>
                    <div
                        className={cn(styles.createItem, styles.createItemToggle)}
                        onClick={() => setShowGameHours(!showGameHours)}
                    >
                        <span>{t('displayDates')} </span>
                        <Checkbox
                            initValue={showGameHours}
                            disableClick
                            toggle
                        />
                    </div>
                    <div className={styles.createText}>
                        {t('gamesDate')}
                    </div>
                </>)
            }
        </div>
        <button className={styles.createBtn} onClick={checkFields}>
            {t('next')}
        </button>
    </>)
}
