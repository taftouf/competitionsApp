import React, { useEffect } from 'react'

// Hooks
import { useInput } from '../../hooks/useInput'

// Styles
import styles from './index.module.scss'

export const Counter = ({setValue, initValue}) => {
    const input = useInput(0)

    const handleBlur = () => {
        if (input.value === '' || +input.value < 0) input.setNewValue(0)
    }

    const increment = () => input.setNewValue(+input.value + 1)
    const decrement = () => +input.value > 0 && input.setNewValue(+input.value - 1)

    useEffect(() => {
        if (input.value !== '' && +input.value >= 0) setValue(+input.value)
    }, [input.value])

    useEffect(() => {
        if (initValue) input.setNewValue(initValue)
    }, [initValue])

    return (
        <div className={styles.counter}>
            <button className={styles.counterBtn} type={'button'} onClick={increment}>
                +
            </button>
            <input
                className={styles.counterInp}
                type='number'
                value={input.value}
                onChange={input.onChange}
                onBlur={handleBlur}
            />
            <button className={styles.counterBtn} type={'button'} onClick={decrement}>
                -
            </button>
        </div>
    )
}
