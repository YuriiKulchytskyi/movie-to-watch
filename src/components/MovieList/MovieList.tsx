import "./MovieList.scss";
import { MovieItem } from "./MovieItem";
import type { Movie } from "../../types/movie";

export const MovieList = ({ movies }: { movies: Movie[] }) => {


  if (!movies.length) return <p>Loading movies...</p>;

  return (
    <ul className="movieList">
      {movies.map((movie) => (
        <MovieItem key={movie.id} item={movie} />
      ))}
    </ul>
  );
};
