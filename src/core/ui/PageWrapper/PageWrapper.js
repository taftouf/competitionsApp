import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

// Slices
import { setLoadedData } from '../../../store/slices/loadedDataSlice'

// Functions
import { setTeamsData } from '../../functions/setTeamsData'
import { setOrgsData } from '../../functions/setOrgsData'
import { setFollowedOrgsData } from '../../functions/setFollowedOrgsData'
import { setUserInfoData } from '../../functions/setUserInfoData'

// Styles
import styles from './index.module.scss'

// Components
import { AuthWrapper } from '../AuthWrapper'
import { Loader } from '../Loader'
import { DiscoverHeader } from '../DiscoverUI/DiscoverHeader'
import { Header } from '../Header'

export const PageWrapper = ({children, auth, discover, backTo}) => {
    const dispatch = useDispatch()

    const [content, setContent] = useState(false)
    const loadedData = useSelector(state => state.loadedData.loadedData)

    useEffect(() => {
        if (!auth && !loadedData) {
            (async () => {
                await dispatch(setUserInfoData())
                await Promise.all([
                    dispatch(setTeamsData()),
                    dispatch(setOrgsData()),
                    dispatch(setFollowedOrgsData()),
                ])

                dispatch(setLoadedData(true))
                setContent(true)
            })()
        } else {
            setContent(true)
        }
    }, [])

    return (
        <div className={cn(styles.pageWrapper, {
            [styles.pageWrapperLightBG]: auth,
        })}>
            {
                !auth && !discover && <Header/>
            }
            {
                discover && <DiscoverHeader backTo={backTo} />
            }
            {
                content ? (
                    <main className={styles.pageWrapperContent}>
                        {
                            auth ? (
                                <AuthWrapper>
                                    {children}
                                </AuthWrapper>
                            ) : children
                        }
                    </main>
                ) : (
                    <div className={'globalLoader'}>
                        <Loader/>
                    </div>
                )
            }
        </div>
    )
}
