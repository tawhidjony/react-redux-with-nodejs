const validator = require('validator')

const validate = user => {
    let error = {}

  
    if(!user.email){
        error.email = 'Place Provide your email'
    }else if(!validator.isEmail(user.email)){
        error.email = 'Place Provide your valid email'
    }

    if(!user.password){
        error.password = 'Place Provide your password'
    }

    return {
        error,
        isValid: Object.keys(error).length == 0
    }
}

module.exports = validate