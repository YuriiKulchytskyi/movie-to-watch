import { useDispatch, useSelector } from "react-redux";
import "./MovieList.scss";
import type { AppDispatch, RootState } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchMovieById, fetchSelectedGenre } from "../../redux/movies/moviesOperations";

export const MovieList = () => {
  const movieList = useSelector((state: RootState) => state.movies.movies);
  const selectedGenreMovies = useSelector(
    (state: RootState) => state.movies.selectedGenreMovies,
  );
  const { genreId } = useParams<{ genreId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (genreId) {
      dispatch(fetchSelectedGenre(Number(genreId)));
    }
  }, [dispatch, genreId]);

  const movies = genreId ? selectedGenreMovies : movieList;
  const formatedDate = (dateString?: string) => {
    if (!dateString) return "Unknown release date";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!movies.length) return <p>Loading movies...</p>;



  return (
    <ul className="movieList">
      {movies.map((movie) => (
        <li key={movie.id}>
          <div
            onClick={(e) => {
              e.preventDefault();
              dispatch(fetchMovieById({id: movie.id}));
              navigate(`/movie/${movie.id}`);
            }}
          >
            {movie.title}
          </div>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
              loading="lazy"
            />
            <div>
              <p className="overview">{movie.overview}</p>
              <p>{formatedDate(movie.release_date)}</p>
              <div>
                <p>{movie.vote_average}</p>
                <p>{movie.vote_count}</p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
