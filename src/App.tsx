import "./App.css";
import { GenreList } from "./components/GanreList/GanreList";
import { MovieList } from "./components/MovieList/MovieList";
import { Layout } from "./pages/Layout";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<GenreList />} />
        <Route path="genres/:genreId" element={<MovieList />} />
      </Route>
    </Routes>
  );
}

export default App;
