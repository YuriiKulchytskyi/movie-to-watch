import { useState } from "react";
import type { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { fetchMoviesByQuery } from "../redux/movies/moviesOperations";

export const Layout = () => {
  const [query, setQuery] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = (): void => {
    if (query.trim()) {
      dispatch(fetchMoviesByQuery({ query }));
    }
  };
  return <></>;
};
