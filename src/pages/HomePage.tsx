import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../redux/store'
import { fetchPopularMovies } from '../redux/movies/moviesOperations'
import { MovieList } from '../components/MovieList/MovieList'

export const HomePage = () => {
    
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchPopularMovies())
    }, [dispatch])

    const popular = useSelector((state: RootState) => state.movies.popular)

  return (
    <MovieList movies={popular}/>    

  )
}
