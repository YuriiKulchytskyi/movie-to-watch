import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Genre, MoviesResponse } from "../../types/movie";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

type FetchMoviesArg = {
  query: string;
};

type FetchMovieError = {
  error: string;
};

export const fetchMoviesByQuery = createAsyncThunk<
  MoviesResponse,
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

export const fetchMoviesByGanre = createAsyncThunk<
  Genre[],
  void,
  { rejectValue: FetchMovieError }
>("movies/fetchMoviesByGanre", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/genre/movie/list", {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmQ5ODc5ZjRmZGVjZDMwZGRkZDZhNWIzNDVjODE4OCIsIm5iZiI6MTcwMTAwMjc4NC4wNDksInN1YiI6IjY1NjMzZTIwMjQ0MTgyMDEyZGFjMDY0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0Nh70y02dN9yvJ578_1C027Z2zZPUX-dN0Z8a6EEsC0",
      },
    });
    return response.data.genres;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue({
        error: `Failed with error: ${error.message}`,
      });
    }
    return thunkAPI.rejectWithValue({ error: "Unknown error" });
  }
});

export const fetchSelectedGenre = createAsyncThunk<
  MoviesResponse,
  number,
  { rejectValue: FetchMovieError }
>("movies/fetchSelectedGenre", async (genreId, thunkAPI) => {
  try {
    const response = await axios.get("/discover/movie", {
      params: {
        with_genres: genreId,
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmQ5ODc5ZjRmZGVjZDMwZGRkZDZhNWIzNDVjODE4OCIsIm5iZiI6MTcwMTAwMjc4NC4wNDksInN1YiI6IjY1NjMzZTIwMjQ0MTgyMDEyZGFjMDY0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0Nh70y02dN9yvJ578_1C027Z2zZPUX-dN0Z8a6EEsC0",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue({
        error: `Failer with error: ${error.message}`,
      });
    }
    return thunkAPI.rejectWithValue({ error: "Unknown error" });
  }
});
