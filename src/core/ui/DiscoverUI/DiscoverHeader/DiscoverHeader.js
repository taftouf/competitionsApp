import React,{ useState } from 'react'
import { Link } from 'react-router-dom'

// Styles
import styles from './index.module.scss'

// Components
import { Btn } from '../../Btn'
import { SvgSprite } from '../../SvgSprite/SvgSprite'
import { Popup } from '../../Popup'
import { CreerPopup } from '../../Header/CreerPopup'

import { useTranslation } from 'react-i18next'
import { useMobile } from '../../../hooks/useMobile'


export const DiscoverHeader = ({backTo}) => {
    const {t} = useTranslation()
    const MOBILE_WIDTH = 769
    const isMobile = useMobile(MOBILE_WIDTH)
    const [creer, setCreer] = useState(false)
    return (
        <header className={styles.header}>
            <Link className={styles.headerBack} to={backTo}>
                <SvgSprite spriteID={'arrow'} />
            </Link>
            <Btn className={styles.headerCreate} onClick={() => setCreer(true)}>
                {!isMobile && (<>+ {t('create')}</>)}
            </Btn>
            <Popup isOpenedPopup={creer} closePopup={() => setCreer()}>
                <CreerPopup setCreer={setCreer}/>
            </Popup>
        </header>
    )
}
