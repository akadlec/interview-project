import { BrowserRouter } from 'react-router-dom'
import Router from './Router.tsx'
import {createContext, useState} from 'react';
import type {MovieList} from './interfaces/movies.ts';

export const SearchContext = createContext<{
  search: string;
  setSearch: (search: string) => void
}>({
  search: '',
  setSearch: () => {}
})

export const MoviesContext = createContext<{
  loaded: boolean;
  movies: MovieList[];
  totalPages: number;
  totalResults: number;
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>
  setMovies: React.Dispatch<React.SetStateAction<MovieList[]>>
  setTotalPages: React.Dispatch<React.SetStateAction<number>>
  setTotalResults: React.Dispatch<React.SetStateAction<number>>
}>({
  loaded: false,
  movies: [],
  totalPages: 0,
  totalResults: 0,
  setLoaded: () => {},
  setMovies: () => {},
  setTotalPages: () => {},
  setTotalResults: () => {},
})

export default function App() {
  const [search, setSearch] = useState<string>('')
  const [loaded, setLoaded] = useState<boolean>(false)
  const [movies, setMovies] = useState<MovieList[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [totalResults, setTotalResults] = useState<number>(0)

  const searchValues = {
    search,
    setSearch,
  }

  const moviesValues = {
    loaded,
    movies,
    totalPages,
    totalResults,
    setLoaded,
    setMovies,
    setTotalPages,
    setTotalResults,
  }

  return (
    <SearchContext.Provider value={ searchValues }>
      <MoviesContext.Provider value={ moviesValues }>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </MoviesContext.Provider>
    </SearchContext.Provider>
  )
}
