const validator = require('validator')

const validate = user => {
    let error = {}

    if(!user.name){
        error.name = 'Place Provide your name'
    }
    if(!user.email){
        error.email = 'Place Provide your email'
    }else if(!validator.isEmail(user.email)){
        error.email = 'Place Provide your valid email'
    }

    if(!user.password){
        error.password = 'Place Provide your password'
    }else if (user.password.length < 6){
        error.password = 'Password Must be Greather or Equal 6 Character'
    }

    if(!user.confirmPassword){
        error.confirmPassword = 'Place Provide Confirm Password'
    }else if (user.password != user.confirmPassword){
        error.confirmPassword = 'Password is Dosen\'t Macth'
    }

    return {
        error,
        isValid: Object.keys(error).length == 0
    }
}

module.exports = validate