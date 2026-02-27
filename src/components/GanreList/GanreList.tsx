import "./GanreList.scss";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesByGanre } from "../../redux/movies/moviesOperations";
import { useNavigate } from "react-router-dom";

export const GenreList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const genreList = useSelector((state: RootState) => state.movies.genres);

  useEffect((): void => {
    dispatch(fetchMoviesByGanre());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (id) {
      navigate(`/genres/${id}`);
    }
  };

  return (
    <select className="list" onChange={handleChange} defaultValue="">
      <option value="" disabled>
        Select genre
      </option>

      {genreList.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
};