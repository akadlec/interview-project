import { useContext } from 'react'
import { MoviesContext } from '../App'
import MovieCard from './MovieCard'
import MoviesNotFound from './MoviesNotFound.tsx'
import MoviesLoading from './MoviesLoading.tsx';

export default function Movies() {
    const { loaded, movies } = useContext(MoviesContext)

    return (
        <article className="cards">
            {
                movies.length ? (
                    movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : loaded ? <MoviesNotFound /> : <MoviesLoading />
            }
        </article>
    )
}
