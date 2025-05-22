import { Routes, Route, useLocation } from 'react-router-dom'
import { GlobalStyle } from './components/GlobalStyle'
import Header from './components/Header'
import Home from './pages/Home'
import Movie from './pages/Movie'
import MovieModal from './pages/MovieModal';
import PageNotFound from './pages/PageNotFound'
import './css/reset.css'

function Router() {
    const location = useLocation()

    const state = location.state as { backgroundLocation?: Location }

    return (
        <>
            <GlobalStyle />
            <Header />
            <Routes location={state?.backgroundLocation || location}>
                <Route path="/" element={<Home />} />
                <Route path="/search/:query" element={<Home />} />
                <Route path="/movie/:id/:title" element={<Movie />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>

            {state?.backgroundLocation && (
                <Routes>
                    <Route path="/movie/:id/:title" element={<MovieModal />} />
                </Routes>
            )}
        </>
    )
}

export default Router
