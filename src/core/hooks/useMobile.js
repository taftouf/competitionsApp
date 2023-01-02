import { useEffect, useState } from 'react'

export const useMobile = (checkWidth = 1025) => {
    const [isMobile, setIsMobile] = useState(false)

    const checkWindowSize = () => {
        if (window.innerWidth < checkWidth) setIsMobile(true)
        else setIsMobile(false)
    }

    useEffect(() => {
        window.addEventListener('resize', checkWindowSize)
        checkWindowSize()

        return () => window.removeEventListener('resize', checkWindowSize)
    }, [])

    return isMobile
}
