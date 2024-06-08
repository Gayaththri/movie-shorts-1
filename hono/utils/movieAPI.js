// hono/utils/movieAPI.js
const axios = require("axios");

const TMDB_API_KEY = "your_tmdb_api_key";

async function fetchMovieData(movieName) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${movieName}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw new Error("Failed to fetch movie data");
  }
}

module.exports = {
  fetchMovieData,
};
