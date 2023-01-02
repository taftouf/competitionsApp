import React from 'react'

// Styles
import styles from './index.module.scss'

// Components
import { PageWrapper } from '../../ui/PageWrapper'

export const NotFound = () => {
    return (
        <PageWrapper>
            <div className={styles.error}>
                Not Found
                <span>404</span>
            </div>
        </PageWrapper>
    )
}
