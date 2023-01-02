import React, { useState } from 'react'
import cn from 'classnames'

import { SvgSprite } from '../SvgSprite/SvgSprite'

// Styles
import styles from './index.module.scss'

export const Input = ({placeholder, forgotInput,forgotInputPwd, className, error, type, id, disabled, dark, ...typeHandle}) => {
    const [passwordShown, setPasswordShown] = useState(false)

    const togglePasswordVisibility = () => setPasswordShown(!passwordShown)

    return (
        <div className={cn(styles.container, {
            [className]: className,
        })}>
            <div className={cn({
                [styles.inputWrapper]: true,
                [styles.inputWrapperError]: error,
            })}>
                <input
                    className={cn({
                        [styles.input]: true,
                        [styles.inputDisabled]: disabled,
                        [styles.radius]: type === 'password',
                        [forgotInput] : forgotInput,
                        [forgotInputPwd]:forgotInputPwd,
                    })}
                    type={type !== 'password' ? type : passwordShown ? 'text' : type}
                    placeholder={placeholder}
                    value={typeHandle.value}
                    onChange={typeHandle.onChange}
                    id={id}
                />
                {error && <span className={styles.inputError}>{error}</span>}
            </div>

            {type === 'password' && (
                <div className={cn(styles.containerEyeIcon, {
                    [styles.containerEyeIconDark]: dark,
                    [forgotInput] : forgotInput,
                    [forgotInputPwd] : forgotInputPwd,
                })}
                     onClick={togglePasswordVisibility}
                >
                    {
                        !passwordShown ? (
                            <SvgSprite
                                className={styles.eyeIcon}
                                spriteID={'eyePassword'}/>
                        ) : (
                            <SvgSprite
                                className={styles.eyeIcon}
                                spriteID={'eyePasswordHide'}/>
                        )
                    }
                </div>
            )}
        </div>
    )
}
