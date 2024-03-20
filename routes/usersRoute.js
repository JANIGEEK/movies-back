const express = require('express')
const router = express.Router()
const { crearUser, loginUser, getUsers } = require('../controllers/usersControllers')

router.post('/signup', crearUser)
router.post('/login', loginUser)
//Admin
router.get('/datosUsers', getUsers)

module.exports = router