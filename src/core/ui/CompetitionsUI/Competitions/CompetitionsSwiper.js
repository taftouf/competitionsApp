import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Hooks
import { useMobile } from '../../../hooks/useMobile'

// Components
import { OrgItem } from '../../OrgItem'
import { SvgSprite } from '../../SvgSprite/SvgSprite'
import { Img } from '../../Img'

export const CompetitionsSwiper = ({competitions}) => {
    const isLaptop = useMobile(1151)
    const isMobile = useMobile(451)
    const [slidesCount, setSlidesCount] = useState(2.7)

    useEffect(() => {
        if (isMobile) setSlidesCount(2)
        else setSlidesCount(2.7)
    }, [isLaptop])

    useEffect(() => {
        if (isMobile) setSlidesCount(2)
        else setSlidesCount(2.7)
    }, [isMobile])

    const [swiper, setSwiper] = useState()
    const [disabledArrows, setDisabledArrows] = useState({isEnd: false, isBeginning: true})

    const slidePrev = () => {
        swiper.slidePrev()
        checkDisabled(swiper)
    }
    const slideNext = () => {
        swiper.slideNext()
        checkDisabled(swiper)
    }

    const checkDisabled = swiper => {
        setDisabledArrows({isEnd: swiper.isEnd, isBeginning: swiper.isBeginning})
    }

    return (
        <div className={styles.competitionsSwiperWrap}>
            <Swiper
                className={styles.competitionsSwiper}
                spaceBetween={15}
                slidesPerView={slidesCount}
                onInit={swiper => setSwiper(swiper)}
                onSlideChange={checkDisabled}
            >
                {
                    competitions.map(item => (
                        <SwiperSlide className={styles.competitionsSwiperItem} key={item.id}>
                            <OrgItem
                                to={item.type === 'tournament' ? `/competitions/${item.mode}/tournament/${item.id}` : `/competitions/${item.mode}/league/${item.id}`}
                                data={item}
                                big
                                feed
                            />
                            {
                                item.winner && (
                                    <div className={styles.orgWinner}>
                                        <Img
                                            className={styles.orgWinnerImg}
                                            src={item.winner.picture}
                                            alt={'team'}
                                        />
                                        <div className={styles.orgWinnerName}>
                                            {item.winner.name}
                                        </div>
                                    </div>
                                )
                            }
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                competitions.length > slidesCount && (
                    <div className={styles.competitionsSwiperArrows}>
                        <div
                            className={cn(styles.competitionsSwiperArrow, styles.competitionsSwiperArrowPrev, {
                                [styles.competitionsSwiperArrowDisabled]: disabledArrows.isBeginning,
                            })}
                            onClick={slidePrev}
                        >
                            <SvgSprite spriteID={'arrow'} />
                        </div>
                        <div
                            className={cn(styles.competitionsSwiperArrow, styles.competitionsSwiperArrowNext, {
                                [styles.competitionsSwiperArrowDisabled]: disabledArrows.isEnd,
                            })}
                            onClick={slideNext}
                        >
                            <SvgSprite spriteID={'arrow'} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}
