import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import debounce from 'lodash.debounce'

// Styles
import styles from './index.module.scss'

// Hooks
import { useToggle } from '../../hooks/useToggle'

// Components
import { SvgSprite } from '../SvgSprite/SvgSprite'
import { useTranslation } from 'react-i18next'
import { fetchData } from '../../utils/fetchData'

export const CreateAsideCountry = ({setTemplateCountry, initData, setDataChange}) => {
    const {t} = useTranslation()
    const {isOpened, toggleIsOpened} = useToggle()
    const [searchValue, setSearchValue] = useState('')
    const input = useRef()

    const [countries, setCountries] = useState([])
    const [allCountries, setAllCountries] = useState([])
    const [activeCountry, setActiveCountry] = useState({
        value: '-',
        iso: '-',
    })

    const changeCountry = country => {
        toggleIsOpened()
        setActiveCountry({
            value: country.name,
            iso: country.code,
        })
        setCountries([...allCountries])
    }

    const onChange = e => setSearchValue(e?.target?.value)
    const debounceChange = debounce(onChange, 200)

    useEffect(() => {
        setCountries(allCountries.filter(country => country.name.toLowerCase().includes(searchValue.toLowerCase())))
    }, [searchValue])

    useEffect(() => {
        (async () => {
            const res = await fetchData('/api/v3/meta/countries')
            const data = await res.json()
            const tempCountries = [...data.countries].sort((a, b) => a.name > b.name ? 1 : -1)

            const initCountry = tempCountries.find(country => country.code === (initData?.code?.toLowerCase() || 'fr'))
            setActiveCountry({
                value: initCountry.name,
                iso: initCountry.code,
            })
            setCountries([...tempCountries])
            setAllCountries([...tempCountries])
        })()
    }, [])

    useEffect(() => {
        if (input.current) input.current.focus()
    }, [isOpened, input])

    useEffect(() => {
        setTemplateCountry(activeCountry)
        if(activeCountry.iso.toLowerCase() != '-' &&  activeCountry.iso.toLowerCase() != initData?.country.toLowerCase()) setDataChange(false)
    }, [activeCountry])

    return (
        <div className={styles.asideToggle}>
            <div className={cn(styles.asideToggleBtn, {
                [styles.asideToggleBtnActive]: isOpened,
            })} onClick={toggleIsOpened}>
                {activeCountry.value}
                <SvgSprite spriteID={'arrow'} />
            </div>
            {
                isOpened && (
                    <div className={styles.asideToggleContent}>
                        <input
                            ref={input}
                            className={styles.asideInp}
                            type={'text'}
                            placeholder={t('search')}
                            onChange={debounceChange}
                        />
                        <ul className={styles.asideCountriesList}>
                            {
                                countries.map(country => (
                                    <li
                                        className={styles.asideCountriesItem}
                                        key={country.code}
                                        onClick={() => changeCountry(country)}
                                    >
                                        {country.name}
                                        {
                                            country.name === activeCountry.value && (
                                                <SvgSprite spriteID={'check'} />
                                            )
                                        }
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
