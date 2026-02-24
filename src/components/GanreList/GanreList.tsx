import "./GanreList.scss";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMoviesByGanre,
  fetchSelectedGenre,
} from "../../redux/movies/moviesOperations";
import { Link, Outlet } from "react-router-dom";

export const GenreList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const genreList = useSelector((state: RootState) => state.movies.genres);

  useEffect((): void => {
    dispatch(fetchMoviesByGanre());
  }, [dispatch]);

  const handleClick = (genreId: number): void => {

    dispatch(fetchSelectedGenre(genreId));
  };

  return (
    <>
      <ul className="list">
        {genreList.map((genre) => (
          <li key={genre.id} onClick={() => handleClick(genre.id)}>
            <Link to={`/genres/${genre.id}`}>{genre.name}</Link>
          </li>
        ))}
      </ul>

      <div>
        <Outlet />
      </div>
    </>
  );
};
