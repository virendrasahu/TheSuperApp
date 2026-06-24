import { useEffect, useState } from "react";

export default function MovieCard({ movie, onSelect }) {
  const [posterSrc, setPosterSrc] = useState(movie.Poster || movie.fallbackPoster);

  useEffect(() => {
    setPosterSrc(movie.Poster || movie.fallbackPoster);
  }, [movie.Poster, movie.fallbackPoster]);

  function handleImageError() {
    if (movie.fallbackPoster && posterSrc !== movie.fallbackPoster) {
      setPosterSrc(movie.fallbackPoster);
    }
  }

  return (
    <button type="button" className="movie-card" onClick={onSelect}>
      <img src={posterSrc} alt={movie.Title} onError={handleImageError} />
      <span>{movie.Title}</span>
    </button>
  );
}
