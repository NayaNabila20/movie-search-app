import React from "react";

function SearchForm({ searchTerm, onChange, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari judul film..."
      />
      <button type="submit">Cari</button>
    </form>
  );
}

export default SearchForm;
