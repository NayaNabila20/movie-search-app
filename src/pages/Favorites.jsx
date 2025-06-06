import React, { useState } from 'react';

const Favorites = ({ favorites, updateStatus, updateNotes, deleteFavorite }) => {
  const [editId, setEditId] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const startEdit = (movie) => {
    setEditId(movie.id);
    setEditStatus(movie.status || '');
    setEditNotes(movie.notes || '');
  };

  const saveEdit = (id) => {
    updateStatus(id, editStatus);
    updateNotes(id, editNotes);
    setEditId(null);
  };

  const cancelEdit = () => {
    setEditId(null);
  };

  if (favorites.length === 0) return <p>Belum ada film favorit.</p>;

  return (
    <div>
      <h2>Favorite Movies / Watchlist</h2>
      <div
        className="favorites-list"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}
      >
        {favorites.map((movie) => (
          <div key={movie.id} className="favorite-item">
            <img
              src={movie.poster}
              alt={movie.title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <h3>{movie.title} ({movie.year})</h3>

            {editId === movie.id ? (
              <>
                <label>Status:</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  style={{ width: '100%', marginBottom: '8px' }}
                >
                  <option value="">Pilih status</option>
                  {['ingin ditonton', 'sedang ditonton', 'sudah ditonton', 'ditinggalkan'].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <label>Catatan:</label>
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  rows={3}
                  style={{ width: '100%', marginBottom: '8px', resize: 'vertical' }}
                  placeholder="Tulis catatan..."
                />

                <button onClick={() => saveEdit(movie.id)} style={{ marginRight: '8px' }}>
                  Simpan
                </button>
                <button onClick={cancelEdit}>Batal</button>
              </>
            ) : (
              <>
                <p>Status: {movie.status || '-'}</p>
                <p>Catatan: {movie.notes || '-'}</p>
                <button onClick={() => startEdit(movie)} style={{ marginRight: '8px' }}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => deleteFavorite(movie.id)}>
                  Hapus
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
