import "server-only";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";

function getApiKey(): string {
  const key = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
  if (!key) {
    throw new Error("TMDB_API_KEY environment variable is not configured.");
  }
  return key;
}

/**
 * Server-only helper to fetch data securely from TMDB API without exposing credentials.
 */
export async function fetchTMDBServer(
  endpoint: string,
  params: Record<string, string> = {}
) {
  const apiKey = getApiKey();
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", apiKey);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, value);
  }

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 }, // Cache on server for 1 hour
    signal: AbortSignal.timeout(10000), // 10s timeout to prevent hanging connections
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("TMDB authentication failed. Please check your TMDB_API_KEY.");
    }
    if (response.status === 404) {
      throw new Error("Resource not found on TMDB.");
    }
    throw new Error(`TMDB responded with HTTP ${response.status}`);
  }

  return response.json();
}

export async function getTrendingMovies() {
  return fetchTMDBServer("/trending/movie/week");
}

export async function getPopularMovies() {
  return fetchTMDBServer("/movie/popular");
}

export async function getTopRatedMovies() {
  return fetchTMDBServer("/movie/top_rated", { language: "en-US", page: "1" });
}

export async function searchMovies(query: string) {
  const sanitizedQuery = query.trim().slice(0, 100);
  if (!sanitizedQuery) {
    return { results: [] };
  }
  return fetchTMDBServer("/search/movie", { query: sanitizedQuery });
}

export async function getMovieDetails(id: string) {
  // Validate id is numeric to prevent path traversal or SSRF
  if (!/^\d+$/.test(id)) {
    throw new Error("Invalid movie ID format.");
  }
  return fetchTMDBServer(`/movie/${id}`, { language: "en-US" });
}
