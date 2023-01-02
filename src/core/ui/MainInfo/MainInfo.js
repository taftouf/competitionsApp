import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import axios from 'axios'
import { v4 as uuid } from 'uuid'

// Functions
import { getDivisionPicture } from '../../functions/getDivisionPicture'

// Images
import platform1 from '../../../assets/images/platform1.svg'
import platform2 from '../../../assets/images/platform2.svg'
import platform3 from '../../../assets/images/platform3.svg'
import platform4 from '../../../assets/images/platform4.svg'

// Styles
import styles from './index.module.scss'

// Components
import { Img } from '../Img'
import { SvgSprite } from '../SvgSprite/SvgSprite'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from '../../../store/slices/notificationsSlice'
import { removeNotifTimeout } from '../../functions/removeNotifTimeout'
import { Btn } from '../Btn'
import { Popup } from '../Popup'
import { EditInfo } from './EditInfo'
import { useNavigate } from 'react-router-dom'
import { RejoindreDialog } from './RejoindreDialog'

export const MainInfo = ({data, org, template, team, getTeam, isAdmin}) => {
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [coverImage, setCoverImage] = useState(null)
    const [mainPhoto, setMainPhoto] = useState(null)
    const [editPopup, setEditPopup] = useState(false)
    const userInfo = useSelector(state => state.user.userInfo)
    const [status, setStatus] = useState(false)
    const [dialog, setDialog] = useState(false)
    const [user, setUser] = useState()
    const [id, setId] = useState(false)
    const handleUpload = (e, setImage) => {
        if (e.target.files.length > 0) {
            const image = e.target.files[0]
            setImage(image)
        }
    }

    const getPlatformImg = platform => {
        switch (platform) {
            case 'ps4':
                return platform1
            case 'ps5':
                return platform4
            case 'xbox':
                return platform2
            case 'pc':
                return platform3
            default:
                return platform1
        }
    }

    const handleError = error => {
        const errorID = uuid()
        let textError = ''

        if (typeof error.response?.data?.message === 'string') {
            textError = error.response.data.message
        } else {
            for (let errorField in error.response?.data?.message) {
                textError = error.response?.data?.message[errorField]
            }
        }

        dispatch(addNotification({id: errorID, type: 'error', text: textError || error.message}))
        dispatch(removeNotifTimeout(errorID, 3000))
    }

    const updateTeam = async formData => {
        await axios({
            method: 'PATCH',
            url: `/api/v3/${team ? 'teams' : 'organizations'}/${data.id}`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept-Language' : i18n.language,
            },
        })
    }

    useEffect(() => {
        if (coverImage || mainPhoto) {
            (async () => {
                const formData = new FormData()

                if (mainPhoto) formData.append('picture', mainPhoto)
                if (coverImage) formData.append('cover', coverImage)

                // SHOULD REMOVE THIS LINE AFTER FIX IN BACKEND BUG HERE
                formData.append('country', data.country)

                try {
                    await updateTeam(formData)
                    const successID = uuid()

                    dispatch(addNotification({id: successID, type: 'success', text: 'Successfully updated image'}))
                    dispatch(removeNotifTimeout(successID, 3000))
                } catch (error) {
                    handleError(error)
                }
            })()
        }
    }, [coverImage, mainPhoto])
    
    const follow = async(meth)=>{
        const formData = new FormData()
        formData.append('user_id', userInfo.id)
        try {
            const url = `/api/v3/organizations/${data.id}/followers`
            await axios({
                method: meth ? 'POST' : 'DELETE',
                url: url,
                data: formData,
                headers:{
                    'Accept-Language' : i18n.language,
                }
            })
            const successID = uuid()
            getTeam()
            meth && dispatch(addNotification({id: successID, type: 'success', text: t('FollowMsg')}))
            meth && dispatch(removeNotifTimeout(successID, 3000))
        } catch (error) {
            const errorID = uuid()
            let textError = ''

            if (typeof error.response?.data?.message === 'string') {
                textError = error.response?.data?.message
            } else {
                for (let errorField in error.response?.data?.message) {
                    textError = error.response?.data?.message[errorField]
                }
            }

            dispatch(addNotification({id: errorID, type: 'error', text: textError +" "+ error?.response?.status}))
            dispatch(removeNotifTimeout(errorID, 3000))
        }
    }
    useEffect(()=>{
        setStatus(data?.member?.status || data?.player?.status)
        setUser(data?.member || data?.player)
        setId(data.id)
    }, [data])
    return (
        <div className={cn(styles.mainInfo, {
            [styles.mainInfoTemplate]: template,
        })}>
            {
                template ? (
                    <div className={styles.mainInfoOverview}>
                        {t('overviewDesktop')}
                    </div>
                ) : (
                    <Btn className={styles.mainInfoBack} onClick={() => navigate(-1)}>
                        <SvgSprite spriteID={'arrowNext'} />
                    </Btn>
                )
            }
            <div className={cn(styles.mainInfoCover, {
                [styles.mainInfoCoverTemplate]: template,
            })}>
                {
                    coverImage ? (
                        <Img
                            className={styles.mainInfoCoverImg}
                            src={URL.createObjectURL(coverImage)}
                            alt={'cover'}
                        />
                    ) : (<>
                        {
                            data.cover ? (
                                <Img
                                    className={styles.mainInfoCoverImg}
                                    src={data.cover}
                                    alt={'cover'}
                                />
                            ) : <div className={cn(styles.mainInfoCoverImgPlaceholder, {
                                [styles.mainInfoCoverImgPlaceholderTemplate]: template,
                            })} style={{
                                background: !template && data.color,
                            }}/>
                        }
                    </>)
                }
                {
                    isAdmin && !template && (
                        <label className={styles.mainInfoCoverBtn}>
                            <SvgSprite spriteID={'camera'} /> {t('ChangeCoverPhoto')}
                            <input type='file' onChange={e => handleUpload(e, setCoverImage)} accept={'.jpg, .jpeg, .png'}/>
                        </label>
                    )
                }
            </div>
            <div className={styles.mainInfoInner}>
                <div className={cn(styles.mainInfoPhotoWrap, {
                    [styles.mainInfoPhotoWrapTemplate]: template,
                })}>
                    {
                        mainPhoto ? (
                            <Img
                                className={styles.mainInfoPhoto}
                                src={URL.createObjectURL(mainPhoto)}
                                alt={'logo'}
                            />
                        ) : (
                            <Img
                                className={styles.mainInfoPhoto}
                                src={template ? data.picture ? URL.createObjectURL(data.picture) : data.picture : data.picture}
                                alt={'logo'}
                            />
                        )
                    }
                    {
                        isAdmin && !template && (
                            <label className={styles.mainInfoPhotoBtn}>
                                <SvgSprite spriteID={'camera'} />
                                <input type='file' onChange={e => handleUpload(e, setMainPhoto)} accept={'.jpg, .jpeg, .png'}/>
                            </label>
                        )
                    }
                </div>
                <div className={styles.mainInfoContent}>
                    <div className={cn(styles.mainInfoName, {
                        [styles.mainInfoNameTemplate]: template,
                    })}>
                        {data.name || t('noName')}
                    </div>
                    <div className={styles.mainInfoMore}>
                        {
                            !org && (
                                <div className={styles.mainInfoMoreItem}>
                                    <div className={styles.mainInfoMoreItemWrap}>
                                        <Img
                                            className={styles.mainInfoMoreItemImg}
                                            src={getDivisionPicture(data.ranking?.division)}
                                            alt='division'
                                        />
                                    </div>
                                    <span>Division</span>
                                </div>
                            )
                        }
                        {
                            data.ranking && (
                                <div className={styles.mainInfoMoreItem}>
                                    <div className={styles.mainInfoMoreRank}>
                                        {data.ranking?.rank}
                                    </div>
                                    <span>Rang IFC</span>
                                </div>
                            )
                        }
                        {
                            data.platform && (
                                <div className={styles.mainInfoMoreItem}>
                                    <div className={cn(styles.mainInfoMoreItemWrap, {
                                        [styles.widthPs5Div] : data.platform === 'ps5'
                                    })}>
                                        <Img
                                            className={cn(styles.mainInfoMoreItemImg, {
                                                [styles.widthPs5Img] : data.platform === 'ps5'
                                            })}
                                            src={getPlatformImg(data.platform)}
                                            alt='platform'
                                        />
                                    </div>
                                    <span>{t('platform')}</span>
                                </div>
                            )
                        }
                    </div>
                    <div className={cn(styles.btnCont,{
                        [styles.removeGrid] : !(!team && data.status === 'approved')
                    })}>
                        <div className={styles.mainInfoMembers}>
                            <SvgSprite spriteID={'members'}/>
                            {(data.player_count || data.member_count) || 0} {(data.player_count !== 1 && data.member_count !== 1) ? team? t('Joueurs') : t('members') : team? t('Joueur') : t('member')}
                        </div>
                        {/* Rejoindre */}
                        {id && (!user ||
                            status === "deleted" ||
                            (status === "rejected" && user.attempts < 3)) && (
                                <div className={cn(styles.btnFollow, styles.pointe)} onClick={()=>setDialog(true)}>
                                    {t('join')}
                                </div>
                            )
                        }
                        {( status === 'pending') && (
                            <div className={cn(styles.pendding)}>
                                {t('pendingRequest')}
                            </div>
                        )}
                        {/* Follow */}
                        {!team && data.status === 'approved' && (
                            !data.isFollowed ? (
                                <div className={cn(styles.btnFollow, styles.pointe)} onClick={()=>follow(true)}>
                                    {t('follow')}
                                </div>):(
                                    <div className={cn(styles.btnFollow, styles.pointe)} onClick={()=>follow(false)}>
                                    {t('unfollow')}
                                </div>)
                        )}
                    </div>
                    
                    {data?.status === "pending" &&(
                        <div className={styles.pendingOrg}>
                            {t('underValidation')}
                        </div>
                    )}
                    
                </div>
            </div>
            {
                isAdmin && !template && (
                    <div className={styles.mainInfoBtns}>
                        <Btn className={styles.mainInfoBtn} type={'button'} onClick={() => setEditPopup(true)}>
                           <SvgSprite spriteID={'pencil'} /> {t('EditInformation')}
                        </Btn>
                    </div>
                )
            }
            <Popup isOpenedPopup={editPopup} big closePopup={() => setEditPopup(false)}>
                <EditInfo
                    data={data}
                    closePopup={() => setEditPopup(false)}
                    updateTeam={updateTeam}
                    handleError={handleError}
                    team={team}
                    getTeam={getTeam}
                />
            </Popup>
            <Popup isOpenedPopup={dialog} big closePopup={() => setDialog(false)}>
                <RejoindreDialog 
                    data={data}
                    closePopup={() => setDialog(false)}
                    userInfo={userInfo}
                    getTeam={getTeam}
                    team={team}
                />
            </Popup>

            {/*<div className={cn(styles.mainInfoBtns, {*/}
            {/*    [styles.mainInfoBtnsTemplate]: template,*/}
            {/*})}>*/}
            {/*    {*/}
            {/*        org && (*/}
            {/*            <Btn className={styles.mainInfoBtnFollow} type={'button'}>*/}
            {/*                + {t('follow')}*/}
            {/*            </Btn>*/}
            {/*        )*/}
            {/*    }*/}
            {/*    <Btn className={styles.mainInfoBtn} type={'button'}>*/}
            {/*        {t('RequestJoinTeam')}*/}
            {/*    </Btn>*/}
            {/*</div>*/}

        </div>
    )
}
