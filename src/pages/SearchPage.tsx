import { useSelector } from "react-redux";
import { MovieList } from "../components/MovieList/MovieList";
import type { RootState } from "../redux/store";



export const SearchPage = () => {
    const searchedList = useSelector((state: RootState) => state.movies.movies)
  return <MovieList movies={searchedList} />
};
