import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Slices
import { addNotification } from '../../../store/slices/notificationsSlice'

// Functions
import { checkErrors } from '../../functions/checkErrors'
import { removeNotifTimeout } from '../../functions/removeNotifTimeout'

// Hooks
import { useInput } from '../../hooks/useInput'

// Components
import { Form } from '../../ui/Form'
import { Input } from '../../ui/Input'
import { Btn } from '../../ui/Btn'
import logo from '../../../assets/images/logo.png'
import { useTranslation } from 'react-i18next'

export const ForgotPassword = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const inputEmail = useInput(location.state)
    const {t} = useTranslation();

    const [errors, setErrors] = useState({})
    const [disabledBtn, setDisabledBtn] = useState(false)

    const sendEmail = async () => {
        const inputsInfo = [
            {el: inputEmail, errorName: 'email', errorText: 'enterEmailInput'},
        ]

        if (await checkErrors(setErrors, inputsInfo)) return

        const res = await fetch(`${process.env.REACT_APP_API_HOST}/auth/v3/email/forgot-password?email=${encodeURIComponent(inputEmail.value)}`)
        const data = await res.json()

        if (!res.ok) {
            const errorID = uuid()

            dispatch(addNotification({id: errorID, type: 'error', text: data.message}))
            dispatch(removeNotifTimeout(errorID, 3000))
        } else {
            const successID = uuid()
            // navigate('/reinitialiser-mon-mdp?token=token123456789')
            dispatch(addNotification({id: successID, type: 'success', text: 'Vérifiez votre messagerie'}))
            dispatch(removeNotifTimeout(successID, 3000))
            setDisabledBtn(true)
        }
    }

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
                    <Form className={styles.forgotForm} onSubmit={sendEmail}>
                        <div className={styles.forgotFormTitle}>
                            {t('accountRecovery')}
                        </div>
                        <div className={styles.teamsPopupContent}>
                            <div className={styles.forgotFormHeader}>
                                {t('enterEmail')}
                            </div>
                            <Input
                                forgotInput={styles.forgotInput}
                                type={'email'}
                                placeholder={'Email'}
                                id={'email'}
                                {...inputEmail}
                                error={t(errors.email)}
                            />
                            <div className={styles.forgotFormFooter}>
                                {t('sendEmail')}
                            </div>
                        </div>
                        <div className={styles.forgotFormBtns}>
                            <Link className={styles.forgotFormBtn} to={'/auth/login'}>
                                {t('cancel')}
                            </Link>
                            <Btn type={'submit'} className={cn(styles.forgotFormBtn, styles.active)} disable={disabledBtn}>
                                {t('validate')}
                            </Btn>
                        </div>
                    </Form>
                </main>
            }
        </div>
    )
}
