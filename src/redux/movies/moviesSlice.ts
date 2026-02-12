import { createSlice} from "@reduxjs/toolkit";
import { fetchMoviesByQuery, fetchMoviesByGanre } from "./moviesOperations";
import type { Genre, Movie } from "../../types/movie";


interface MovieState {
  movies: Movie[];
  genres: Genre[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  genres: [],
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
        (state, action) => {
          state.loading = false;
          state.movies = action.payload.results;
          state.error = null;
          console.log(state.movies);
          
        },
      )
      .addCase(fetchMoviesByQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : "Unknown error";
      }).addCase(fetchMoviesByGanre.pending, (state) => {
        state.loading = true;
        state.error = null
      }).addCase(fetchMoviesByGanre.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.genres = action.payload;
        // console.log(action.payload);
        
      })
      .addCase(fetchMoviesByGanre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : "Unknown error"
      })
  },
});


export const { clearMovies } = movieSlice.actions;
export const movieReducer = movieSlice.reducer