import { useNavigate } from "react-router";
import type { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedMovie } from "../redux/movies/moviesSlice";
import "./MoviePage.scss";

export const MoviePage = () => {
  const movie = useSelector((state: RootState) => state.movies.movie);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const formatDate = (dateString?: string) => {
    if (!dateString || dateString.trim() === "") return "Unknown release date";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!movie) return <p className="loading">Loading movie...</p>;

  return (
    <div className="movie-page">
      <button
        className="go-back"
        onClick={() => {
          navigate(-1);
          dispatch(clearSelectedMovie());
        }}
      >
        ← Go Back
      </button>

      <div className="movie-header">
        {movie.poster_path && (
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title}
            loading="lazy"
          />
        )}

        <div className="movie-info">
          <h1>{movie.title}</h1>
          {movie.tagline && <p className="tagline">{movie.tagline}</p>}
          <p>
            <strong>Overview:</strong> {movie.overview}
          </p>
          <p>
            <strong>Release Date:</strong> {formatDate(movie.release_date)}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.runtime} min
          </p>
          <p>
            <strong>Status:</strong> {movie.status}
          </p>
          <p>
            <strong>Budget:</strong> ${(movie.budget ?? 0).toLocaleString()}
          </p>
          <p>
            <strong>Revenue:</strong> ${(movie.revenue ?? 0).toLocaleString()}
          </p>
          <p>
            <strong>Genres:</strong>{" "}
            {movie.genres.map((g) => g.name).join(", ")}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average} ({movie.vote_count}{" "}
            votes)
          </p>
          {movie.homepage && (
            <p>
              <strong>Homepage:</strong>{" "}
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                {movie.homepage}
              </a>
            </p>
          )}
        </div>
      </div>

      {movie.backdrop_path && (
        <div className="movie-backdrop">
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            alt={`${movie.title} backdrop`}
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};
