import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MoviesContext, SearchContext } from '../App'
import { getMovieByText } from '../services/api'
import MovieList from '../components/MovieList'
import MoviePagination from '../components/MoviePagination'

export default function Home() {
    const { query } = useParams()
    const { setLoaded, setMovies, setTotalPages, setTotalResults } = useContext(MoviesContext)
    const { setSearch } = useContext(SearchContext)

    useEffect(() => {
        const fetchData = async () => {
            if (query) {
                const searchTerm = query.replace(/-/g, ' ')
                const capitalizedSearchTerm = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)

                setSearch(capitalizedSearchTerm)

                const response = await getMovieByText(encodeURIComponent(query))

                setMovies(response.results)
            }
        }

        fetchData()
    }, [query, setLoaded, setMovies, setTotalPages, setTotalResults, setSearch])

    return (
        <main>
            <MovieList />
            {! query && (<MoviePagination />)}
        </main>
    )
}
