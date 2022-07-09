const axios = require('axios');
const { json } = require('express');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache({ stdTTL: 300});

const topMovies = ['tt0076759', 'tt0120591', 'tt0117705', 'tt3554046', 'tt0110475', 'tt0133093', 'tt0110357', 'tt0112573', 'tt0119217', 'tt8579674']

const fetchMovies = async () => {
    try {
        if(myCache.has("movies")){
            return myCache.get("movies") 
        }else{
            const allMovies = [];
            for(let i=0; i<topMovies.length; i++){
                const response = await axios.get(`https://www.omdbapi.com/?&apikey=78e9821b&type=movie&i=${topMovies[i]}`);
                const data = response.data
                allMovies.push(data)       
            }
            myCache.set("movies", allMovies);
            return allMovies 
        }   
    } catch (err) {
        throw new Error(err);
    }  
}

const fetchNames = async (value) => {
    try {
        SEARCH_NAME = `https://www.omdbapi.com/?&apikey=78e9821b&type=movie&s=${value}`
        const response = await axios.get(SEARCH_NAME);
        if(response.data.Search != undefined){
            const data = response.data.Search
            return data
        }
        else {
            return ({data: []})
        }
    } catch (err) {
        throw new Error(err);
    }  
}

const fetchMovieId = async (id) => {
    try {
        MOVIE_URL = `https://www.omdbapi.com/?&apikey=78e9821b&i=${id}`
        const response = await axios.get(MOVIE_URL);
        const data = response.data
        return data
    } catch (err) {
        throw new Error(err);
    }  
}

module.exports = { fetchMovies, fetchNames, fetchMovieId }