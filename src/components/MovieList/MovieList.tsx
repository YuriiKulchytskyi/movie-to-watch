import type { Movie } from "../../types/movie";
import "./MovieList.scss";

export const MovieList = ({ movies }: { movies: Movie[] }) => {
  const formatedDate = (dateString: string | undefined): string => {
    if (!dateString) return "Unknown release date";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <ul className="movieList">
      {movies.map((movie) => (
        <li key={movie.id}>
          <h3>{movie.title}</h3>
          <div>
            {/* <div>{movie.original_title}</div> */}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title} loading="lazy"
            />
            <div>
              <p className="overview">{movie.overview}</p>
              <p>{formatedDate(movie.release_date)}</p>

              <div>
                <p>{movie.vote_avarage}</p>
                <p>{movie.vote_count}</p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
