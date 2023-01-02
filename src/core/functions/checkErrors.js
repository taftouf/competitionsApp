export const checkErrors = async (setErrors, inputs) => {
    const tempErrors = {}
    await setErrors({})

    inputs.forEach(input => {
        if (!input.el.value)
            tempErrors[input.errorName] = input.errorText
    })

    if (Object.keys(tempErrors).length > 0) {
        await setErrors({...tempErrors})

        return true
    }

    return false
}
