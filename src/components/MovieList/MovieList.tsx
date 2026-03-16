import "./MovieList.scss";
import { MovieItem } from "../MovieItem/MovieItem";
import type { Movie } from "../../types/movie";

type Props = {
  movies: Movie[];
  onLoadMore?: () => void;
  canLoadMore?: boolean;
};

export const MovieList = ({ movies, onLoadMore, canLoadMore }: Props) => {
  if (!movies.length) return <p>Loading movies...</p>;

  return (
    <div className="list-container">
      <ul className="movieList">
        {movies.map((movie) => (
          <MovieItem key={movie.id} item={movie} />
        ))}
      </ul>

      {onLoadMore && canLoadMore && (
        <button className="load-more" onClick={onLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};
