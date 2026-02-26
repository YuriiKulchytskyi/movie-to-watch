import "./GanreList.scss";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesByGanre } from "../../redux/movies/moviesOperations";
import { Link } from "react-router-dom";

export const GenreList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const genreList = useSelector((state: RootState) => state.movies.genres);

  useEffect((): void => {
    dispatch(fetchMoviesByGanre());
  }, [dispatch]);

  return (
    <>
      <ul className="list">
        {genreList.map((genre) => (
          <li key={genre.id}>
            <Link to={`/genres/${genre.id}`}>{genre.name}</Link>
          </li>
        ))}
      </ul>

    </>
  );
};
