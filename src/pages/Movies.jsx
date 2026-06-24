import { useEffect, useState } from "react";
import Brand from "../components/Brand.jsx";
import MovieCard from "../components/MovieCard.jsx";
import MovieModal from "../components/MovieModal.jsx";
import { heroAssets } from "../data/assets.js";
import { fetchMovieDetails, fetchMoviesByCategory } from "../services/movieApi.js";
import { useSuperStore } from "../store/useSuperStore.js";

export default function Movies() {
  const selectedCategories = useSuperStore((state) => state.categories);
  const [movieGroups, setMovieGroups] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeMovie, setActiveMovie] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadMovies() {
      setLoading(true);
      const entries = await Promise.all(
        selectedCategories.map(async (category) => [
          category,
          await fetchMoviesByCategory(category),
        ])
      );

      if (active) {
        setMovieGroups(Object.fromEntries(entries));
        setLoading(false);
      }
    }

    loadMovies();

    return () => {
      active = false;
    };
  }, [selectedCategories]);

  async function openDetails(movie, category) {
    setActiveMovie({ ...movie, loading: true });
    const details = await fetchMovieDetails(movie, category);
    setActiveMovie(details);
  }

  return (
    <main className="movies-page">
      <header className="movies-page__header">
        <Brand />
        <img src={heroAssets.profileAvatar} alt="" />
      </header>
      <h1>Entertainment according to your choice</h1>
      {loading && <p className="muted">Loading recommendations...</p>}
      {!loading &&
        selectedCategories.map((category) => (
          <section key={category} className="movie-section">
            <h2>{category}</h2>
            <div className="movie-row">
              {(movieGroups[category] || []).map((movie) => (
                <MovieCard
                  key={`${category}-${movie.imdbID}`}
                  movie={movie}
                  onSelect={() => openDetails(movie, category)}
                />
              ))}
            </div>
          </section>
        ))}
      <MovieModal movie={activeMovie} onClose={() => setActiveMovie(null)} />
    </main>
  );
}
