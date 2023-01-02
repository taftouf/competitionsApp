import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {v4 as uuid} from 'uuid'
import { useDispatch } from 'react-redux'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Hooks
import { useInput } from '../../hooks/useInput'

// Functions
import { checkErrors } from '../../functions/checkErrors'

// Slices
import { addNotification } from '../../../store/slices/notificationsSlice'

// Utils
import { setCookie } from '../../utils/cookie'

// Functions
import { removeNotifTimeout } from '../../functions/removeNotifTimeout'

// Components
import { PageWrapper } from '../../ui/PageWrapper'
import { Form } from '../../ui/Form'
import { Input } from '../../ui/Input'
import { Btn } from '../../ui/Btn'
import { Loader } from '../../ui/Loader'
import { useTranslation } from 'react-i18next'
import { setIsAuth } from '../../../store/slices/userSlice'

export const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const inputEmail = useInput('')
    const inputPassword = useInput('')

    const {t} = useTranslation()

    const [errors, setErrors] = useState({})
    const [loader, setLoader] = useState(false)
    const loginUser = async () => {
        const inputsInfo = [
            {el: inputEmail, errorName: 'email', errorText: 'enterEmailInput'},
            {el: inputPassword, errorName: 'password', errorText: 'enterPassword'},
        ]

        if (await checkErrors(setErrors, inputsInfo)) return

        setLoader(true)

        const res = await fetch(`${process.env.REACT_APP_API_HOST}/auth/v3/email/login`, {
            method: 'POST',
            body: JSON.stringify({
                email: inputEmail.value,
                password: inputPassword.value,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        // const res = await fetch(`${process.env.REACT_APP_API_HOST}/auth/v3/email/login`, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         email: 'contact@the-ifc.com',
        //         password: 'TFOW%W5S*mD#t6FZ3b7BAc*fUYQ',
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // })

        const data = await res.json()

        if (!res.ok) {
            const errorID = uuid()

            dispatch(addNotification({id: errorID, type: 'error', text: data.message}))
            dispatch(removeNotifTimeout(errorID, 3000))
        } else {
            setCookie('access_token', data.access_token, data.access_token_expiry, true)
            setCookie('refresh_token', data.refresh_token, data.refresh_token_expiry)

            dispatch(setIsAuth(true))
            navigate('/dashboard')
        }
        setLoader(false)
    }

    return (
        <PageWrapper auth>
            <Form className={styles.loginForm} onSubmit={loginUser}>
                <div className={styles.loginFormTitle}>
                    {t('ConnectToIFC')}
                </div>
                <Input
                    type={'email'}
                    placeholder={'Email'}
                    id={'email'}
                    {...inputEmail}
                    error={t(errors.email)}
                />
                <Input
                    type={'password'}
                    placeholder={'Password'}
                    id={'password'}
                    {...inputPassword}
                    error={t(errors.password)}
                />
                <Btn type={'submit'} className={cn(styles.loginFormBtn,{
                    [styles.activeBtn] : loader
                })}>
                   {!loader? t('login') : <Loader loginLoader={true} />}
                </Btn>
                <div className={styles.loginForgotWrap}>
                    <Link className={styles.loginForgot} to={'/auth/forgot-password'} state={inputEmail.value}>
                        {t('forgotPassword')}
                    </Link>
                </div>
                <div className={styles.loginSignUp}>
                    <div className={styles.loginSignUpTitle}>
                        {t('noAccount')}
                    </div>
                    <Link to={'/auth/register'} className={styles.loginSignUpLink}>
                        {t('SignUp')}
                    </Link>
                </div>
            </Form>
        </PageWrapper>
    )
}
