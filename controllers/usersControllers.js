const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const crearUser = asyncHandler(async (req, res) => {

    //Desestructuramos el body
    const { name, lastName, userName, email, password } = req.body

    //verificamos que nos pasen todos los datos necesarios para crear un usuario
    if (!name || !userName || !lastName || !email || !password) {
        res.status(400)
        throw new Error('Faltan datos')
    }

    //Verificar que ese usuario no exista a traves de su email 
    const userExiste = await User.findOne({ email })
    if (userExiste) {
        res.status(400)
        throw new Error('Ese usuario ya existe en la base de datos')
    }

    //Hacemos el HASH al password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Crear el usuario
    const user = await User.create({
        name,
        lastName,
        userName,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            userName: user.userName,
            name: user.name,
            lastName: user.lastName,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('No se pudieron guardar los datos')
    }

    //res.status(201).json({ message: 'Crear Usuario' })
})

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    //verificar que exista un usuario con ese email
    const user = await User.findOne({ email })

    //si el usuario existe verificamos tambien el password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generarToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales incorrectas')
    }

})

//Solo para administradores
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
})


//funcion para generar el token
const generarToken = (id_usuario) => {
    return jwt.sign({ id_usuario }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    crearUser,
    loginUser,
    getUsers
}