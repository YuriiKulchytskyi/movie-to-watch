import "./App.css";
// import { GenreList } from "./components/GanreList/GanreList";
import { Layout } from "./pages/Layout";
import { Route, Routes } from "react-router-dom";
import { MoviePage } from "./pages/MoviePage";
import { GenrePage } from "./pages/GenrePage";
import { SearchPage } from "./pages/SearchPage";
import { HomePage } from "./pages/HomePage";

function App() {


  return (
    <></>
    // <Routes>
    //   <Route path="/" element={<Layout />}>
    //     <Route index element={<HomePage/>}/>
    //     <Route path="search" element={<SearchPage />} />
    //     <Route path="genres/:genreId" element={<GenrePage />} />
    //     <Route path="movie/:movieId" element={<MoviePage />} />
    //   </Route>
    // </Routes>
  );
}

export default App;
