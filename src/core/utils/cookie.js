const setCookie = (key, val, expired = 604800, refresh) => {
    document.cookie = `${key}=;max-age=-1`
    document.cookie = `${key}=${val};max-age=${expired};path=/`

    if (refresh) {
        setTimeout(() => {
            refreshToken()
        }, (expired + 1) * 1000)
    }
}

const deleteCookie = (key) => {
    document.cookie = `${key}=;max-age=-1;path=/`
}

const getCookie = key => {
    const cookie = document.cookie
    const cookieArray = cookie.split(';')

    if (cookieArray.length === 0) return null

    for (const item of cookieArray) {
        const itemArr = item.split('=')
        let itemKey = itemArr[0]
        let itemValue = itemArr[1]

        if (itemKey) itemKey = itemKey.trim()
        if (itemValue) itemValue = itemValue.trim()

        if (itemKey === key) {
            return itemValue
        }
    }
}

const refreshToken = async () => {
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
                setCookie('refresh_token', data.refresh_token, data.refresh_token_expiry)
                setCookie('access_token', data.access_token, data.access_token_expiry, true)
            }

        })
        .catch(err => {
            console.log(err)
        })
}


export {setCookie, getCookie, deleteCookie}
