import { localMoviePool } from "../data/assets.js";

const apiKey = import.meta.env.VITE_OMDB_KEY || "thewdb";

const queryByCategory = {
  Action: "action",
  Drama: "drama",
  Romance: "romance",
  Thriller: "thriller",
  Western: "western",
  Horror: "horror",
  Fantasy: "fantasy",
  Music: "music",
  Fiction: "sci-fi",
};

export async function fetchMoviesByCategory(category) {
  try {
    const params = new URLSearchParams({
      apikey: apiKey,
      s: queryByCategory[category] || category,
      type: "movie",
      page: "1",
    });
    const response = await fetch(`https://www.omdbapi.com/?${params}`);
    const data = await response.json();

    if (data.Response !== "True") {
      throw new Error(data.Error || "No movies found.");
    }

    return data.Search.slice(0, 4).map((movie, index) => ({
      ...movie,
      Poster:
        movie.Poster && movie.Poster !== "N/A"
          ? movie.Poster
          : localMoviePool[category]?.[index]?.Poster,
    }));
  } catch {
    return localMoviePool[category] || [];
  }
}

export async function fetchMovieDetails(movie, category) {
  try {
    const params = new URLSearchParams({
      apikey: apiKey,
      i: movie.imdbID,
      plot: "full",
    });
    const response = await fetch(`https://www.omdbapi.com/?${params}`);
    const data = await response.json();

    if (data.Response !== "True") {
      throw new Error(data.Error || "No movie details.");
    }

    return {
      ...data,
      Poster: data.Poster && data.Poster !== "N/A" ? data.Poster : movie.Poster,
    };
  } catch {
    const fallback = localMoviePool[category]?.find(
      (item) => item.imdbID === movie.imdbID
    );
    return fallback || movie;
  }
}
