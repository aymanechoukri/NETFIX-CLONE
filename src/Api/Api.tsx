
const API_KEY = 'f40206658ac121dd79e97b3c93b4e475';
const BASURL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

// Validate that API key is available
if (!API_KEY) {
  console.warn('⚠️ TMDB API key is not set. Please add NEXT_PUBLIC_TMDB_API_KEY to your .env.local file');
}

// Helper function to fetch data with better error handling
export async function fetchFromTMDB(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${BASURL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY || '');
  
  // Add additional params
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  try {
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your TMDB API key in .env.local');
      } else if (response.status === 404) {
        throw new Error('API endpoint not found');
      } else {
        throw new Error(`API request failed with status: ${response.status}`);
      }
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from TMDB (${endpoint}):`, error);
    throw error;
  }
}

export { API_KEY, BASURL };

