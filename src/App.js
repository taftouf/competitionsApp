import React, { useEffect } from 'react'

// Hooks
import { useAuth } from './core/hooks/useAuth'

// Components
import { MainRoutes } from './routes/MainRoutes'
import { Notifications } from './core/ui/Notifications'
import { AuthRoutes } from './routes/AuthRoutes'
import { useSelector } from 'react-redux'

export const App = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const {checkIsAuth, isChecked} = useAuth()

    useEffect(() => {
        checkIsAuth()
    }, [])


    return isChecked && (
        <>
            {isAuth ? <MainRoutes/> : <AuthRoutes/>}
            <Notifications/>
        </>
    )
}
