import { Link, useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedMovie } from "../redux/movies/moviesSlice";
import "./MoviePage.scss";
import { formatedDate } from "../utils/formatedDate";
import { useEffect, useState } from "react";
import {
  fetchMovieById,
  fetchSimilarMovies,
} from "../redux/movies/moviesOperations";
import { MovieItem } from "../components/MovieList/MovieItem";
import { removeFromFavorites } from "../utils/removeFromFavorites";
import { addToFavorites } from "../utils/addToFavorite";
import { isFavorite } from "../utils/isFavorite";

export const MoviePage = () => {
  const [favorite, setFavorite] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();
  console.log(id, "Some text");

  const movie = useSelector((state: RootState) => state.movies.movie);
  const dispatch = useDispatch<AppDispatch>();
  const similar = useSelector((state: RootState) => state.movies.similar);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById({ id: Number(id) }));
      dispatch(fetchSimilarMovies({ id: Number(id) }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!movie) return;

    const checkFavorite = async () => {
      const result = await isFavorite(movie.id);
      setFavorite(result);
    };

    checkFavorite();
  }, [movie]);
  if (!movie) return <p className="loading">Loading movie...</p>;

  return (
    <div className="movie-page">
      <Link
        to={"/"}
        className="go-back"
        onClick={() => {
          dispatch(clearSelectedMovie());
        }}
      >
        ← Go Back
      </Link>

      <div className="movie-header">
        {movie.poster_path && (
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title}
            loading="lazy"
          />
        )}
        <button
          onClick={async (e) => {
            e.stopPropagation();

            if (favorite) {
              await removeFromFavorites(movie);
              setFavorite(false);
            } else {
              await addToFavorites(movie);
              setFavorite(true);
            }
          }}
        >
          {favorite ? "💔 Remove from Watchlist" : "❤️ Add to Watchlist"}
        </button>
        <div className="movie-info">
          <h1>{movie.title}</h1>
          {movie.tagline && <p className="tagline">{movie.tagline}</p>}
          <p>
            <strong>Overview:</strong> {movie.overview}
          </p>
          <p>
            <strong>Release Date:</strong> {formatedDate(movie.release_date)}
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

      {/* {movie.backdrop_path && (
        <div className="movie-backdrop">
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            alt={`${movie.title} backdrop`}
            loading="lazy"
          />
        </div>
      )} */}

      <ul className="similar-list">
        {similar.map((movie) => (
          <MovieItem key={movie.id} item={movie} />
        ))}
      </ul>
    </div>
  );
};
