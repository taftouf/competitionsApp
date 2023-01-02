import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

// Hooks
import { useMobile } from '../../../hooks/useMobile'

// Styles
import styles from './index.module.scss'

import { Popup } from '../../Popup'

// Components
import { Img } from '../../Img'
import { SvgSprite } from '../../SvgSprite/SvgSprite'
import { CompetitionMatchForfeitPopup } from './CompetitionMatchForfeitPopup'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

export const CompetitionMatch = ({
                                     data,
                                     flag,
                                     competitionID,
                                     type,
                                     round,
                                     competitionType,
                                     isAdmin,
                                     setActiveGameID,
                                     adminView,
                                     homeInput,
                                     visitorInput,
                                     setIsForfeited,
                                     adminStyle,
                                     changeScores,
                                     isForfeited,
                                     userTeams,
                                     havePermissions,
                                 }) => {
    const isTablet = useMobile(769)

    const {t} = useTranslation()

    const [forfeitedTeams, setForfeitedTeams] = useState([false, false])
    const [forfeitPopup, setForfeitPopup] = useState(false)
    const [prevState, setPrevState] = useState([])
    const [forfeitToSet, setForfeitToSet] = useState([])
    const [changedValues, setChangedValues] = useState(false)
    const userInfo = useSelector(state => state.user.userInfo)
    const [score_1, setScore_1] =useState(data.score_1 !=null ? data.score_1 : ( data.home_score_1 != null ? data.home_score_1 : data.visitors_score_1 ) )
    const [score_2, setScore_2] =useState(data.score_2 !=null ? data.score_2 : ( data.home_score_2 != null ? data.home_score_2 : data.visitors_score_2 ) )
    const [name, setName] = useState()
    const handleBlur = (value, setNewValue) => {
        if (value < 0) setNewValue(0)
    }

    useEffect(() => {
        if (typeof data.score_1 === 'number' || typeof data.score_2 === 'number') {
            if (!data.score_1 && data.home_score_1 === null)
                setForfeitedTeams([true, false])
            else if (!data.score_2 && data.visitors_score_1 === null)
                setForfeitedTeams([false, true])
            else
                setForfeitedTeams([false, false])
        } else
            setForfeitedTeams([false, false])
    }, [data])

    useEffect(() => {
        if (adminView) {
            if (forfeitedTeams[0]) {
                homeInput.setNewValue(0)
                visitorInput.setNewValue(1)
                setIsForfeited(true)
            } else if (forfeitedTeams[1]) {
                homeInput.setNewValue(1)
                visitorInput.setNewValue(0)
                setIsForfeited(true)
            } else {
                setIsForfeited(false)
            }
        }
    }, [forfeitedTeams])

    useEffect(() => {
        if (forfeitPopup) setChangedValues(true)
    }, [forfeitedTeams])

    useEffect(() => {
        if (!forfeitPopup) setChangedValues(false)
    }, [forfeitPopup])

    useEffect(()=>{
        setScore_1(data.score_1 !=null ? data.score_1 : ( data.home_score_1 != null ? data.home_score_1 : data.visitors_score_1 ) )
        setScore_2(data.score_2 !=null ? data.score_2 : ( data.home_score_2 != null ? data.home_score_2 : data.visitors_score_2 ) )
    }, [data])
return (<>
        <div className={styles.matchWrap}>
            <div className={isTablet && !adminStyle && !adminView && styles.matchWrapMobile}>
                <div>
                <div className={cn(styles.match, {
                    [styles.matchMobile] : isTablet && !adminStyle,
                })}>
                    {!(isTablet && adminView) && (
                        <Link
                            to={!data.home || type === 'solo' ? '' : `/teams/${data.home?.id}`}
                            className={cn(styles.matchTeam, {
                                [styles.matchTeamUser]: userTeams.find(team => team.id === data.home?.id) && havePermissions,
                                [styles.matchTeamAdmin]: adminView || adminStyle,
                                [styles.matchTeamMobile]: isTablet && !adminStyle && !adminView,
                                [styles.matchTeamMobileR]: isTablet && !adminStyle && !adminView,
                                [styles.competitionGameTeamActiveR] : userInfo.id === data?.home?.id && type === 'solo',
                            })}
                        >
                            {(flag && forfeitedTeams[0]) && (
                                <div
                                    className={cn(styles.matchFlag, {
                                        [styles.matchFlagForfeited]: forfeitedTeams[0],
                                    })}
                                >
                                    <SvgSprite spriteID={'flag'}/>
                                </div>
                            )}

                            {   (typeof data.score_1 != 'number' &&
                                 typeof data.score_2 != 'number') &&
                                (typeof data.home_score_1 === 'number'&&
                                 typeof data.home_score_2 === 'number' ) && (
                                <div
                                    className={cn(styles.matchFlag, {
                                        [styles.matchFlagForfeited]: forfeitedTeams[0],
                                    })}
                                >
                                    <SvgSprite spriteID={'clock'}/>
                                </div>
                            )}
                            {data.home ? data.home.name : t('upcoming')}
                            <Img
                                className={cn(styles.matchImg, {
                                    [styles.matchImgMobile]: isTablet && !adminStyle,
                                })}
                                src={data.home?.picture}
                                alt={'team'}
                            />
                        </Link>
                    )}
                    {adminView && isAdmin && data.home ? (<>
                        <div className={styles.matchInfoAdmin}>
                            <div
                                className={cn(styles.matchFlag, {
                                    [styles.matchFlagForfeited]: isForfeited ? forfeitedTeams[0] : false,
                                    [styles.disabled] : isForfeited,
                                })}
                                onClick={() => {
                                    setName(data?.home?.name)
                                    setForfeitPopup(true)
                                    setPrevState([...forfeitedTeams])
                                    setForfeitToSet([!forfeitedTeams[0], false])
                                }}
                            >
                                <SvgSprite spriteID={'flag'}/>
                            </div>

                        {(typeof data.score_1 === 'number' &&
                            typeof data.score_2 === 'number') ||
                        adminView ? (
                            <div className={styles.matchScoreAdmin}>
                                <input
                                    className={styles.matchScoreAdminInp}
                                    type={'number'}
                                    onBlur={() =>
                                        handleBlur(homeInput.value, homeInput.setNewValue)
                                    }
                                    value={homeInput.value === null ? '' : homeInput.value}
                                    onChange={homeInput.onChange}
                                    disabled={isForfeited || (score_1 && data.score_1 && isAdmin) || (score_1 && !isAdmin) || !data.home}
                                />
                                <input
                                    className={styles.matchScoreAdminInp}
                                    type={'number'}
                                    onBlur={() =>
                                        handleBlur(visitorInput.value, visitorInput.setNewValue)
                                    }
                                    value={visitorInput.value === null ? '' : visitorInput.value}
                                    onChange={visitorInput.onChange}
                                    disabled={isForfeited || ( score_2 && data.score_2 && isAdmin) || (score_2 && !isAdmin) || !data.home}
                                />
                            </div>
                        ) : (
                            <div className={styles.matchDateAdmin}>
                                <div>
                                    <span>{data.date.iso}</span>
                                    <span>{data.date.time}</span>
                                </div>
                            </div>
                        )}
                        <div
                            className={cn(styles.matchFlag, {
                                [styles.matchFlagForfeited]: isForfeited ? forfeitedTeams[1] : false,
                                [styles.disabled] : isForfeited,
                            })}
                            onClick={() => {
                                setName(data?.visitors?.name)
                                setForfeitPopup(true)
                                setPrevState([...forfeitedTeams])
                                setForfeitToSet([false, !forfeitedTeams[1]])
                            }}
                        >
                            <SvgSprite spriteID={'flag'}/>
                        </div>
                        </div>
                    </>) : !adminStyle && !isTablet &&(<>
                        <Link
                            to={`/competitions/${type}/${competitionType}/${competitionID}/game/${
                                data.id
                            }${type === 'solo' ? `/${round}` : ''}`}
                            className={styles.matchInfo}
                        >
                            {   (typeof score_1 === 'number' && typeof score_2 === 'number')
                             ? ( 
                                <div className={styles.matchScore}>
                                    {score_1}-{score_2}
                                </div>
                            ) : (
                                <div className={styles.matchDate}>
                                    <span>{data.date.iso}</span>
                                    <span>{data.date.time}</span>
                                </div>
                            )}
                        </Link>
                    </>)}
                    {!(isTablet && adminView) && (
                        <Link
                            to={!data.visitors || type === 'solo' ? '' : `/teams/${data.visitors?.id}`}
                            className={cn(styles.matchTeam, styles.matchTeamVisitor, {
                                [styles.matchTeamUser]: userTeams.find(team => team.id === data.visitors?.id) && havePermissions,
                                [styles.matchTeamAdmin]: adminView || adminStyle,
                                [styles.matchTeamMobile]: isTablet && !adminStyle,
                                [styles.competitionGameTeamActiveL] : userInfo.id === data?.visitors?.id && type === 'solo',
                            })}
                        >
                            <Img
                                className={styles.matchImg}
                                src={data.visitors?.picture}
                                alt={'team'}
                            />
                            {data.visitors ? data.visitors.name : t('upcoming')
                            }
                            {(flag && forfeitedTeams[1]) && (
                                <div
                                    className={cn(styles.matchFlag, {
                                        [styles.matchFlagForfeited]: forfeitedTeams[1],
                                    })}
                                >
                                    <SvgSprite spriteID={'flag'}/>
                                </div>)}
                            
                                {   (typeof data.score_1 != 'number' &&
                                typeof data.score_2 != 'number') &&
                                (typeof data.visitors_score_1 === 'number'&&
                                typeof data.visitors_score_2 === 'number' ) && (
                                <div
                                    className={cn(styles.matchFlag, {
                                        [styles.matchFlagForfeited]: forfeitedTeams[0],
                                    })}
                                >
                                    <SvgSprite spriteID={'clock'}/>
                                </div>
                            )}

                        </Link>
                    )}
                </div>
                </div>
                <div>
                {!adminStyle && !adminView && isTablet &&(<>
                        <Link
                            to={`/competitions/${type}/${competitionType}/${competitionID}/game/${
                                data.id
                            }${type === 'solo' ? `/${round}` : ''}`}
                            className={styles.matchInfoMobile}
                        >
                            {typeof data.score_1 === 'number' &&
                            typeof data.score_2 === 'number' ? (<>
                                <div className={styles.matchScoreMobile}>
                                    {data.score_1}
                                </div>
                                <div className={styles.matchScoreMobile}>
                                    {data.score_2}
                                </div>
                            </>) : (
                                <div className={styles.matchDateMobile}>
                                    <div>{data.date.iso}</div>
                                    <div>{data.date.time}</div>
                                </div>
                            )}
                        </Link>
                    </>)}
                </div>
            </div>
            

            {isAdmin && data.home && !adminView && (
                <button
                    className={styles.matchAdmin}
                    type={'button'}
                    onClick={() => setActiveGameID(data.id)}
                >
                    Admin
                </button>
            )}
            {/*{havePermissions && !adminView && !isAdmin && (*/}
            {/*    <button*/}
            {/*        className={styles.matchCaptain}*/}
            {/*        type={'button'}*/}
            {/*        onClick={() => setActiveGameID(data.id)}*/}
            {/*    >*/}
            {/*        Add score*/}
            {/*    </button>*/}
            {/*)}*/}
            <Popup isOpenedPopup={forfeitPopup} closePopup={() => setForfeitPopup()}>
                <CompetitionMatchForfeitPopup
                    name={name}
                    changeScores={changeScores}
                    setForfeitPopup={setForfeitPopup}
                    setForfeitedTeams={setForfeitedTeams}
                    forfeitToSet={forfeitToSet}
                    prevState={prevState}
                    changedValues={changedValues}
                />
            </Popup>
        </div>
    </>)
}
