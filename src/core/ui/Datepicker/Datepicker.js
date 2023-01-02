import React, { useEffect, useState } from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Components
import DatePicker from 'react-datepicker'
import { SvgSprite } from '../SvgSprite/SvgSprite'

export const Datepicker = ({time, setDateTime, initValue, disable}) => {
    const [date, setDate] = useState(new Date().setHours(21,0))
    const [initDate, setInitDate] = useState(new Date())

    useEffect(() => {
        setDateTime && setDateTime(date)
    }, [date])

    useEffect(() => {
        if (initValue) setInitDate(new Date(initValue))
    }, [initValue])

    return (
        <div className={styles.date}>
            {
                time ? (<>
                    <SvgSprite spriteID={'time'} />
                    <DatePicker
                        className={cn(styles.dateEL, {
                            [styles.dateELDisabled]: disable,
                        })}
                        selected={initDate}
                        onChange={date => setDate(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={5}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                    />
                </>) : (<>
                    <SvgSprite spriteID={'calendar'} />
                    <DatePicker
                        className={cn(styles.dateEL, {
                            [styles.dateELDisabled]: disable,
                        })}
                        selected={initDate}
                        onChange={date => setDate(date)}
                        dateFormat={'d MMMM yyyy'}
                    />
                </>)
            }
        </div>
    )
}
