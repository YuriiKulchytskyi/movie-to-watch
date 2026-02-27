import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Genre, Movie, MoviesResponse } from "../../types/movie";

const API_URL = import.meta.env.VITE_TMDB_API_URL;
const BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

axios.defaults.baseURL = API_URL;


type FetchMovieError = {
  error: string;
};

type FetchMovieIdArg = {
  id: number;
};

type FetchMoviesArg = {
  query: string;
};
export const fetchMoviesByQuery = createAsyncThunk<
  MoviesResponse,
  FetchMoviesArg,
  { rejectValue: FetchMovieError }
>("movies/fetchMoviesByQuery", async ({ query }, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/search/movie`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
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
    const response = await axios.get(`${API_URL}/genre/movie/list`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
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
    const response = await axios.get(`${API_URL}/discover/movie`, {
      params: {
        with_genres: genreId,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
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

export const fetchMovieById = createAsyncThunk<
  Movie,
  FetchMovieIdArg,
  { rejectValue: FetchMovieError }
>("movies/fetchMovieById", async ({ id }, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/movie/${id}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    // console.log('Fetched Movie', id);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue({
        error: `Failed with error: ${error.message}`,
      });
    }
    return thunkAPI.rejectWithValue({ error: "Unknown error" });
  }
});

export const fetchPopularMovies = createAsyncThunk<
  Movie[],
  void,
  { rejectValue: FetchMovieError }
>("movies/fetchPopularMovies", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/movie/popular`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    return response.data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue({
        error: `Feiled with error: ${error.message}`,
      });
    }
    return thunkAPI.rejectWithValue({ error: "Unknown error" });
  }
});

export const fetchSimilarMovies = createAsyncThunk<
  Movie[],
  FetchMovieIdArg,
  { rejectValue: FetchMovieError }
>("movies/fetchSimilarMovies", async ({ id }, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/movie/${id}/similar`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    return response.data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue({
        error: `Failed with error: ${error.message}`,
      });
    }
    return thunkAPI.rejectWithValue({ error: "Unknown error" });
  }
});
