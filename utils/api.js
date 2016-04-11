const root = 'https://api.themoviedb.org/3';

import secrets from './secrets';
const key = secrets.tmdbKey;

const api = {
  loadMovies: () => {
    return fetch(`${root}/movie/popular?api_key=${key}`)
             .then(response => response.json());
  }
}

export default api;
