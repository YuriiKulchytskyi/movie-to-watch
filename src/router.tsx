import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import { MoviePage } from "./pages/MoviePage";
import { GenrePage } from "./pages/GenrePage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "search", element: <SearchPage /> },
        { path: "movie/:id", element: <MoviePage /> },
        { path: "genres/:id", element: <GenrePage /> },
      ],
    },
  ],
  {
    basename: "/movie-to-watch", // <- basename задаємо тут
  },
);
