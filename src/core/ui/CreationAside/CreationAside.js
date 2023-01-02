import React, { useEffect, useState } from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Hooks
import { useInput } from '../../hooks/useInput'

// Components
import { Img } from '../Img'
import { SvgSprite } from '../SvgSprite/SvgSprite'
import { useTranslation } from 'react-i18next'
import { CreateAsideCountry } from './CreateAsideCountry'
import { CreateAsidePlatform } from './CreateAsidePlatform'
import { CreateAsideSocials } from './CreateAsideSocials'
import { useNavigate } from 'react-router-dom'

import { Btn } from '../../ui/Btn'


export const CreationAside = ({
                                  setTemplateCountry,
                                  setTemplatePlatform,
                                  setSocials,
                                  setName,
                                  setDiscord,
                                  setDescription,
                                  errors,
                                  createOrg,
                                  setPicture,
                                  setCover,
                                  team,
                                  edit,
                                  data,
                                  closePopup,
                                  editOrg,
                                  active,
                              }) => {
    const {t} = useTranslation()
    const navigate = useNavigate()

    const orgName = useInput(data?.name || '')
    const discordLink = useInput(data?.discord || '')
    const description = useInput(data?.description || '')
    const [uploadedFile, setUploadedFile] = useState(null)
    const [uploadedCoverFile, setUploadedCoverFile] = useState(null)
    const [dataChange, setDataChange] = useState(true)

    const handleUpload = (e, setFile) => {
        if (e.target.files.length > 0) {
            const image = e.target.files[0]
            setFile(image)
        }
    }

    useEffect(() => {
        if(data?.name != orgName.value) setDataChange(false)
        setName(orgName.value)
    }, [orgName.value])

    useEffect(() => {
        if (!team) {
            setDiscord(discordLink.value)
            if(data?.discord != discordLink.value) setDataChange(false)
        }
    }, [discordLink.value])

    useEffect(() => {
        if((data?.description != 'null') && (description.value != '') && (data?.description != description.value)) setDataChange(false)
        setDescription(description.value)
    }, [description.value])

    useEffect(() => {
        if (uploadedFile) {
            setPicture(uploadedFile)
            setDataChange(false)
        }
    }, [uploadedFile])

    useEffect(() => {
        if (uploadedCoverFile){
            setCover(uploadedCoverFile)
            setDataChange(false)
        }
    }, [uploadedCoverFile])

    return (
        <aside className={cn(styles.aside, {
            [styles.asideEdit]: edit,
        })}>
            {
                !edit ? (<>
                    <button className={styles.asideClose} type={'button'} onClick={() => navigate('/dashboard')}>
                        <span/>
                        <span/>
                    </button>
                    <div className={styles.asideTitle}>
                        {t('completeInfo')}
                    </div>
                </>) : (
                    <div className={styles.asideTop}>
                        <button className={styles.asideClose} type={'button'} onClick={closePopup}>
                            <span/>
                            <span/>
                        </button>
                        <div className={styles.asideTitle}>
                            {t('EditTeam')}
                        </div>
                    </div>
                )
            }
            {
                edit && (
                    <div className={styles.asideSubtitle}>
                        {t('teamPicture')}
                    </div>
                )
            }
            <div className={styles.asideUploadWrap}>
                <label className={styles.asideUpload}>
                    {
                        (uploadedFile || data?.picture) ? (<>
                            <Img
                                className={styles.asideUploadImg}
                                src={uploadedFile ? URL.createObjectURL(uploadedFile) : data.picture}
                                alt={'photo'}
                            />
                            <div className={cn(styles.asideUploadBtn, styles.asideUploadBtnEdit)}>
                                <SvgSprite spriteID={'pencil'}/>
                            </div>
                        </>) : (
                            <div className={styles.asideUploadBtn}>
                                <SvgSprite spriteID={'camera'}/>
                            </div>
                        )
                    }
                    <input
                        className={styles.asideUploadInp}
                        type='file'
                        accept={'.jpg, .jpeg, .png'}
                        onChange={e => handleUpload(e, setUploadedFile)}
                    />
                </label>
            </div>
            {
                edit && (<>
                    <div className={styles.asideSubtitle}>
                        {t('coverPicture')}
                    </div>
                    <div className={cn(styles.asideUploadWrap, styles.asideUploadWrapCover)}>
                        <label className={styles.asideUpload}>
                            {
                                (uploadedCoverFile || data?.cover) ? (<>
                                    <Img
                                        className={styles.asideUploadImg}
                                        src={uploadedCoverFile ? URL.createObjectURL(uploadedCoverFile) : data.cover}
                                        alt={'photo'}
                                    />
                                    <div className={cn(styles.asideUploadBtn, styles.asideUploadBtnEdit)}>
                                        <SvgSprite spriteID={'pencil'}/>
                                    </div>
                                </>) : (
                                    <div className={styles.asideUploadBtn}>
                                        <SvgSprite spriteID={'camera'}/>
                                    </div>
                                )
                            }
                            <input
                                className={styles.asideUploadInp}
                                type='file'
                                accept={'.jpg, .jpeg, .png'}
                                onChange={e => handleUpload(e, setUploadedCoverFile)}
                            />
                        </label>
                    </div>
                    <div className={styles.asideSubtitle}>
                        {t('teamInformation')}
                    </div>
                </>)
            }
            <div className={styles.asideItem}>
                <input
                    className={cn(styles.asideInp, {
                        [styles.asideInpError]: errors.name,
                    })}
                    type={'text'}
                    placeholder={team ? t('teamNameInp') : t('orgNameInp')}
                    value={orgName.value}
                    onChange={orgName.onChange}
                />
            </div>
            <div className={styles.asideItem}>
                <CreateAsideCountry initData={data} setTemplateCountry={setTemplateCountry} setDataChange={setDataChange}/>
            </div>
            {
                !team && (
                    <div className={styles.asideItem}>
                        <input
                            className={cn(styles.asideInp, {
                                [styles.asideInpError]: errors.discord,
                            })}
                            type={'text'}
                            placeholder={t('discordInp')}
                            value={discordLink.value}
                            onChange={discordLink.onChange}
                        />
                        <div className={styles.asideText}>
                            {t('discordText')}
                        </div>
                    </div>
                )
            }
            {team && (<div className={styles.asideItem}>
                <CreateAsidePlatform data={data} setTemplatePlatform={setTemplatePlatform} setDataChange={setDataChange}/>
            </div>)}
            <div className={styles.asideItem}>
                <CreateAsideSocials data={data} errors={errors} setSocials={setSocials} setDataChange={setDataChange}/>
            </div>
            <div className={styles.asideItem}>
                <textarea
                    className={cn(styles.asideInp, styles.asideTextarea, {
                        [styles.asideInpError]: errors.description,
                    })}
                    placeholder={'Description'}
                    value={description.value}
                    onChange={description.onChange}
                />
                <div className={styles.asideText}>
                    {t('descriptionText')}
                </div>
            </div>
            {
                edit ? (
                    <Btn 
                        className={styles.asideBtn} 
                        type={'button'} 
                        onClick={editOrg}
                        disable={dataChange}>
                        {t('commitChanges')}
                    </Btn>
                ) : (
                    <button 
                        className={cn(styles.asideBtn,{
                            [styles.activeBtn] : active,
                        })} 
                        type={'button'} 
                        onClick={createOrg}>
                        {team ? t('createTeam') : t('createOrganization')}
                    </button>
                )
            }
        </aside>
    )
}
