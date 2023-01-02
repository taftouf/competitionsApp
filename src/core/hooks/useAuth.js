import { useState } from 'react'

// Utils
import { getCookie } from '../utils/cookie'
import fetch from '../utils/refreshToken'
import { useDispatch } from 'react-redux'
import { setIsAuth } from '../../store/slices/userSlice'

export const useAuth = () => {
    const dispatch = useDispatch()
    const [isChecked, setIsChecked] = useState(false)

    const checkIsAuth = async () => {
        if (!getCookie('access_token')) return setIsChecked(true)

        const token = getCookie('access_token')
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const res = await fetch(`${process.env.REACT_APP_API_HOST}/auth/v3/sessions`, {
            headers
        })

        if (res.ok) dispatch(setIsAuth(true))
        else dispatch(setIsAuth(false))

        setIsChecked(true)
    }

    return {checkIsAuth, isChecked}
}
