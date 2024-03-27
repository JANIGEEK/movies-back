const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    title:{
        type: String,
        require:[true, "Ingresa el nombre de la pelicula"]
    },
    original_language:{
        type:String,
        require:[true," "],
    },
    overview:{
        type:String,
        require:[true, " "],
    },
    poster_path:{
        type:String,
        require:[ " "]
    },
    vote_average:{
        type:Number
    },
    vote_count:{
        type:Number
    },
    likes:{
        type:Number
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Movie', movieSchema)