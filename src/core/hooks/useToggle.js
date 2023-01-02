import { useEffect, useState } from 'react'

export const useToggle = (initValue) => {
    const [isOpened, setIsOpened] = useState(false)

    const toggleIsOpened = () => setIsOpened(!isOpened)

    useEffect(() => {
        setIsOpened(initValue)
    }, [initValue])

    return {isOpened, toggleIsOpened}
}
