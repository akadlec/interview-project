import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { getMovieById } from '../services/api'
import { releaseYear } from '../utils/helpers'
import type { MovieDetail } from '../interfaces/movies'

const StyledSection = styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    color: #fff;
`

const StyledImg = styled.img`
    border-radius: 8px;
    width: 300px;
    max-width: 100%;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
`

const StyledContent = styled.div`
    flex: 1;
    min-width: 250px;
`

const StyledTitle = styled.h1`
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 10px;
`

const StyledTitleYear = styled.span`
    color: #aaa;
    font-weight: 400;
    margin-left: 10px;
`

const StyledReleaseDate = styled.div`
    color: #aaa;
    font-size: 14px;
    margin-bottom: 15px;
`

const StyledTagline = styled.div`
    color: #ccc;
    font-style: italic;
    font-size: 16px;
    margin: 20px 0;
`

const StyledOverview = styled.div`
    line-height: 1.6em;
    font-size: 15px;
    margin-top: 30px;
`

const StyledOverviewTitle = styled.h2`
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
`

const StyledRating = styled.div`
    background: #444;
    padding: 6px 12px;
    border-radius: 20px;
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    gap: 6px;
    margin-bottom: 15px;
`

const StarIcon = styled.svg`
    width: 16px;
    height: 16px;
    fill: #ffd700;
`

export default function MovieInfo() {
    const { id } = useParams()
    const [movie, setMovie] = useState<MovieDetail | null>(null)

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await getMovieById(id)
                setMovie(data)
            } catch (error) {
                console.log('Failed to fetch movie: ', error)
            }
        }

        fetchMovie()
    }, [id])

    if (!movie) return null

    return (
        <article>
            <StyledSection>
                <figure>
                    <StyledImg
                        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}
                        alt={movie.title}
                    />
                </figure>
                <StyledContent>
                    <StyledTitle>
                        {movie.title}
                        <StyledTitleYear>({releaseYear(movie.release_date)})</StyledTitleYear>
                    </StyledTitle>

                    <StyledReleaseDate>{movie.release_date}</StyledReleaseDate>

                    <StyledRating>
                        <StarIcon viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </StarIcon>
                        {movie.vote_average}
                        <span style={{ color: '#aaa', fontWeight: 400 }}>
                            ({movie.vote_count})
                        </span>
                    </StyledRating>

                    {movie.tagline && <StyledTagline>"{movie.tagline}"</StyledTagline>}

                    {movie.overview && (
                        <StyledOverview>
                            <StyledOverviewTitle>Overview</StyledOverviewTitle>
                            <p>{movie.overview}</p>
                        </StyledOverview>
                    )}
                </StyledContent>
            </StyledSection>
        </article>
    )
}
