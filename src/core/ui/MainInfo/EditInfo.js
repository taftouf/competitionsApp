import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

// Styles
import styles from './index.module.scss'

// Components
import { CreationAside } from '../CreationAside'
import { addNotification } from '../../../store/slices/notificationsSlice'
import { removeNotifTimeout } from '../../functions/removeNotifTimeout'
import { useDispatch } from 'react-redux'

export const EditInfo = ({data, closePopup, handleError, updateTeam, team, getTeam}) => {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const [templateData, setTemplateData] = useState({
        name: data.name,
        platform: data.platform,
        country: data.country,
        youtube: data.youtube,
        twitch: data.twitch,
        twitter: data.twitter,
        facebook: data.facebook,
        discord: data.discord,
    })

    const editOrg = async () => {
        const tempErrors = {}

        if (!templateData.name) tempErrors.name = true
        if (!templateData.discord && !team) tempErrors.discord = true
        
        setErrors({...tempErrors})
        if (Object.keys(tempErrors).length > 0) return

        const tempData = {...templateData}
        const formData = new FormData()

        tempData.country = tempData.country.iso.toLowerCase()

        for (let key in tempData) {
            if(tempData[key])
                formData.append(key, tempData[key])
        }

        try {
            await updateTeam(formData)
            const successID = uuid()

            dispatch(addNotification({id: successID, type: 'success', text: 'Successfully updated'}))
            dispatch(removeNotifTimeout(successID, 3000))
            getTeam()
            closePopup()
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <div className={styles.mainInfoEdit}>
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
                setDiscord={discord => setTemplateData({...templateData, discord})}
                setDescription={description => setTemplateData({...templateData, description})}
                setPicture={picture => setTemplateData({...templateData, picture})}
                setCover={cover => setTemplateData({...templateData, cover})}
                data={data}
                team={team}
                errors={errors}
                edit
                closePopup={closePopup}
                editOrg={editOrg}
            />
        </div>
    )
}
