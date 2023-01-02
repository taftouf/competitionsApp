import React, { useEffect, useState } from 'react'

// Styles
import styles from './index.module.scss'

// Components
import { PopupTop } from '../Popup/PopupTop'
import { Form } from '../Form'
import { Input } from '../Input'
import { useInput } from '../../hooks/useInput'
import { Btn } from '../Btn'
import { v4 as uuid } from 'uuid'
import { addNotification } from '../../../store/slices/notificationsSlice'
import { removeNotifTimeout } from '../../functions/removeNotifTimeout'
import axios from 'axios'
import { handleError } from '../../functions/handleError'
import { useDispatch } from 'react-redux'
import { CheckPassword } from '../../ui/CheckPassword'

// function
import { StrongPassword } from '../../functions/StrongPassword'

// traduction
import { useTranslation } from 'react-i18next'

export const HeaderChangePassword = ({closePopup}) => {
    const dispatch = useDispatch()
    const [disabledBtn, setDisabledBtn] = useState(true)

    const {t, i18n} = useTranslation()

    const oldPassInp = useInput('')
    const newPassInp = useInput('')
    const repeatPassInp = useInput('')
    const [errors, setErrors] = useState({})

    const [charNumberValid, setCharNumberValid] = useState(false)
    const [specialCharValid, setSpecialCharValid] = useState(false)
    const [uppercaseValid, setUppercaseValid] = useState(false)
    const [numberValid, setNumberValid] = useState(false)

    const changePassword = async () => {
        const tempErrors = {}

        if (!oldPassInp.value) tempErrors.oldPassword = true
        if (!newPassInp.value) {
            tempErrors.newPassword = true
        }else{
            if(!(charNumberValid && specialCharValid && uppercaseValid && numberValid))
                tempErrors["newPassword"] = 'Password not strong enough'
        }
        if (!repeatPassInp.value) tempErrors.repeatPassword = true

        setErrors({...tempErrors})

        
        if (Object.keys(tempErrors).length > 0) return

        if (newPassInp.value !== repeatPassInp.value) {
            const errorID = uuid()

            dispatch(addNotification({id: errorID, type: 'error', text: 'Passwords do not match'}))
            dispatch(removeNotifTimeout(errorID, 3000))
            return
        }

        const formData = new FormData()
        formData.append('password', oldPassInp.value)
        formData.append('new_password', newPassInp.value)

        try {
            await axios({
                method: 'PATCH',
                url: `api/v3/profile`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept-Language' : i18n.language,
                },
            })
            const successID = uuid()

            dispatch(addNotification({id: successID, type: 'success', text: 'Successfully updated password'}))
            dispatch(removeNotifTimeout(successID, 3000))
            closePopup()
        } catch (error) {
            
            handleError(dispatch, error)
        }
    }

    const checkFields = () => {
        if (oldPassInp.value && newPassInp.value.length >= 8 && repeatPassInp.value.length >= 8) setDisabledBtn(false)
        else setDisabledBtn(true)
    }

    useEffect(() => {
        checkFields()
    }, [oldPassInp.value, newPassInp.value, repeatPassInp.value])

    useEffect(() => {
        var valide = StrongPassword(newPassInp.value)
        setNumberValid(valide.numberValid)
        setCharNumberValid(valide.charNumberValid)
        setSpecialCharValid(valide.specialCharValid)
        setUppercaseValid(valide.uppercaseValid)
    }, [newPassInp])

    return (
        <div className={styles.headerPass}>
            <PopupTop className={styles.headerPassTop} closePopup={closePopup} title={t('changePassword')}/>
            <Form className={styles.headerPassForm} noStyles onSubmit={changePassword}>
                <div className={styles.headerPassWrap}>
                    <Input
                        className={styles.headerPassInp}
                        error={errors.oldPassword}
                        placeholder={t('oldPassword')}
                        type={'password'}
                        dark
                        {...oldPassInp}
                    />
                </div>
                <div className={styles.headerPassWrap}>
                    <Input
                        className={styles.headerPassInp}
                        error={errors.newPassword}
                        placeholder={t('newPassword')}
                        type={'password'}
                        dark
                        {...newPassInp}
                    />
                    <div className={styles.headerPassInfo}>
                        <CheckPassword 
                            charNumberValid={charNumberValid}
                            specialCharValid={specialCharValid}
                            uppercaseValid={uppercaseValid}
                            numberValid={numberValid}
                        /> 
                    </div>
                </div>
                <div className={styles.headerPassWrap}>
                    <Input
                        className={styles.headerPassInp}
                        error={errors.repeatPassword}
                        placeholder={t('confirmNewPassword')}
                        type={'password'}
                        dark
                        {...repeatPassInp}
                    />
                </div>
                <Btn className={styles.headerPassSubmit} type={'submit'} disable={disabledBtn} red={!disabledBtn}>
                    {t('validate')}
                </Btn>
            </Form>
        </div>
    )
}
