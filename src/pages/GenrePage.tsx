import { useEffect } from "react";
import type { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSelectedGenre } from "../redux/movies/moviesOperations";
import { useParams } from "react-router-dom";
import { MovieList } from "../components/MovieList/MovieList";
import { clearSelectedGenreMovies } from "../redux/movies/moviesSlice";

export const GenrePage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const movies = useSelector(
    (state: RootState) => state.movies.selectedGenreMovies,
  );

  const currentPage = useSelector(
    (state: RootState) => state.movies.currentPage,
  );
  const totalPages = useSelector((state: RootState) => state.movies.totalPages);

  useEffect(() => {
  if (id) {
    dispatch(clearSelectedGenreMovies());
    dispatch(fetchSelectedGenre({ genreId: Number(id), page: 1 }));
  }
}, [dispatch, id]);

  useEffect(() => {
    if (id) {
      dispatch(fetchSelectedGenre({ genreId: Number(id), page: 1 }));
    }
  }, [dispatch, id]);

  const handleLoadMore = () => {
    if (id) {
      dispatch(
        fetchSelectedGenre({ genreId: Number(id), page: currentPage + 1 }),
      );
    }
  };

  return (
    <MovieList
      movies={movies}
      onLoadMore={handleLoadMore}
      canLoadMore={currentPage <= totalPages}
    />
  );
};
