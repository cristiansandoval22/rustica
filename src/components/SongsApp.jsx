// src/components/SongsApp.jsx
import { useState, useEffect, useMemo } from "react";
import SearchBar from "./SearchBar.jsx";
import SongCard from "./Songcard.jsx";



export default function SongsApp({
    initialSongs = [],
    genres = [],
    languages = [],
    artists = [],
}) {
    const [filters, setFilters] = useState({
        query: "",
        genre: "",
        language: "",
        artist: "",
    });
    const [selectedSongs, setSelectedSongs] = useState([]);

    // Hidratar el carrito desde localStorage al cargar
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("karaokeCart") || "[]");
        setSelectedSongs(saved);
    }, []);

    // Agregar o quitar con límite de 2 canciones
    const handleToggleSong = (song) => {
        const saved = JSON.parse(localStorage.getItem("karaokeCart") || "[]");
        const yaExisteIndex = saved.findIndex((s) => s._id === song._id);

        if (yaExisteIndex !== -1) {
            // Si ya está agregada, la quitamos al volver a hacer clic
            const updated = saved.filter((s) => s._id !== song._id);
            localStorage.setItem("karaokeCart", JSON.stringify(updated));
            setSelectedSongs(updated);
            return;
        }

        if (saved.length >= 2) {
            alert("Solo puedes agregar 2 canciones por pedido 🎤");
            return;
        }

        const title =
            typeof song.title === "string"
                ? song.title
                : song.title?.es ?? song.title?.en ?? "";

        const songData = {
            _id: song._id,
            title: title,
            artists: (song.artists ?? []).map((a) => a.name),
            genres: (song.genres ?? []).map((g) => g.name),
            language: song.language?.name ?? "Español",
        };

        const updated = [...saved, songData];
        localStorage.setItem("karaokeCart", JSON.stringify(updated));
        setSelectedSongs(updated);
    };

    // Filtro de búsqueda
    const filtered = useMemo(() => {
        const q = (filters.query || "").toLowerCase().trim();
        return initialSongs.filter((song) => {
            const title =
                typeof song.title === "string"
                    ? song.title
                    : song.title?.es ?? song.title?.en ?? "";
            const matchTitle = !q || title.toLowerCase().includes(q);

            const songLang = (song.language?.name ?? "").toString();
            const songArtists = (song.artists ?? [])
                .map((a) => a.name.toLowerCase())
                .join(" ");

            const matchGenre =
                !filters.genre ||
                (Array.isArray(song.genres) &&
                    song.genres.some((g) => g.name === filters.genre));

            const matchLang = !filters.language || songLang === filters.language;
            const matchArtist =
                !filters.artist || songArtists.includes(filters.artist.toLowerCase());

            return matchTitle && matchGenre && matchLang && matchArtist;
        });
    }, [initialSongs, filters]);

    return (
        <div className="songs-app">
            <header className="songs-header">
                <a className="btn-add" href="/">Inicio</a>
                <div className="header_song_info">
                    
                    <h1 className="songs-title">🎵 Pedir Música</h1>
                    <p className="songs-description">Elige hasta 2 canciones para cantar.</p>
                </div>

                <div className="header_song_cart">
                    {/* Nota: apunta a la ruta que creaste en pages (ej: /musicas/resumen-pedido o /resumencart) */}
                    <a className="btn-add" href="/resumencart">
                        Canciones seleccionadas ({selectedSongs.length})
                    </a>
                </div>

            </header>

            <SearchBar
                genres={genres}
                languages={languages}
                onFilterChange={(next) => setFilters((s) => ({ ...s, ...next }))}
            />

            <div className="songs-list">
                {filtered.map((song) => (
                    <SongCard
                        key={song._id}
                        song={song}
                        isSelected={selectedSongs.some((s) => s._id === song._id)}
                        onAdd={handleToggleSong}
                    />
                ))}

                {filtered.length === 0 && (
                    <p style={{ textAlign: "center", width: "100%", color: "#94a3b8" }}>
                        No hay resultados
                    </p>
                )}
            </div>
        </div>
    );
}