const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const registerValidator = require('../validator/registerValidator');
const loginValidator = require('../validator/loginValidator');
const User = require('../model/User');
const {serverError, resourceError} = require('../util/error');

module.exports = {
 loging(req, res){
    let {email, password} = req.body
    let validate = loginValidator({email, password})

    if(!validate.isValid){
        return res.status(400).json(validate.error)
    }

    User.findOne({email})
        .then(user => {
            if(!user){
                return resourceError (res,'User not Found!' )
            }

            bcrypt.compare(password, user.password, (err, result) => {
                if(err){
                    return serverError(res, err)
                }
                
                if(!result){
                    return resourceError(res, 'Password Dosen\'t Macth')
                }

                let token = jwt.sign({
                    _id: user._id,
                    name: user.name,
                    email :user.email
                }, 'SECRET', {expiresIn:'2h'})

                res.status(200).json({
                    message:'Login Successful',
                    token:`Bearer ${token}`
                })
            });
        })
        .catch(error => serverError(res, error))
 },

 register(req, res){
     let {name, email, password, confirmPassword} = req.body
     let validate = registerValidator({name, email, password, confirmPassword})

     if(!validate.isValid){
        return res.status(400).json(validate.error)
     }else{
        User.findOne({email})
        .then(user => {
           if(user){
            return resourceError (res,'Email Alredy Exist' )
           }

           bcrypt.hash(password, 11, (err, hash) => {
                if(err){
                    return resourceError (res,'server Error Occurred' )
                }

                let user = new User({
                    name,email,password:hash
                })
                
                user.save()
                    .then(user => {
                        res.status(201).json({
                            message:'User Create Successfully',
                            user
                        })
                    })
                    .catch(error => serverError(res, error))
           }) 
        })
        .catch(error => serverError(res, error))
     }
 }



}