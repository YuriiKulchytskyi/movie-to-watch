import { useState } from "react";
import type { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { fetchMoviesByQuery } from "../redux/movies/moviesOperations";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const [query, setQuery] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = (): void => {
    if (query.trim()) {
      dispatch(fetchMoviesByQuery({ query }));
      setQuery("");
    }
  };
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
      />
      <button onClick={handleSearch}>Search</button>

      <main>
        <Outlet />
      </main>
    </div>
  );
};
