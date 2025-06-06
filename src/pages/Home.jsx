import React, { useState } from "react";
import Header from "../components/Header";
import MovieList from "../components/MovieList";
import SearchForm from "../components/SearchForm";

const Home = ({ addFavorite, favorites }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm) return;
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=57c18d7d&s=${searchTerm}`);
      const data = await res.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <SearchForm
        searchTerm={searchTerm}
        onChange={setSearchTerm}
        onSubmit={handleSearch}
      />
      <MovieList movies={movies} addFavorite={addFavorite} favorites={favorites} />
    </div>
  );
};

export default Home;
