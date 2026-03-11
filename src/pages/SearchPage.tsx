import { useDispatch, useSelector } from "react-redux";
import { MovieList } from "../components/MovieList/MovieList";
import type { AppDispatch, RootState } from "../redux/store";
import { fetchMoviesByQuery } from "../redux/movies/moviesOperations";

export const SearchPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const searchedMovies = useSelector((state: RootState) => state.movies.movies);
  const totalPages = useSelector((state: RootState) => state.movies.totalPages);
  const currentPage = useSelector((state: RootState) => state.movies.currentPage);

  const query = useSelector((state: RootState) => state.movies.lastQuery);

  const handleLoadMore = (): void => {
    dispatch(
      fetchMoviesByQuery({
        query,
        page: currentPage,
      })
    );
  };

  return (
    <MovieList
      movies={searchedMovies}
      onLoadMore={handleLoadMore}
      canLoadMore={currentPage <= totalPages}
    />
  );
};