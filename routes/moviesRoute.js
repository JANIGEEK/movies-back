const express = require('express')
const router = express.Router()
const { getMovies, createMovies } = require('../controllers/moviesControllers')
//const { protect } = require('../middleware/authMiddleware')

//router.route('/').get(protect, getTareas).post(protect, createTareas)
router.get('/',  getMovies)
router.post('/',  createMovies)

//router.route('/:id').delete(deleteTareas).put(updateTareas)
//router.put('/:id',  updateTareas)
//router.delete('/:id',  deleteTareas)

module.exports = router