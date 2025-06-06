import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, addFavorite, favorites }) => (
  <div className="movies-container">
    {movies.map((movie) => (
      <MovieCard
        key={movie.imdbID}
        movie={{
          id: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image",
        }}
        addFavorite={addFavorite}
        isFavorite={favorites.some((fav) => fav.id === movie.imdbID)}
      />
    ))}
  </div>
);

export default MovieList;
