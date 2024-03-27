const asyncHandler = require("express-async-handler");
const Movie = require("../models/moviesModel");

const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find({});
  res.status(200).json(movies);
});

const getMovieById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(400);
    throw new Error("No existe esa pelicula");
  } else {
    res.status(200).json(movie);
  }
});

const createMovies = asyncHandler(async (req, res) => {
  if (!req.body.overview) {
    res.status(400);
    throw new Error("Por favor teclea una descripción");
  }

  const movie = await Movie.create({
    overview: req.body.overview,
    title: req.body.title,
    original_language: req.body.language,
    vote_average: req.body.vote_average,
    vote_count: req.body.vote_count,
    likes: req.body.likes
  });

  res.status(201).json(movie);
});

const updateMovies = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    res.status(400);
    throw new Error("No existe esa pelicula");
  } else {
    const movieUpdated = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(movieUpdated);
  }
});

const deleteMovies = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    res.status(400);
    throw new Error("No existe esa pelicula");
  } else {
    await Movie.deleteOne(movie);
    res.status(200).json({ id: req.params.id });
  }
});

const updateMovieLike = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  const like = 1 + parseFloat(movie.likes)
  const vote_count = 1 + parseFloat(movie.vote_count)

  const updateLike = {
    likes: like,
    vote_count: vote_count,
    vote_average: (like/vote_count)*100
  }
  
  if (!movie) {
    res.status(400);
    throw new Error("La película no existe");
  } else {

    const movieUpdated = await Movie.findByIdAndUpdate(
      req.params.id,
      updateLike,
      { new: true }
    );
    res.status(200).json(movieUpdated);
  }
});

const updateMovieDislike = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  const like = parseFloat(movie.likes)-1
  const vote_count = parseFloat(movie.vote_count)

  const updateLike = {
    likes: like,
    vote_count: vote_count,
    vote_average: (like/vote_count)*100
  }
  
  if (!movie) {
    res.status(400);
    throw new Error("La película no existe");
  } else {

    const movieUpdated = await Movie.findByIdAndUpdate(
      req.params.id,
      updateLike,
      { new: true }
    );
    res.status(200).json(movieUpdated);
  }
});

module.exports = {
  getMovies,
  createMovies,
  updateMovies,
  deleteMovies,
  getMovieById,
  updateMovieLike,
  updateMovieDislike
};
