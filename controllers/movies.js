const express = require('express');
const router = express.Router();

const { fetchMovies, fetchNames, fetchMovieId } = require('./../services/movies');


router.get('/', async (req, res) => {
    try {
        const moviesData = await fetchMovies();
        return res.json(moviesData);
    } catch(err) {
        return res.sendStatus(400);
    }
});

router.get('/search/:value', async (req, res) => {
    const { value } = req.params
    try {
        let searchMovieName = await fetchNames(value);
        if(!searchMovieName.length){
            searchMovieName = [];
        }
        return res.json(searchMovieName);
    } catch(err) {
        return res.sendStatus(400);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const movieData = await fetchMovieId(id);
        return res.json(movieData);
    } catch(err) {
        return res.sendStatus(400);
    }
});

module.exports = router;