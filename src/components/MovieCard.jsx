import React from "react";

const MovieCard = ({ movie, addFavorite, isFavorite }) => (
  <div className="movie-card">
    <img src={movie.poster} alt={movie.title} />
    <h2>{movie.title}</h2>
    <p>{movie.year}</p>
    <button
      className="add-btn"
      onClick={() => addFavorite(movie)}
      disabled={isFavorite}
      style={{ opacity: isFavorite ? 0.6 : 1, cursor: isFavorite ? "not-allowed" : "pointer" }}
    >
      {isFavorite ? "Sudah Favorit" : "Tambah ke Favorit"}
    </button>
  </div>
);

export default MovieCard;
