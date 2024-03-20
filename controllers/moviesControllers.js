const asyncHandler = require('express-async-handler')
const Movie = require('../models/moviesModel')

const getMovies = asyncHandler(async (req, res) => {

    const movies = await Movie.find({})
    res.status(200).json(movies)

})

const createMovies = asyncHandler(async (req, res) => {

    if (!req.body.overview) {
        res.status(400)
        throw new Error('Por favor teclea una descripción')
    }

    const movie = await Movie.create({
        overview: req.body.overview,
        title: req.body.title,
        original_language: req.body.language,
        vote_average: req.body.vote_average,
        vote_count: req.body.vote_count
    })

    res.status(201).json(movie)
})




module.exports = {
    getMovies,
    createMovies
}