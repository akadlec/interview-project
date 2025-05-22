import { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components'
import { MoviesContext } from '../App'
import { getMovies } from '../services/api'

const StyledPagination = styled.section`
    align-items: center;
    display: flex;
    gap:10px;
    justify-content: center;
    margin-top: 40px;
`

const StyledButtonsContainer = styled.div`
    display: flex;
    gap: 5px;
`

const StyledButton = styled.button`
    border: none;
    border-radius: 3px;
    cursor: pointer;
    padding: 10px 12px;

    &.active {
        background: #333;
        color: #fff;
        pointer-events: none;
    }
`

export default function MoviePagination() {
    const { movies, totalPages, setLoaded, setMovies, setTotalPages, setTotalResults } = useContext(MoviesContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const currentPage = parseInt(searchParams.get('page') || '1', 10)

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMovies(currentPage)

            setLoaded(true)
            setMovies(response.results)
            setTotalPages(response.total_pages > 500 ? 500 : response.total_pages) // API Error - max page is 500
            setTotalResults(response.total_results)
        }

        fetchData()
    }, [currentPage, setLoaded, setMovies, setTotalPages, setTotalResults])

    if (! movies.length) return

    const maxVisiblePages: number = 5

    const handleButtonClick = (page: number) => {
        setSearchParams(page === 1 ? {} : { page: page.toString() })

        const fetchMovies = async () => {
            try {
                const response = await getMovies(page)

                setLoaded(true)
                setMovies(response.results)
                setTotalPages(response.total_pages > 500 ? 500 : response.total_pages) // API Error - max page is 500
                setTotalResults(response.total_results)
            } catch(error) {
                console.error('Failed to fetch movies: ', error)
            }
        }

        fetchMovies()
    }


    const getVisiblePages = () => {
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        let endPage = startPage + maxVisiblePages - 1

        if (endPage > totalPages) {
            endPage = totalPages
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        const pages = []
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i)
        }

        return pages
    }

    const visiblePages = getVisiblePages()

    return (
        <StyledPagination>
            <div>
                Pagination
            </div>
            <StyledButtonsContainer>
                <StyledButton
                    onClick={() => handleButtonClick(1)}
                    disabled={currentPage === 1}
                >
                    First
                </StyledButton>

                <StyledButton
                    onClick={() => handleButtonClick(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </StyledButton>

                {visiblePages.map((page) => (
                    <StyledButton
                        key={page}
                        className={currentPage === page ? 'active' : ''}
                        onClick={() => handleButtonClick(page)}
                    >
                        {page}
                    </StyledButton>
                ))}

                <StyledButton
                    onClick={() => handleButtonClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </StyledButton>

                <StyledButton
                    onClick={() => handleButtonClick(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    Last
                </StyledButton>
            </StyledButtonsContainer>
        </StyledPagination>
    )
}
