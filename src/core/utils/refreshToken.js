import { getCookie, setCookie } from './cookie'
import axios from 'axios'

const {fetch: originalFetch} = window

window.fetch = async (...args) => {
    let [resource, config] = args
    let response
    response = await originalFetch(resource, config)
    const refresh_token = getCookie('refresh_token')
    if ((response.status === 401 || response.status === 422) && refresh_token && !resource.includes('login')) {
        await refreshToken()

        config['headers'] = {
            Authorization: getCookie('access_token') ? `Bearer ${getCookie('access_token')}` : ''
        }

        response = await originalFetch(resource, config)
        if (response.status === 401 || response.status === 204) {
            return {};
        }
    }
    return response
}

axios.defaults.baseURL = process.env.REACT_APP_API_HOST
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Authorization'] = getCookie('access_token') ? `Bearer ${getCookie('access_token')}` : ''

let requestConfig = {}

axios.interceptors.request.use(function (config) {
    requestConfig = {...config}
    return config
})

axios.interceptors.response.use(function (config) {
    return config
}, async function (error) {
    const refresh_token = getCookie('refresh_token')

    if ((error.response.status === 401 || error.response.status === 422) && refresh_token) {
        await refreshToken()

        axios.defaults.headers.common['Authorization'] = getCookie('access_token') ? `Bearer ${getCookie('access_token')}` : ''
        await axios({
            method: 'POST',
            baseURL: requestConfig.baseURL,
            url: requestConfig.url,
            data: requestConfig.data,
            headers: requestConfig.headers.common
        })
    } else {
        return Promise.reject(error)
    }
})

export const refreshToken = async () => {
    let refresh_token = getCookie('refresh_token')
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': refresh_token && refresh_token !== 'undefined' ? `Bearer ${refresh_token}` : '',
        },
    }

    await fetch(`${process.env.REACT_APP_API_HOST}/auth/v3/refresh-token`, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.refresh_token !== undefined) {
                setCookie('refresh_token', data.refresh_token)
                setCookie('access_token', data.access_token)
                requestConfig.headers.common['Authorization'] = `Bearer ${data.access_token}`
            }

        })
        .catch(err => {
            console.log(err)
        })
}


export default fetch
