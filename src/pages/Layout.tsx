import { useState } from "react";
import type { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { fetchMoviesByQuery } from "../redux/movies/moviesOperations";
import { Outlet, useNavigate } from "react-router-dom";
import { GenreList } from "../components/GanreList/GanreList";

export const Layout = () => {
  const [query, setQuery] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate()

 const handleSearch = (): void => {
  if (query.trim()) {
    navigate("/search");
    dispatch(fetchMoviesByQuery({ query }));
    setQuery("");
  }
};

  return (
    <div>
      <button
        onClick={(): void => {
          navigate("/");
        }}
      >
        Main
      </button>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
      />
      <button onClick={handleSearch}>Search</button>
        <GenreList />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
