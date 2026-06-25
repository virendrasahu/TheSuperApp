import { localMoviePool } from "../data/assets.js";

const apiKey = import.meta.env.VITE_OMDB_KEY || "thewdb";

const queryByCategory = {
  Action: "action",
  Comedy: "comedy",
  Drama: "drama",
  Music: "music",
  Sports: "sports",
  Thriller: "thriller",
  Fantasy: "fantasy",
  Romance: "romance",
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

    return data.Search.slice(0, 4).map((movie, index) => {
      const fallbackPoster = localMoviePool[category]?.[index]?.Poster;
      const hasPoster = movie.Poster && movie.Poster !== "N/A";

      return {
        ...movie,
        Poster: hasPoster ? movie.Poster : fallbackPoster,
        fallbackPoster,
      };
    });
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

    const fallbackPoster = movie.fallbackPoster || movie.Poster;

    return {
      ...data,
      Poster: data.Poster && data.Poster !== "N/A" ? data.Poster : fallbackPoster,
      fallbackPoster,
    };
  } catch {
    const fallback = localMoviePool[category]?.find(
      (item) => item.imdbID === movie.imdbID
    );
    return fallback || movie;
  }
}
