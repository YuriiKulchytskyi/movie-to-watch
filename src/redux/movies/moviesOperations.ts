import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

type FetchMoviesArg = {
  query: string;
};

type FetchMovieError = {
  error: string;
};

export const fetchMoviesByQuery = createAsyncThunk<
  any,
  FetchMoviesArg,
  { rejectValue: FetchMovieError }
>("movies/fetchMoviesByQuery", async ({ query }, thunkAPI) => {
  try {
    const response = await axios.get("/search/movie", {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmQ5ODc5ZjRmZGVjZDMwZGRkZDZhNWIzNDVjODE4OCIsIm5iZiI6MTcwMTAwMjc4NC4wNDksInN1YiI6IjY1NjMzZTIwMjQ0MTgyMDEyZGFjMDY0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0Nh70y02dN9yvJ578_1C027Z2zZPUX-dN0Z8a6EEsC0",
      },
      params: {
        query,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue({
        error: `Failed to fetch movies by query: ${error.message}`,
      });
    }
    return thunkAPI.rejectWithValue({ error: "Unknown error" });
  }
});
