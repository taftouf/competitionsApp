import React, { useState } from 'react'
import cn from 'classnames'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'

// Styles
import styles from './index.module.scss'

// Components
import { OrgItem } from '../../ui/OrgItem'
import { SvgSprite } from '../../ui/SvgSprite/SvgSprite'

export const DashboardOrgsSwiper = ({data, tourney, league}) => {
    const SLIDES_COUNT = 2

    const [swiper, setSwiper] = useState()
    const [disabledArrows, setDisabledArrows] = useState({isEnd: false, isBeginning: true})

    const slidePrev = () => swiper.slidePrev()
    const slideNext = () => swiper.slideNext()

    const checkDisabled = swiper => {
        setDisabledArrows({isEnd: swiper.isEnd, isBeginning: swiper.isBeginning})
    }

    return (
        <div className={styles.dashboardOrgsSwiperWrap}>
            <Swiper
                className={styles.dashboardOrgsSwiper}
                spaceBetween={15}
                slidesPerView={SLIDES_COUNT}
                onInit={swiper => setSwiper(swiper)}
                onSlideChange={checkDisabled}
            >
                {
                    data.map(item => (
                        <SwiperSlide className={styles.dashboardOrgsSwiperItem} key={item.id}>
                            <OrgItem
                                to={tourney ? `/competitions/${item.mode}/tournament/${item.id}` : league && `/competitions/${item.mode}league/${item.id}`}
                                data={item}
                                small
                                maxHeigth
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                data.length > SLIDES_COUNT && (<>
                    <div
                        className={cn(styles.dashboardOrgsSwiperArrow, styles.dashboardOrgsSwiperArrowPrev, {
                            [styles.dashboardOrgsSwiperArrowDisabled]: disabledArrows.isBeginning,
                        })}
                        onClick={slidePrev}
                    >
                        <SvgSprite spriteID={'arrow'} />
                    </div>
                    <div
                        className={cn(styles.dashboardOrgsSwiperArrow, styles.dashboardOrgsSwiperArrowNext, {
                            [styles.dashboardOrgsSwiperArrowDisabled]: disabledArrows.isEnd,
                        })}
                        onClick={slideNext}
                    >
                        <SvgSprite spriteID={'arrow'} />
                    </div>
                </>)
            }
        </div>
    )
}
