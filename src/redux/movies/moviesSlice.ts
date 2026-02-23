import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMoviesByQuery,
  fetchMoviesByGanre,
  fetchSelectedGenre,
  fetchMovieById,
} from "./moviesOperations";
import type { Genre, Movie } from "../../types/movie";

interface MovieState {
  movie: Movie | null;
  movies: Movie[];
  genres: Genre[];
  loading: boolean;
  error: string | null;
  selectedGenreMovies: Movie[];
}

const initialState: MovieState = {
  movie: null,
  movies: [],
  genres: [],
  loading: false,
  error: null,
  selectedGenreMovies: [],
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesByQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.error = null;
        console.log(state.movies);
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
        state.selectedGenreMovies = action.payload.results;
        console.log(state.selectedGenreMovies);
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
        console.log(state.movie);
        
      }).addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error: "Unknown error";
        state.movie = null;
      })
  },
});

export const { clearMovies, clearSelectedMovie } = movieSlice.actions;
export const movieReducer = movieSlice.reducer;
