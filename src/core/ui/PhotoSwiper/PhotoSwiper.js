import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'

// Styles
import 'swiper/css'
import styles from './index.module.scss'

// Components
import { Img } from '../Img'

export const PhotoSwiper = ({data, setActiveItem, link}) => {
    const SLIDES_COUNT = 3

    const [activeID, setActiveID] = useState(data[0].id)
    const linkEL = useRef()
    const swiperEL = useRef()

    const changeSlide = swiper => data[swiper.activeIndex].id && setActiveID(data[swiper.activeIndex].id)

    const appendLink = () => {
        swiperEL.current.querySelector('.swiper-wrapper').append(linkEL.current)
    }

    useEffect(() => {
        setActiveItem(data.find(item => item.id === activeID))
    }, [activeID])

    useEffect(() => {
        if (linkEL.current && swiperEL.current) {
            appendLink()
        }
    }, [linkEL, swiperEL])

    return (
        <div ref={swiperEL} className={styles.swiperWrapper}>
            <Swiper
                className={cn(styles.swiper, {
                    [styles.swiperWithNavigation]: data.length + 1 >= SLIDES_COUNT,
                })}
                modules={[Navigation]}
                spaceBetween={15}
                slidesPerView={SLIDES_COUNT}
                navigation={data.length + 1 >= SLIDES_COUNT}
                onSlideChange={changeSlide}
                centeredSlides
            >
                {
                    data.map(item => (
                        <SwiperSlide className={cn(styles.swiperItem, {
                            [styles.noMargin] : data.length < 2
                        })} key={item.id}>
                            <Img
                                className={cn(styles.swiperImg, {
                                    [styles.swiperImgActive]: activeID === item.id,
                                })}
                                src={item.picture}
                                alt='item'
                                onClick={() => setActiveID(item.id)}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {data.length < 5 && (
                <div ref={linkEL} className={styles.swiperItem}>
                    <Link className={styles.swiperItemLink} to={data.length >= 5 ? "" :link}>
                        +
                    </Link>
                </div>
            )}
        </div>
    )
}
