import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Components
import { Img } from '../Img'

import { useTranslation } from 'react-i18next'

export const Tabs = ({setActiveTab, initTabs, richly, high}) => {
    const [tabs, setTabs] = useState([])
    const [activeID, setActiveID] = useState()
    const {t} = useTranslation()

    const tabsData = useRef([
        {
            id: 1,
            name: 'tournaments',
            value: 'tournament',
        },
        {
            id: 2,
            name: 'leagues',
            value: 'league',
        },
    ])

    useEffect(() => {
        if (tabs.length > 0) {
            setActiveID(tabs.find(tab => tab.active)?.id || tabs[0].id)
        }
    }, [tabs])

    useEffect(() => {
        const tempTabs = []

        if (initTabs) {
            initTabs.forEach(tab => !tab.hide && tempTabs.push(tab))
        }

        if (tempTabs.length > 0) setTabs(tempTabs)
        else setTabs(tabsData.current)
    }, [initTabs])

    useEffect(() => {
        if (activeID) {
            setActiveTab(tabs.find(filter => filter.id === activeID).value)
        }
    }, [activeID])

    return (
        <div className={cn(styles.tabs, {
            [styles.tabsRichly]: richly,
            [styles.tabsHigh]: high,
        })}>
            {
                tabs.map(tab => (
                    <div className={cn(styles.tabsItem, {
                        [styles.tabsItemActive]: tab.id === activeID,
                    })} key={tab.id}
                        onClick={() => setActiveID(tab.id)}
                    >
                        {
                            tab.photo && (
                                <Img
                                    className={styles.tabsImg}
                                    src={tab.photo}
                                    alt={'team'}
                                />
                            )
                        }
                        {t(tab.name)}
                    </div>
                ))
            }
        </div>
    )
}
