const express = require('express')
const connnectDB = require('./config/db')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const usersRoutes = require('./routes/usersRoute')
const moviesRoutes = require('./routes/moviesRoute')
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')

connnectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/movies', moviesRoutes)

app.use(errorHandler)

app.listen(port, ()=>console.log(`Servidor iniciado en el puerto ${port}`))