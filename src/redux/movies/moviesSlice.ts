import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMoviesByQuery,
  fetchMoviesByGanre,
  fetchSelectedGenre,
  fetchMovieById,
  fetchPopularMovies,
  fetchSimilarMovies,
} from "./moviesOperations";
import type { Genre, Movie } from "../../types/movie";

interface MovieState {
  movie: Movie | null;
  movies: Movie[];
  genres: Genre[];
  loading: boolean;
  error: string | null;
  selectedGenreMovies: Movie[];
  popular: Movie[];
  similar: Movie[];
  totalPages: number;
  currentPage: number;
  lastQuery: string;
}

const initialState: MovieState = {
  movie: null,
  movies: [],
  genres: [],
  loading: false,
  error: null,
  selectedGenreMovies: [],
  popular: [],
  similar: [],
  totalPages: 0,
  currentPage: 1,
  lastQuery: "",
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearMovies(state) {
      state.movies = [];
      state.loading = false;
      state.error = null;
    },
    clearSelectedMovie(state) {
      state.movie = null;
      state.similar = [];
    },
    clearSelectedGenreMovies(state) {
      state.selectedGenreMovies = [];
      state.currentPage = 1;
      state.totalPages = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesByQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = [...state.movies, ...action.payload.results];
        state.error = null;
        state.totalPages = action.payload.total_pages;
        state.currentPage += 1;
        state.lastQuery = action.meta.arg.query;
      })
      .addCase(fetchMoviesByQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : "Unknown error";
      })
      .addCase(fetchMoviesByGanre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByGanre.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.genres = action.payload;
      })
      .addCase(fetchMoviesByGanre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : "Unknown error";
      })
      .addCase(fetchSelectedGenre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSelectedGenre.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const newMovies = action.payload.results.filter(
          (m) => !state.selectedGenreMovies.some((old) => old.id === m.id),
        );

        state.selectedGenreMovies = [
          ...state.selectedGenreMovies,
          ...newMovies,
        ];

        state.currentPage += 1;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchSelectedGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : "Unknown error";
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.movie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : "Unknown error";
        state.movie = null;
      })
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const newMovies = action.payload.results.filter(
          (m) => !state.popular.some((old) => old.id === m.id),
        );

        state.popular = [...state.popular, ...newMovies];
        state.totalPages = action.payload.total_pages;
        state.currentPage += 1;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : "Unknown error";
        state.popular = [];
      })
      .addCase(fetchSimilarMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : "Unknown error";
      })
      .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.similar = action.payload.slice(0, 6);
      });
  },
});

export const { clearMovies, clearSelectedMovie, clearSelectedGenreMovies } = movieSlice.actions;
export const movieReducer = movieSlice.reducer;
