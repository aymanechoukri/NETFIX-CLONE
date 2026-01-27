// Shared Movie type for the Netflix Clone project
// Using TMDB API response types as reference

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview?: string;
  backdrop_path?: string;
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  adult?: boolean;
  original_language?: string;
  original_title?: string;
  genre_ids?: number[];
  video?: boolean;
  media_type?: 'movie' | 'tv' | 'person' | 'collection';
}

// Movie list response from TMDB API
export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Movie details response from TMDB API
export interface MovieDetails extends Movie {
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  imdb_id: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
}

// Search result movie (same as Movie)
export type SearchMovie = Movie;

