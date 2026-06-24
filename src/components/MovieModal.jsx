export default function MovieModal({ movie, onClose }) {
  if (!movie) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <section className="movie-modal" onClick={(event) => event.stopPropagation()}>
        <button className="movie-modal__close" type="button" onClick={onClose} aria-label="Close movie details">
          ×
        </button>
        <img src={movie.Poster} alt={movie.Title} />
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
