import React, { useState, useEffect } from 'react';
import './App.css'; // Anda bisa menambahkan styling di file ini

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = "57c18d7d"; // Ganti dengan API Key Anda jika perlu

  const fetchMovies = async (searchTitle) => {
    if (!searchTitle) {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError(null);
    setMovies([]); // Kosongkan hasil sebelumnya

    try {
      const response = await fetch(`http://www.omdbapi.com/?s=${searchTitle}&apikey=${apiKey}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error);
        setMovies([]); // Pastikan movies kosong jika ada error
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mengambil data.");
      setMovies([]); // Pastikan movies kosong jika ada error koneksi
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchMovies(searchTerm);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pencarian Film</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Masukkan judul film..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Mencari...' : 'Cari'}
          </button>
        </form>
      </header>

      <main className="App-main">
        {loading && <p>Memuat data film...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        
        {!loading && !error && movies.length === 0 && searchTerm && (
          <p>Film tidak ditemukan. Coba kata kunci lain.</p>
        )}

        <div className="movies-container">
          {movies.length > 0 && movies.map(movie => (
            <div key={movie.imdbID} className="movie-card">
              {movie.Poster !== "N/A" ? (
                <img src={movie.Poster} alt={movie.Title} />
              ) : (
                <div className="no-poster">Poster Tidak Tersedia</div>
              )}
              <h2>{movie.Title}</h2>
              <p>{movie.Year}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;