import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components'
import type { MovieList } from '../interfaces/movies'
import { formattedText, releaseYear } from '../utils/helpers'

const StyledSection = styled.section`
    &:hover .card-overlay {
        opacity: 1;
        visibility: visible;
    }
`

const StyledDiv = styled.div`
    padding-bottom: 150%;
    position: relative;
`

const StyledLink = styled.a`
    cursor: pointer;
    inset: 0;
    position: absolute;
    z-index: 1;
`

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const StyledSpinner = styled.svg`
    animation: ${spin} 2s linear infinite;
    fill: #fff;
    left: 50%;
    height: 40px;
    margin: -20px 0 0 -20px;
    position: absolute;
    top: 50%;
    width: 40px;
`

const StyledImg = styled.img`
    border-radius: 5px;
    left:0;
    position: absolute;
    top: 0;
    width: 100%;
`

const StyledFigcaption = styled.figcaption`
    padding-block: 7px;
    position: relative;
`

const StyledOverlay = styled.div`
    background: rgba(0, 0, 0, .3);
    bottom: 0;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 300ms;
    visibility: hidden;
`

const StyledTitle = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2em;
    min-height: calc(1.2em * 2);
    font-weight: 600;
`

const StyledReleaseYear = styled.div`
    color: #aaa;
    margin-top: 5px;
`

const StyledVoteAverage = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 8px;
    font-weight: 600;
    font-size: 14px;
    color: #fff;
    background-color: #333;
    padding: 4px 8px;
    border-radius: 12px;
    width: fit-content;
    line-height: 1;
    user-select: none;
`

const StarIcon = styled.svg`
    width: 16px;
    height: 16px;
    fill: gold;
    flex-shrink: 0;
`

export default function Card({ movie }: { movie: MovieList }) {
    const navigate = useNavigate()
    const location = useLocation()

    if (! movie.poster_path) return

    const openDetail = () => {
        navigate(`/movie/${movie.id}/${formattedText(movie.title)}`, {
            state: { backgroundLocation: location }
        })
    }

    return (
        <StyledSection className="card">
            <figure>
                <StyledDiv>
                    <StyledSpinner xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="Layer_1" version="1.1" viewBox="0 0 128 128" xmlSpace="preserve">
                        <g>
                            <path d="M96.1,103.6c-10.4,8.4-23.5,12.4-36.8,11.1c-10.5-1-20.3-5.1-28.2-11.8H44v-8H18v26h8v-11.9c9.1,7.7,20.4,12.5,32.6,13.6   c1.9,0.2,3.7,0.3,5.5,0.3c13.5,0,26.5-4.6,37-13.2c19.1-15.4,26.6-40.5,19.1-63.9l-7.6,2.4C119,68.6,112.6,90.3,96.1,103.6z"/><path d="M103,19.7c-21.2-18.7-53.5-20-76.1-1.6C7.9,33.5,0.4,58.4,7.7,81.7l7.6-2.4C9,59.2,15.5,37.6,31.9,24.4   C51.6,8.4,79.7,9.6,98,26H85v8h26V8h-8V19.7z" />
                        </g>
                    </StyledSpinner>
                    <StyledImg src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} alt={movie.title} />
                    <StyledOverlay className="card-overlay" />
                    <StyledLink onClick={openDetail}></StyledLink>
                </StyledDiv>
                <StyledFigcaption>
                    <StyledTitle>
                        {movie.title}
                    </StyledTitle>
                    <StyledReleaseYear>
                        {releaseYear(movie.release_date)}
                    </StyledReleaseYear>
                    <StyledVoteAverage>
                        <StarIcon viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </StarIcon>
                        {movie.vote_average}
                        <span style={{ color: '#aaa', fontWeight: 400 }}>
                            ({movie.vote_count})
                        </span>
                    </StyledVoteAverage>
                </StyledFigcaption>
            </figure>
        </StyledSection>
    )
}
