import React, { useState } from 'react'

// Styles
import styles from './index.module.scss'

// Components
import { PageWrapper } from '../../ui/PageWrapper'
import { CreationAside } from '../../ui/CreationAside'
import { OrgInfo } from '../../ui/OrgInfo'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { addNotification } from '../../../store/slices/notificationsSlice'
import { removeNotifTimeout } from '../../functions/removeNotifTimeout'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useMobile } from '../../hooks/useMobile'
import { setTeams } from '../../../store/slices/teamsSlice'

export const CreateTeam = () => {
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isTablet = useMobile(1025)
    const [active, setActive] = useState(false)
    const teams = useSelector(state => state.teams.teams)

    const [templateData, setTemplateData] = useState({
        platform: 'ps4',
    })
    const [errors, setErrors] = useState({})

    const createOrg = async () => {
        setActive(true)
        const tempErrors = {}

        if (!templateData.name) tempErrors.name = true
        
        setErrors({...tempErrors})
        if (Object.keys(tempErrors).length > 0) {
            setActive(false)
            return
        }

        const tempData = {...templateData}
        const formData = new FormData()

        tempData.country = tempData.country.iso.toLowerCase()

        for (let key in tempData) {
            if(tempData[key])
                formData.append(key, tempData[key])
        }

        try {
            const res = await axios({
                method: 'POST',
                url: `/api/v3/teams`,
                data: formData,
                headers:{
                    'Accept-Language' : i18n.language,
                }
            })

            dispatch(setTeams([...teams, res.data.team]))
            const successID = uuid()

            dispatch(addNotification({id: successID, type: 'success', text: 'Successfully created tournament'}))
            dispatch(removeNotifTimeout(successID, 3000))
            navigate(`/teams/${res.data.team.id}`)
        } catch (error) {
            setActive(false)
            const errorID = uuid()
            let textError = ''

            if (typeof error?.response?.data?.message === 'string') {
                textError = error?.response?.data?.message
            } else {
                for (let errorField in error?.response?.data?.message) {
                    textError = error?.response?.data?.message[errorField]
                }
            }

            dispatch(addNotification({id: errorID, type: 'error', text: textError +" "+ error?.response?.status}))
            dispatch(removeNotifTimeout(errorID, 3000))
        }
        setActive(false)
    }

    return (
        <PageWrapper>
            <div className={styles.org}>
                {
                    isTablet && (
                        <div className={styles.orgTitle}>
                            {t('createTeam')}
                        </div>
                    )
                }
                <CreationAside
                    setTemplateCountry={country => setTemplateData({...templateData, country})}
                    setTemplatePlatform={platform => setTemplateData({...templateData, platform})}
                    setSocials={socials => {
                        setTemplateData({
                            ...templateData,
                            youtube: socials.youtube,
                            twitch: socials.twitch,
                            twitter: socials.twitter,
                            facebook: socials.facebook,
                        })
                    }}
                    setName={name => setTemplateData({...templateData, name})}
                    setDescription={description => setTemplateData({...templateData, description})}
                    setPicture={picture => setTemplateData({...templateData, picture})}
                    errors={errors}
                    createOrg={createOrg}
                    active={active}
                    team
                />
                {
                    !isTablet && (
                        <div className={styles.orgContent}>
                            <div className={styles.orgTitle}>
                                {t('createTeam')}
                            </div>
                            <div className={styles.orgContentWrap}>
                                <OrgInfo templateData={templateData} />
                            </div>
                        </div>
                    )
                }
            </div>
        </PageWrapper>
    )
}
