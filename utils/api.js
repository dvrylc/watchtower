import secrets from './secrets';

const root = 'https://api.themoviedb.org/3';
const imgRoot = 'https://image.tmdb.org/t/p';
const key = secrets.tmdbKey;

const api = {
  loadMovies: () => {
    return fetch(`${root}/movie/popular?api_key=${key}`)
             .then(response => response.json());
  },
  loadMovieDetails: movieID => {
    return fetch(`${root}/movie/${movieID}?api_key=${key}`)
             .then(response => response.json());
  },
  loadMovieTrailers: movieID => {
    return fetch(`${root}/movie/${movieID}/videos?api_key=${key}`)
             .then(response => response.json());
  },
  loadTv: () => {
    return fetch(`${root}/tv/popular?api_key=${key}`)
             .then(response => response.json());
  },
  getPoster: (file, size) => {
    return `${imgRoot}/${size}${file}?api_key=${key}`;
  }
}

export default api;
