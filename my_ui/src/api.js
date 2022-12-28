import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8765'
});

export const getMovies = () => api.get('/movies', {
    headers: {
        Authorization: 'open sesame'
    }
});
export const addMovie = (title) => api.post('/movies', { title }, {
    headers: {
        Authorization: 'open sesame'
    }
});