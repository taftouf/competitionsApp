import { getCookie } from './cookie'
import i18next from 'i18next';

export const fetchData = async (endpoint, options) => {
        return await fetch(`${process.env.REACT_APP_API_HOST}${endpoint}`, {
        ...options,
        headers: {
            'Accept-Language' : i18next.language, 
            'Authorization': `Bearer ${getCookie('access_token')}`,
            ...options?.headers,
        },
    })
}
