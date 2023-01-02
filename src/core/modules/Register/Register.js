import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { useDispatch } from 'react-redux'

// Styles
import styles from './index.module.scss'

// Slices
import { addNotification } from '../../../store/slices/notificationsSlice'

// Functions
import { checkErrors } from '../../functions/checkErrors'
import { removeNotifTimeout } from '../../functions/removeNotifTimeout'

// Utils
import { setCookie } from '../../utils/cookie'

// Hooks
import { useInput } from '../../hooks/useInput'

// Components
import { PageWrapper } from '../../ui/PageWrapper'
import { Form } from '../../ui/Form'
import { Input } from '../../ui/Input'
import { Btn } from '../../ui/Btn'
import { Checkbox } from '../../ui/Checkbox'
import { Loader } from '../../ui/Loader'
import { StrongPassword } from '../../functions/StrongPassword'
import { useTranslation } from 'react-i18next'
import { CheckPassword } from '../../ui/CheckPassword'

import cn from 'classnames'

export const Register = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {t} = useTranslation()

    const inputFirstName = useInput('')
    const inputLastName = useInput('')
    const inputUsername = useInput('')
    const inputEmail = useInput('')
    const inputPassword = useInput('')
    const inputConfirmPassword = useInput('')
    const [checkbox, setCheckbox] = useState(false)

    const [errors, setErrors] = useState({})
    const [loader, setLoader] = useState(false)

    const [charNumberValid, setCharNumberValid] = useState(false)
    const [specialCharValid, setSpecialCharValid] = useState(false)
    const [uppercaseValid, setUppercaseValid] = useState(false)
    const [numberValid, setNumberValid] = useState(false)

    const registerUser = async () => {
        const inputsInfo = [
            {el: inputFirstName, errorName: 'firstName', errorText: 'enterFirstName'},
            {el: inputLastName, errorName: 'lastName', errorText: 'enterLastName'},
            {el: inputUsername, errorName: 'username', errorText: 'enterUserName'},
            {el: inputEmail, errorName: 'email', errorText: 'enterEmailInput'},
            {el: inputPassword, errorName: 'password', errorText: 'enterPassword'},
            {el: inputConfirmPassword, errorName: 'confirmPassword', errorText: 'enterPassword'},
        ]

        if((!(charNumberValid && specialCharValid && uppercaseValid && numberValid)) && inputPassword.value) {
            const tempErrors = {...errors}
            tempErrors["password"] = 'Password not strong enough'
            setErrors({...tempErrors})
            return
        }
        
        if (await checkErrors(setErrors, inputsInfo)) return
        if (!checkbox) return setErrors({checkbox: true})
        if (inputPassword.value !== inputConfirmPassword.value) {
            const errorID = uuid()

            dispatch(addNotification({id: errorID, type: 'error', text: 'passwordsDoNotMatch'}))
            dispatch(removeNotifTimeout(errorID, 3000))
            return
        }
        setLoader(true)
        const res = await fetch(`${process.env.REACT_APP_API_HOST}/auth/v3/email/sign-up`, {
            method: 'POST',
            body: JSON.stringify({
                first_name: inputFirstName.value,
                last_name: inputLastName.value,
                pseudo: inputUsername.value,
                email: inputEmail.value,
                password: inputPassword.value,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const data = await res.json()

        if (!res.ok) {
            const errorID = uuid()

            dispatch(addNotification({id: errorID, type: 'error', text: data.message}))
            dispatch(removeNotifTimeout(errorID, 3000))
        } else {
            setCookie('access_token', data.access_token, data.access_token_expiry)
            setCookie('refresh_token', data.refresh_token, data.refresh_token_expiry)

            navigate('/auth/verify-email', {state:{email:inputEmail.value}})
        }
        setLoader(false)
    }

    useEffect(() => {
        var valide = StrongPassword(inputPassword.value)
        setNumberValid(valide.numberValid)
        setCharNumberValid(valide.charNumberValid)
        setSpecialCharValid(valide.specialCharValid)
        setUppercaseValid(valide.uppercaseValid)
    }, [inputPassword])

    return (
        <PageWrapper auth>
            <Form className={styles.registerForm} onSubmit={registerUser}>
                <div className={styles.registerFormTitle}>
                    {t('InscrireToIFC')}
                </div>
                <div className={styles.registerGroup}>
                    <Input
                        type={'text'}
                        placeholder={t('firstName')}
                        id={'firstName'}
                        {...inputFirstName}
                        error={t(errors.firstName)}
                    />
                    <Input
                        type={'text'}
                        placeholder={t('lastName')}
                        id={'lastName'}
                        {...inputLastName}
                        error={t(errors.lastName)}
                    />
                    <Input
                        type={'text'}
                        placeholder={t('username')}
                        id={'username'}
                        {...inputUsername}
                        error={t(errors.username)}
                    />
                </div>
                <div className={styles.registerGroup}>
                    <Input
                        type={'email'}
                        placeholder={t('email')}
                        id={'email'}
                        {...inputEmail}
                        error={t(errors.email)}
                    />
                    <Input
                        type={'password'}
                        placeholder={t('password')}
                        id={'password'}
                        {...inputPassword}
                        error={t(errors.password)}
                    />
                    <Input
                        type={'password'}
                        placeholder={t('confirmPassword')}
                        id={'confirmPassword'}
                        {...inputConfirmPassword}
                        error={t(errors.confirmPassword)}
                    />
                    <CheckPassword 
                        charNumberValid={charNumberValid}
                        specialCharValid={specialCharValid}
                        uppercaseValid={uppercaseValid}
                        numberValid={numberValid}
                    />

                </div>
                <Checkbox className={styles.registerCheckbox} error={errors.checkbox} setIsChecked={setCheckbox}>
                    {t('accepte') + " "}  
                    <Link to={'/cgu'}>{t('termsOfUse')}</Link>
                     {" "+t('and')+" "} 
                     <Link to={'/politique-de-confidentialite'}>{t('privacyPolicy')}</Link>.
                </Checkbox>
                <Btn type={'submit'} className={cn(styles.registerFormBtn,{
                    [styles.activeBtn] : loader
                })}>
                    {!loader ? t('SignUp') : <Loader loginLoader={true}/>}
                </Btn>
                <div className={styles.registerForgotWrap}>
                    <Link className={styles.registerForgot} to={'/auth/login'}>
                        {t('haveAccount')}
                    </Link>
                </div>
            </Form>
        </PageWrapper>
    )
}
