import React, {useEffect} from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate} from 'react-router-dom'

// Styles
import styles from './index.module.scss'

// Slices
import { addNotification } from '../../../store/slices/notificationsSlice'

// Functions
import { checkErrors } from '../../functions/checkErrors'
import { removeNotifTimeout } from '../../functions/removeNotifTimeout'

// Components
import { Form } from '../../ui/Form'
import { Input } from '../../ui/Input'
import { Btn } from '../../ui/Btn'
import { CheckPassword } from '../../ui/CheckPassword'

// asset
import logo from '../../../assets/images/logo.png'

// Hooks
import { useInput } from '../../hooks/useInput'
import { useState } from 'react'
import { useMobile } from '../../hooks/useMobile'

import { useTranslation } from 'react-i18next'
// function
import { StrongPassword } from '../../functions/StrongPassword'


export const ReinitialiserMonMdp = () => {
    const isMobile = useMobile(500)
    const inputPassword = useInput('')
    const inputConfirmPassword = useInput('')
    const navigate = useNavigate()
    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token')
    const [errors, setErrors] = useState({})
    const {t} = useTranslation()
    

    const [charNumberValid, setCharNumberValid] = useState(false)
    const [specialCharValid, setSpecialCharValid] = useState(false)
    const [uppercaseValid, setUppercaseValid] = useState(false)
    const [numberValid, setNumberValid] = useState(false)

    const dispatch = useDispatch()
   
    const changePdw = async ()=>{
        const inputsInfo = [
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
       
        if (inputPassword.value !== inputConfirmPassword.value) {
            const errorID = uuid()

            dispatch(addNotification({id: errorID, type: 'error', text: 'passwordsDoNotMatch'}))
            dispatch(removeNotifTimeout(errorID, 3000))
            return
        }
       
        const res = await fetch(`${process.env.REACT_APP_API_HOST}/auth/v3/email/reset-password?token=${token}`, {
            method: 'POST',
            body: JSON.stringify({
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
            const successID = uuid()
            dispatch(addNotification({id: successID, type: 'success', text: 'Vérifiez votre messagerie'}))
            dispatch(removeNotifTimeout(successID, 3000))
            navigate('/auth/login')
        }
    }

    useEffect(() => {
        var valide = StrongPassword(inputPassword.value)
        setNumberValid(valide.numberValid)
        setCharNumberValid(valide.charNumberValid)
        setSpecialCharValid(valide.specialCharValid)
        setUppercaseValid(valide.uppercaseValid)
    }, [inputPassword])
    
    return (
        <div className={styles.pageWrapper}>
            {
                <header className={styles.header}>
                    <div className={styles.headerBox}>
                        <div className={styles.headerLogo}>
                            <img className={styles.headerLogoImg} src={logo} alt={'logo'} />
                        </div>
                    </div>
                </header>
            }
            {
                <main className={styles.pageWrapperContent}>
                    <Form className={styles.forgotForm} onSubmit={changePdw}>
                        <div className={styles.forgotFormTitle}>
                            {t('resetPassword')}
                        </div>
                        <div className={styles.teamsPopupContent}>

                            <Input
                                forgotInput={styles.forgotInputPwd}
                                type={'password'}
                                placeholder={'Password'}
                                id={'password'}
                                {...inputPassword}
                                error={t(errors.password)}
                            />
                            <Input
                                forgotInput={styles.forgotInputPwd}
                                type={'password'}
                                placeholder={'Confirm password'}
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
                        <div className={styles.forgotFormBtns}>
                            {isMobile && (
                                <Link className={styles.forgotFormBtn} to={'/auth/login'}>
                                    {t('cancel')}
                                </Link>
                            )}
                            
                            <Btn type={'submit'} className={cn(styles.forgotFormBtn, styles.active)}>
                                {t('validate')}
                            </Btn>
                        </div>
                    </Form>
                </main>
            }
        </div>
    )
}
