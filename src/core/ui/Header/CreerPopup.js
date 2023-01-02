

import React, {useState} from 'react'
import cn from 'classnames'
import { useNavigate } from "react-router-dom";

import { Btn } from '../Btn'
// Styles
import styles from './index.module.scss'
// icons
import { SvgSprite } from '../SvgSprite/SvgSprite'
import { useSelector } from 'react-redux'
import { SelectOrg } from './SelectOrg';

import { useTranslation } from 'react-i18next'

export const CreerPopup = ({setCreer}) => {
    const allOrgs = useSelector(state => state.orgs.orgs)
    const allTeams = useSelector(state => state.teams.teams)
    const navigate = useNavigate()
    const [filterValue, setFilterValue] = useState()
    const [type, setType] = useState()
    const {t} = useTranslation()
    const [orgs] = useState(allOrgs.filter(org => org.status === "approved"))
    
    return (
        <>
        <div className={cn(styles.teamsPopupTitle, styles.teamsPopupTitleClose)}>
            {t('create')} 
            <button className={styles.teamsPopupTitleBtn} type={'button'} onClick={()=>setCreer(false)}>
                <SvgSprite spriteID={'close'} />
            </button>
        </div>
        <div className={styles.teamsPopupContent}>
            <Btn 
                className={styles.creerPopupBtn} 
                onClick={()=> navigate('/new-team')}
                disable={allTeams.length >= 5}
            >
                <SvgSprite className={styles.svgPopup}  spriteID={'popupCreerEquipe'} />
                <div className={styles.textPopupBtn}>{t("team")}</div>
            </Btn>
            <Btn 
                className={styles.creerPopupBtn} 
                onClick={()=> navigate('/new-org')}
                disable={allOrgs.length >= 5}
            > 
                <SvgSprite className={styles.svgPopup}  spriteID={'popupCreerOrga'} />
               <div className={styles.textPopupBtn}>{t("org")}</div> 
            </Btn>
        </div>
        {orgs.length > 0 && (
            <div className={styles.creerPopupExtraContent}>
                <p className={styles.headline}>{t("or")}</p>
                <div className={styles.teamsPopupContent}>
                    <Btn 
                        className={cn(styles.creerPopupBtn,
                       {[styles.activePopup]: type === 'tournoi'})}
                        onClick={()=>setType('tournoi')}>
                        <SvgSprite className={styles.svgPopupLigue}  spriteID={'popupCreerLigue'} />
                        <div className={styles.textPopupBtn}>{t("tournament")}</div> 
                    </Btn>
                    <Btn 
                        className={cn(styles.creerPopupBtn,
                        {[styles.activePopup]: type === 'ligue'})}
                        onClick={()=>setType('ligue')}
                        
                    >
                    <SvgSprite className={styles.svgPopupLigue}  spriteID={'popupCreerLigue'} />
                    <div className={styles.textPopupBtn}>{t("league")}</div>
                    </Btn>
                </div>
                <div className={styles.creerPopupSelect}>
                    <div className={styles.textPopup1}>
                         {t("selectOrg")}
                    </div>
               
                    <SelectOrg
                        setFilterValue = {setFilterValue}
                        values={orgs} />
                    <div className={styles.textPopup2}>
                        {t("mustHaveOrg")}
                    </div>
                        
                </div>
                <div className={styles.validerPopup}>
                    <Btn 
                        className={cn(styles.validBtn, {
                            [styles.validActive]:type&&filterValue,
                            [styles.valid]:!type||!filterValue})} 
                        onClick={()=> {navigate(type === 'ligue'?`/new-league/${filterValue}`:`/new-tournament/${filterValue}`); setCreer(false)}}>
                            {t("validate")}
                    </Btn>
                </div>
               
            </div>
        )}
       
    </>
    )
}