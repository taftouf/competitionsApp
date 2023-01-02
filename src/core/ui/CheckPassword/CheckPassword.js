import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// traduction
import { useTranslation } from 'react-i18next'

export const CheckPassword = ({
        charNumberValid,
        specialCharValid,
        uppercaseValid,
        numberValid,
    }) => {

    const {t} = useTranslation()

    return (
    <div className={styles.validation}>
        <div className={styles.validator}>
            <p className={cn(styles.validationItem, {
                [styles.valideSuccess] : charNumberValid,
            })}>- {t('atleastCharacter')}</p>
        </div>
        <div className={styles.validator}>
            <p className={cn(styles.validationItem, {
                [styles.valideSuccess] :specialCharValid ,
            })}>- {t('specialCharacter')} (!@#$%^&*)</p>
        </div>
        <div className={styles.validator}>
            <p className={cn(styles.validationItem, {
                [styles.valideSuccess] :uppercaseValid,
            })}>- {t('lowercaseUppercase')}</p>
        </div>
        <div className={styles.validator}>
            <p className={cn(styles.validationItem, {
                [styles.valideSuccess] :numberValid,
            })}>- {t('number')}</p>
        </div>
    </div>
  )
}
