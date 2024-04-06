const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require:[true, "Ingresa tu nombre"]
    },
    lastName:{
        type:String,
        require:[true,"Ingresa tu apellido"]
    },
    userName:{
        type:String,
        require:[true,"Ingresa un ususario"],
        unique: true
    },
    email:{
        type:String,
        require:[true, "Ingresa un email"],
        unique: true
    },
    password:{
        type:String,
        require:[true, "Ingresa tu contraseña"]
    },
    esAdmin:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

module.exports = mongoose.model('User', userSchema)