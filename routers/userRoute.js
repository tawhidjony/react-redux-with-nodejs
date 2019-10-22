const router = require('express').Router()
const {loging, register} = require('../controllers/userController')
//Registration Route
//localhost:4000/api/users/register
router.post('/register', register)

//localhost:4000/api/users/login
router.post('/login', loging)



module.exports = router