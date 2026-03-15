import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import { MoviePage } from "./pages/MoviePage";
import { GenrePage } from "./pages/GenrePage";
import { AuthPage } from "./pages/AuthPage";
import { LoginPage } from "./pages/LoginPage";
import { FavoritesPage } from "./pages/FavoritesPage";

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
        { path: "auth", element: <AuthPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "favorites", element: <FavoritesPage /> },
        { path: "*", element: <h1>404 Not Found</h1> },
      ],
    },
  ],
  {
    basename: "/movie-to-watch",
  },
);
