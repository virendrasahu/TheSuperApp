export default function MovieCard({ movie, onSelect }) {
  return (
    <button type="button" className="movie-card" onClick={onSelect}>
      <img src={movie.Poster} alt={movie.Title} />
      <span>{movie.Title}</span>
    </button>
  );
}
