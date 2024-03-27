const express = require("express");
const router = express.Router();
const {
  getMovies,
  createMovies,
  updateMovies,
  deleteMovies,
  getMovieById,
  updateMovieLike,
  updateMovieDislike,
} = require("../controllers/moviesControllers");
const { isAdmin } = require("../middleware/isAdminMiddleware");
const { protect } = require("../middleware/authMiddleware");
//const { protect } = require('../middleware/authMiddleware')

//router.route('/').get(protect, getTareas).post(protect, createTareas)
router.get("/", getMovies);
router.get("/:id", protect, getMovieById);
router.post("/", protect, isAdmin, createMovies);
router.put("/like/:id", protect, updateMovieLike);
router.put("/dislike/:id", protect, updateMovieDislike)
//router.route('/:id').delete(deleteTareas).put(updateTareas)
router.put("/:id", protect, isAdmin, updateMovies);
router.delete("/:id", protect, isAdmin, deleteMovies);

module.exports = router;
