import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router";
import { fetchMoviesByQuery } from "../../redux/movies/moviesOperations";

export const Filter = () => {
  const [query, setQuery] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleSearch = (): void => {
    if (query.trim()) {
      navigate("/search");
      dispatch(fetchMoviesByQuery({ query }));
      setQuery("");
    }
  };

  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
      />
      <button onClick={handleSearch}>Search</button>
    </>
  );
};
