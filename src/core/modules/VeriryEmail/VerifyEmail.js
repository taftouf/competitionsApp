import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

// Styles
import styles from './index.module.scss'

// Functions
import { checkErrors } from '../../functions/checkErrors'
import { removeNotifTimeout } from '../../functions/removeNotifTimeout'

// Slices
import { addNotification } from '../../../store/slices/notificationsSlice'

// Utils
import { getCookie } from '../../utils/cookie'

// Hooks
import { useInput } from '../../hooks/useInput'

// Components
import { PageWrapper } from '../../ui/PageWrapper'
import { Form } from '../../ui/Form'
import { InputCode } from '../../ui/InputCode'
import { t } from 'i18next'


export const VerifyEmail = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const inputCode = useInput('')

    const [errors, setErrors] = useState({})

    const submitCode = async () => {
        const inputsInfo = [
            {el: inputCode, errorName: 'code', errorText: 'Enter code'},
        ]

        
        if (await checkErrors(setErrors, inputsInfo)) return

        const res = await fetch(`${process.env.REACT_APP_API_HOST}/api/v3/profile/verify-email`, {
            method: 'PATCH',
            body: JSON.stringify({
                code: +inputCode.value,
            }),
            headers: {
                'Authorization': `Bearer ${getCookie('access_token')}`,
                'Content-Type': 'application/json',
            }
        })

        const data = await res.json()

        if (!res.ok) {
            const errorID = uuid()

            dispatch(addNotification({id: errorID, type: 'error', text: data.message}))
            dispatch(removeNotifTimeout(errorID, 3000))
        } else {
            navigate('/dashboard')
        }
    }

    const resendCode = async()=>{
        await fetch(`${process.env.REACT_APP_API_HOST}/auth/v3/email/get-code?email=${location.state.email}`, {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    return (
        <PageWrapper auth>
            <Form className={styles.forgotForm} onSubmit={submitCode}>

                <InputCode
                    length={6}
                    id={'code'}
                    error={errors.code}
                    onComplete={code => {
                        inputCode.value = code
                        submitCode()
                    }}
                />
                <div className={styles.forgotFormMessage}>
                    {t('enterCodeReceived')}
                </div>

                <div className={styles.registerForgotWrap}>
                    <button className={styles.registerForgot} onClick={()=>resendCode()}>
                        {t('IDidntReceivecCode')}
                    </button>
                </div>
            </Form>
        </PageWrapper>
    )
}
