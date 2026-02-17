export interface Movie {
  id: number;
  title?: string;
  release_date?: string;
  // description?: string;
  original_title?: string;
  adult?: boolean;
  original_language?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export interface Genre {
  id: number;
  name: string;
}


export interface MoviesResponse {
    results: Movie[]
}