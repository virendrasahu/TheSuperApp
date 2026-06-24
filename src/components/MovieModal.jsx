import { useEffect, useState } from "react";

export default function MovieModal({ movie, onClose }) {
  const [posterSrc, setPosterSrc] = useState(movie?.Poster || movie?.fallbackPoster);

  useEffect(() => {
    setPosterSrc(movie?.Poster || movie?.fallbackPoster);
  }, [movie]);

  if (!movie) {
    return null;
  }

  function handleImageError() {
    if (movie.fallbackPoster && posterSrc !== movie.fallbackPoster) {
      setPosterSrc(movie.fallbackPoster);
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <section className="movie-modal" onClick={(event) => event.stopPropagation()}>
        <button className="movie-modal__close" type="button" onClick={onClose} aria-label="Close movie details">
          ×
        </button>
        <img src={posterSrc} alt={movie.Title} onError={handleImageError} />
        <div>
          <p>{movie.Year}</p>
          <h2>{movie.Title}</h2>
          <div className="movie-modal__meta">
            <span>{movie.Rated || "PG"}</span>
            <span>{movie.Runtime || "120 min"}</span>
            <span>{movie.imdbRating || "7.8"} IMDb</span>
          </div>
          <p className="movie-modal__genre">{movie.Genre}</p>
          <p>{movie.Plot}</p>
          <p><strong>Cast:</strong> {movie.Actors || "Featured cast"}</p>
        </div>
      </section>
    </div>
  );
}
