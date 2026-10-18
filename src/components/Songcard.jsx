// src/components/SongCard.jsx
export default function SongCard({ song, isSelected, onAdd }) {
  const title =
    typeof song.title === "string"
      ? song.title
      : song.title?.es ?? song.title?.en ?? "Sin título";

  const artistsText = (song.artists ?? []).map((a) => a.name).join(", ");

  // Extraemos el género principal (o la lista)
  const genresList = (song.genres ?? []).map((g) => g.name);
  const mainGenre = genresList[0] || "Varios";

  // Idioma para el atributo data-language
  const langName = song.language?.name ?? "";
  const dataLanguage = langName === "Español" ? "es" : "en";

  return (
    <article
      className={`card ${isSelected ? "card--selected" : ""}`}
      data-genre={mainGenre.toLowerCase()}
      data-title={title.toLowerCase()}
      data-language={dataLanguage}
    >
      <div className="card-info">
        <h2 className="card-title">{title}</h2>
        <p className="card-artists">
         {artistsText}
        </p>
        <div className="card-tags">
          <span className="card-genre">{mainGenre}</span>
          {langName && <span className="card-lang">{langName}</span>}
        </div>
      </div>

      <div className="card-footer">
        
        <button
          type="button"
          className={`btn-add ${isSelected ? "btn-add--selected" : ""}`}
          onClick={() => onAdd(song)}
        >
          <span className={isSelected ? "ci--check" : "ci--list-add"} />
          {isSelected ? "Agregada" : "Agregar"}
        </button>
      </div>

    </article>
  );
}