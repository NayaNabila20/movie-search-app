import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import "./styles/App.css";

const App = () => {
  // State favorit global, disimpan di localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Tambah film ke favorit
  const addFavorite = (movie) => {
    if (!favorites.find((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, { ...movie, status: "", notes: "" }]);
    }
  };

  // Update status film favorit
  const updateStatus = (id, status) => {
    setFavorites(favs =>
      favs.map(fav => (fav.id === id ? { ...fav, status } : fav))
    );
  };

  // Update catatan film favorit
  const updateNotes = (id, notes) => {
    setFavorites(favs =>
      favs.map(fav => (fav.id === id ? { ...fav, notes } : fav))
    );
  };

  // Hapus film dari favorit
  const deleteFavorite = (id) => {
    setFavorites(favs => favs.filter(fav => fav.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <nav style={{ marginBottom: 20 }}>
          <Link to="/" style={{ marginRight: 10, color: "#61dafb" }}>Home</Link>
          <Link to="/favorites" style={{ color: "#61dafb" }}>Favorites</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={<Home addFavorite={addFavorite} favorites={favorites} />}
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                updateStatus={updateStatus}
                updateNotes={updateNotes}
                deleteFavorite={deleteFavorite}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
