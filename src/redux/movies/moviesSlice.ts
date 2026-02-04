import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchMoviesByQuery } from "./moviesOperations";

export type Movie = {
  id: number;
  title: string;
  release_date: string
};

interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesByQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMoviesByQuery.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.movies = action.payload.results;
          state.error = null;
          console.log(state.movies);
          
        },
      )
      .addCase(fetchMoviesByQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : "Unknown error";
      });
  },
});


export const { clearMovies } = movieSlice.actions;
export const movieReducer = movieSlice.reducer