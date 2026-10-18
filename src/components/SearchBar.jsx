import { useState } from "react";

export default function SearchBar({ genres = [], languages = [], onFilterChange }) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");

  return (
    <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
      <div className="search-input-container">
        <input
          type="text"
          name="query"
          placeholder="Buscar canción..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onFilterChange?.({ query: e.target.value, genre, language });
          }}
          className="search-input"
        />
      </div>

      <div className="search-filters">
        <select
          name="genre"
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
            onFilterChange?.({ query, genre: e.target.value, language });
          }}
          className="search-select"
        >
          <option value="">Géneros: Todos</option>
          {genres.map((g) => (
            <option key={g._id} value={g.name}>
              {g.name}
            </option>
          ))}
        </select>

        <select
          name="language"
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            onFilterChange?.({ query, genre, language: e.target.value });
          }}
          className="search-select"
        >
          <option value="">Idioma: Todos</option>
          {languages.map((l) => (
            <option key={l._id} value={l.name}>
              {l.name}
            </option>
          ))}
        </select>
      </div>

    </form>
  );
}
