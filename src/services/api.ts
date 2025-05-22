import axios from 'axios'
import type {MovieList} from '../interfaces/movies';

export const getMovieById =  async (query: string | undefined) => {
    const endpoint = `https://api.themoviedb.org/3/movie/${query}?api_key=${import.meta.env.VITE_API_KEY}`

    const response = await axios.get(endpoint)

    return response.data
}

export const getMovieByText = async (query: string) => {
    const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${query}`

    const response = await axios.get<{ page: number, results: MovieList[]; total_pages: number; total_results: number }>(endpoint)

    return response.data;
}

export const getMovies = async (page: number, sortBy = 'popularity.desc') => {
    const endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&page=${page}&sort_by=${sortBy}`

    const response = await axios.get<{ page: number, results: MovieList[]; total_pages: number; total_results: number }>(endpoint)

    return response.data
}
