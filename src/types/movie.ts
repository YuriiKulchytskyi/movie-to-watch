export interface Movie {
  id: number;
  title?: string;
  release_date?: string;
  original_title?: string;
  adult?: boolean;
  original_language?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  tagline?: string;
  runtime?: number;
  status?: string;
  budget?: number | null | undefined;
  revenue?: number | null | undefined;
  homepage?: string;
  genres: Genre[];
  backdrop_path?: string;
}

export interface Genre {
  id: number;
  name: string;
}


export interface MoviesResponse {
    results: Movie[]
}