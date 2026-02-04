import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import type { AppDispatch, RootState } from "./redux/store";
import { useEffect, useState } from "react";
import { fetchMoviesByQuery } from "./redux/movies/moviesOperations";
import { Link } from "react-router";

function App() {
  const [moviesList, setMoviesList] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

   const { movies, loading, error } = useSelector(
  (state: RootState) => state.movies,
);
  const handleSearch = (): void => {
    dispatch(fetchMoviesByQuery({ query: moviesList }));
  };

  return (
    <>
      <input
        type="text"
        value={moviesList}
        onChange={(e) => setMoviesList(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title} <small>{movie.release_date}</small></li>
        )) }
      </ul>
    </>
  );
}

export default App;
