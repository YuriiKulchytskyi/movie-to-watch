import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { fetchPopularMovies } from "../redux/movies/moviesOperations";
import { MovieList } from "../components/MovieList/MovieList";

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const popular = useSelector((state: RootState) => state.movies.popular);
  const currentPage = useSelector(
    (state: RootState) => state.movies.currentPage,
  );
  const totalPages = useSelector((state: RootState) => state.movies.totalPages);

  useEffect(() => {
    dispatch(fetchPopularMovies({ page: 1 }));
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(fetchPopularMovies({ page: currentPage + 1 }));
  };

  return (
    <MovieList
      movies={popular}
      onLoadMore={handleLoadMore}
      canLoadMore={currentPage <= totalPages}
    />
  );
};
