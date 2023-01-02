import React, { useEffect, useState } from 'react'

// Images
import placeholder from '../../../assets/images/user-placeholder.jpg'
import { getCookie } from '../../utils/cookie'

export const Img = ({standard, ...props}) => {
    const [src, setSrc] = useState(placeholder)

    useEffect(() => {
        if (props.src && standard) {
            setSrc(props.src)
        } else if (props.src) {
            (async () => {
                const res = await fetch(`${props.src}`, {
                    headers: {
                        Authorization: `Bearer ${getCookie('access_token')}`,
                    }
                })
                const imageBlob = await res.blob()
                setSrc(URL.createObjectURL(imageBlob))
            })()
        }
    }, [props.src, standard])

    return (
        <img {...props}
             src={src}
             onError={async e => {
                 e.target.src = placeholder
             }}
        />
    )
}
