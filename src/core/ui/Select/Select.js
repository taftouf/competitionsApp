import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'

// Hooks
import { useToggle } from '../../hooks/useToggle'

// Styles
import styles from './index.module.scss'

// Components
import { SvgSprite } from '../SvgSprite/SvgSprite'

export const Select = ({className,btnSwith, initValue, setNewValue, setNewName, values, text, selectFullWidth}) => {
    const {t} = useTranslation()

    const [selectData, setSelectData] = useState([
        {
            id: 1,
            name: 'upcoming',
            value: 'future',
        },
        {
            id: 2,
            name: 'live',
            value: 'live',
        },
        {
            id: 3,
            name: 'completed',
            value: 'past',
        },
    ])

    const select = useRef()
    const {isOpened, toggleIsOpened} = useToggle()
    const [activeName, setActiveName] = useState('')
    const [activeValue, setActiveValue] = useState('')
    const [setInitValue, setSetInitValue] = useState(false)

    const changeValue = select => {
        setActiveName(select.name)
        setActiveValue(select.value)
        toggleIsOpened()
    }

    useEffect(() => {
        if (!setInitValue && values) {
            setSelectData([...values])
            if (initValue) {
                setActiveName(values.find(item => item.value === initValue).name)
                setActiveValue(values.find(item => item.value === initValue).value)
                setSetInitValue(true)
            } else {
                setActiveName(values[0].name)
                setActiveValue(values[0].value)
            }
        } else if (!values) {
            setActiveName(selectData[0].name)
            setActiveValue(selectData[0].value)
        } else if (values.length !== selectData.length || !values.every((item, idx) => item === selectData[idx])) {
            setSelectData([...values])
            setActiveName(values[0].name)
            setActiveValue(values[0].value)
        }
    }, [values, initValue])

    useEffect(() => {
        if (activeValue) {
            setNewValue(selectData.find(filter => filter.name === activeName).value)
            if (setNewName) setNewName(selectData.find(filter => filter.name === activeName).name)
        }
    }, [activeValue])

    const handleClick = e => {
        if (isOpened && !select.current.contains(e.target)) {
            toggleIsOpened()
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)

        return () => document.removeEventListener('click', handleClick)
    }, [isOpened])

    return (
        <div ref={select} className={cn(styles.select, {
            [styles.selectContent]: text,
            [styles.selectOpened]: isOpened,
            [className]: className,
        })}>
            <div className={cn(styles.selectActive, {
                [styles.selectActiveOpened]: isOpened,
                [styles.selectActiveFull]: selectFullWidth,
                [styles.btnSwith]: btnSwith,
            })} onClick={toggleIsOpened}>
                {
                    text && (
                        <div className={styles.selectText}>
                            {text}
                        </div>
                    )
                }
                <span>{t(activeName)}</span>
                <SvgSprite spriteID={'arrow'} />
            </div>
            {
                isOpened && (
                    <div className={styles.selectDrop}>
                        {
                            selectData.map(select => (
                                <div
                                    className={cn(styles.selectItem, {
                                        [styles.selectItemActive]: select.value === activeValue,
                                        [styles.selectItemRight]: text,
                                    })}
                                     key={select.id}
                                     onClick={() => changeValue(select)}
                                >
                                    {t(select.name)}
                                    {
                                        select.value === activeValue && <SvgSprite spriteID={'check'} />
                                    }
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}
