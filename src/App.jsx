import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState({});

  const OMDB_API_KEY = '57c18d7d';

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    setErrorMessage('');
    setMovies([]);
    setSelectedMovie(null);
  };

  const fetchMovieDetails = async (imdbID) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  };

  const searchMovies = async () => {
    if (searchTerm.trim() === '') {
      setErrorMessage('Silakan masukkan judul film.');
      setMovies([]);
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setMovies([]);
    setSelectedMovie(null);

    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${OMDB_API_KEY}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);

        const detailsPromises = data.Search.map(movie => fetchMovieDetails(movie.imdbID));
        const detailsResults = await Promise.all(detailsPromises);

        const detailsMap = {};
        detailsResults.forEach(detail => {
          if (detail) {
            const runtime = detail.Runtime ? detail.Runtime.replace(/(\d+)min/, '$1 min') : '';
            const imdbRating = detail.imdbRating ? detail.imdbRating.replace(',', ',') : 'N/A';
            const genre = detail.Genre || '';

            detailsMap[detail.imdbID] = {
              plot: detail.Plot,
              imdbRating,
              runtime,
              genre
            };
          }
        });

        setMovieDetails(detailsMap);
      } else {
        setErrorMessage(data.Error || 'Film tidak ditemukan. Coba kata kunci lain.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Terjadi kesalahan saat mencari film. Coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pencarian Film</h1>
        <form onSubmit={(e) => { e.preventDefault(); searchMovies(); }}>
          <input
            type="text"
            placeholder="Ketik judul film..."
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <button type="submit">Cari</button>
        </form>
      </header>

      <main className="App-main">
        {loading && <p>Mencari film...</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="movies-container">
          {movies.length > 0 && movies.map(movie => (
            <div
              className={`movie-card ${selectedMovie === movie.imdbID ? 'selected' : ''}`}
              key={movie.imdbID}
              onClick={() =>
                setSelectedMovie(selectedMovie === movie.imdbID ? null : movie.imdbID)
              }
            >
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Poster'}
                alt={movie.Title}
              />
              <h2>{movie.Title}</h2>
              <p>{movie.Year}</p>

              {selectedMovie === movie.imdbID && movieDetails[movie.imdbID] && (
  <div className="movie-details">
    <p className="plot">
      {movieDetails[movie.imdbID].plot || 'Deskripsi tidak tersedia'}
    </p>
    <div className="movie-meta vertical ">
  <p><strong>IMDb:</strong> {movieDetails[movie.imdbID].imdbRating || 'N/A'}</p>
  <p><strong>Runtime:</strong> {movieDetails[movie.imdbID].runtime || 'N/A'}</p>
  <p><strong>Genre:</strong> {movieDetails[movie.imdbID].genre || 'N/A'}</p>
</div>

  </div>
)}

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
