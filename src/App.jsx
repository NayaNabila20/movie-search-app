import React, { useState, useEffect } from 'react';
import './App.css'; // Pastikan Anda sudah mengatur styling di file ini

function App() {
  const [searchTerm, setSearchTerm] = useState(''); // State untuk nilai input pencarian
  const [movies, setMovies] = useState([]); // State untuk daftar film yang ditemukan
  const [errorMessage, setErrorMessage] = useState(''); // State untuk pesan error/informasi
  const [loading, setLoading] = useState(false); // State untuk status loading

  // **Kunci API OMDb Anda**
  const OMDB_API_KEY = '57c18d7d'; 

  // Fungsi untuk menangani perubahan pada input pencarian
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    // Sembunyikan pesan error/informasi dan kosongkan film saat pengguna mulai mengetik
    setErrorMessage(''); 
    setMovies([]); 
  };

  // Fungsi untuk melakukan pencarian film
  const searchMovies = async () => {
    // Validasi: Jangan lakukan pencarian jika input kosong
    if (searchTerm.trim() === '') {
      setErrorMessage('Silakan masukkan judul film.');
      setMovies([]);
      return;
    }

    setLoading(true); // Tampilkan loading
    setErrorMessage(''); // Pastikan pesan error sebelumnya bersih
    setMovies([]); // Bersihkan hasil sebelumnya

    try {
      // Panggil OMDb API dengan kunci API Anda
      const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${OMDB_API_KEY}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search); // Set daftar film jika ditemukan
        setErrorMessage(''); // Pastikan tidak ada pesan error jika berhasil
      } else {
        setMovies([]); // Pastikan daftar film kosong jika tidak ditemukan
        // **Perbaikan:** Gunakan pesan error dari API jika tersedia, atau pesan default
        setErrorMessage(data.Error || 'Film tidak ditemukan. Coba kata kunci lain.'); 
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Terjadi kesalahan saat mencari film. Coba lagi nanti.');
      setMovies([]);
    } finally {
      setLoading(false); // Sembunyikan loading setelah selesai (baik sukses atau error)
    }
  };

  // Bagian Render Komponen
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pencarian Film</h1>
        <form onSubmit={(e) => { e.preventDefault(); searchMovies(); }}> {/* Mencegah reload halaman */}
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
        {/* Tampilkan pesan loading jika sedang mencari */}
        {loading && <p>Mencari film...</p>} 

        {/* Tampilkan pesan error/informasi jika ada */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="movies-container">
          {movies.length > 0 && movies.map(movie => (
            <div className="movie-card" key={movie.imdbID}>
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Poster'}
                alt={movie.Title}
              />
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