

  // Check the length of the input
const checkPasswordLength = (inputPassword, valide) => {
    if (inputPassword.length >= 8) {
        valide.charNumberValid = true
    } else {
        valide.charNumberValid = false
    }
}
  
  // Check for special characters
const checkSpecialCharacters = (inputPassword, valide) => {
    const pattern = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g
    if (pattern.test(inputPassword)) {
        valide.specialCharValid = true
    } else {
        valide.specialCharValid = false
    }
}
  
  // Check for an uppercase character
const  checkUppercase = (inputPassword, valide) => {
    const pattern = /[A-Z]/
    if (pattern.test(inputPassword)) {
        valide.uppercaseValid = true
    } else {
        valide.uppercaseValid = false
    }
}
  
  // Check for a number
const  checkNumber = (inputPassword, valide) => {
    const pattern = /[0-9]/
    if (pattern.test(inputPassword)) {
        valide.numberValid = true
    } else {
        valide.numberValid = false
    }
}

export const StrongPassword = (inputPassworde) => {
    var valide = {
        charNumberValid: false,
        specialCharValid: false,
        uppercaseValid: false,
        numberValid: false
    }

    checkNumber(inputPassworde, valide)
    checkUppercase(inputPassworde, valide)
    checkSpecialCharacters(inputPassworde, valide)
    checkPasswordLength(inputPassworde, valide)
    return valide
}