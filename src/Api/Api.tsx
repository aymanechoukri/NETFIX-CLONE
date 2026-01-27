// API Configuration for TMDB
// API key should be stored in .env.local as NEXT_PUBLIC_TMDB_API_KEY

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASURL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

// Validate that API key is available
if (!API_KEY) {
  console.warn('⚠️ TMDB API key is not set. Please add NEXT_PUBLIC_TMDB_API_KEY to your .env.local file');
}

export { API_KEY, BASURL };

