import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Components
import { Img } from '../Img'
import { Btn } from '../Btn'

import platform1 from '../../../assets/images/platform1.svg'
import platform2 from '../../../assets/images/platform2.svg'
import platform3 from '../../../assets/images/platform3.svg'
import platform4 from '../../../assets/images/platform4.svg'

import { SvgSprite } from '../SvgSprite/SvgSprite'

export const MainInfoPlayer = ({data}) => {
    const navigate = useNavigate()

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

    return (
        <div className={styles.mainInfo}>
            <div className={styles.mainInfoCover}>
                <Btn className={styles.mainInfoBack} onClick={() => navigate(-1)}>
                    <SvgSprite spriteID={'arrowNext'} />
                </Btn>
                {
                    data.player.user.cover ? (
                        <Img
                            className={styles.mainInfoCoverImg}
                            src={data.player.user.cover}
                            alt={'cover'}
                        />
                    ) : <div className={styles.mainInfoCoverImgPlaceholder} style={{
                        background: data.player.position?.color?data.player.position.color:"#fff",
                    }}/>
                }
            </div>
            <div className={styles.mainInfoInner}>
                <Img
                    className={styles.mainInfoPhoto}
                    src={data.player.user.picture}
                    alt={'logo'}
                />
                <div className={styles.mainInfoContent}>
                    <div className={styles.mainInfoName}>
                        {data.player.user.name}
                    </div>
                    <div className={styles.mainInfoMore}>
                        <div className={styles.mainInfoMoreItem}>
                            {data.player.role.text} in :
                        </div>
                        <div className={styles.mainInfoMoreItemPicture}>
                            <Img
                                className={styles.mainInfoMoreItemImg}
                                src={data.team.picture}
                                alt='team picture'
                            />
                        </div>
                        <Link className={styles.mainInfoMoreItem} to={`/teams/${data.team.id}`}>
                            {data.team.name}
                        </Link>
                    </div>
                    <div className={styles.mainInfoMore}>
                        <div className={styles.mainInfoMoreItem}>
                            <div className={cn(styles.mainInfoMoreItemWrap, {
                                    [styles.widthPs5Div] : data.platform === 'ps5'
                                })}>
                                <Img
                                    className={cn(styles.mainInfoMoreItemImg , {
                                        [styles.widthPs5Div] : data.platform === 'ps5'
                                    })}
                                    src={getPlatformImg(data.team.platform)}
                                    alt='platform'
                                />
                            </div>
                            <span>Platform</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.mainInfoBtns}>
                <Btn className={styles.mainInfoBtn} type={'button'}>
                    contacter
                </Btn>
            </div>
        </div>
    )
}
