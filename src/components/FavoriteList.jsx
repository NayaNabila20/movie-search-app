import React from 'react';
import MovieCard from './MovieCard';

const FavoriteList = ({ favorites, onUpdate, onDelete }) => (
  <div className="favorites-list">
    {favorites.map((movie) => (
      <MovieCard
        key={movie.imdbID}
        movie={movie}
        isFavorite
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    ))}
  </div>
);

export default FavoriteList;
