/**
 * Client-safe API proxy for TMDB data.
 * All requests route through Next.js server-side route handlers to keep credentials private.
 */

const ENDPOINT_MAP: Record<string, string> = {
  "/trending/movie/week": "/api/movies/trending",
  "/movie/popular": "/api/movies/popular",
  "/movie/top_rated": "/api/movies/top-rated",
};

export async function fetchFromTMDB(endpoint: string, params: Record<string, string> = {}) {
  const targetRoute = ENDPOINT_MAP[endpoint];

  let url: string;
  if (targetRoute) {
    url = targetRoute;
  } else if (endpoint.startsWith("/movie/")) {
    const id = endpoint.replace("/movie/", "").split("?")[0];
    url = `/api/movies/${encodeURIComponent(id)}`;
  } else if (endpoint.startsWith("/search/movie")) {
    const query = params.query || "";
    url = `/api/movies/search?query=${encodeURIComponent(query)}`;
  } else {
    throw new Error(`Unsupported API endpoint: ${endpoint}`);
  }

  const response = await fetch(url);
  if (!response.ok) {
    let errorMsg = `API request failed with status: ${response.status}`;
    try {
      const errorJson = await response.json();
      if (errorJson.error) {
        errorMsg = errorJson.error;
      }
    } catch {
      // Use fallback error message
    }
    throw new Error(errorMsg);
  }

  return response.json();
}
