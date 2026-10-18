import { useState, useEffect } from "react";

export default function OrderSummary({ tables = [] }) {
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [observations, setObservations] = useState("");

  // ✅ Hidratar carrito desde localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("karaokeCart") || "[]");
    setCart(saved);
  }, []);

  // ✅ Quitar canción del carrito
  const handleRemove = (id) => {
    const updated = cart.filter((song) => song._id !== id);
    setCart(updated);
    localStorage.setItem("karaokeCart", JSON.stringify(updated));
  };

  // ✅ Enviar pedido por WhatsApp
  const handleSubmit = () => {
    if (!tableNumber || cart.length === 0) {
      alert("Debes seleccionar una mesa y al menos 1 canción.");
      return;
    }

    const message = `🎵 *PEDIDO DE KARAOKE* 🎵

📍 *MESA:* ${tableNumber}

🎶 *CANCIONES:*
${cart
        .map(
          (song, i) =>
            `${i + 1}. *${song.title}* —${(song.artists ?? []).join(", ")}`
        )
        .join("\n")}

💬 *OBSERVACIONES:* ${observations.trim() || "Ninguna"}
`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/51944584827?text=${encoded}`;
    window.open(whatsappUrl, "_blank");

    // ✅ Limpiar carrito después de enviar
    localStorage.removeItem("karaokeCart");
    setCart([]);
  };

  return (
    <div className="order-summary">
      <header className="order-header">
        <button onClick={() => window.history.back()} className="btn-outline btn-add">
          <span className="andrsrxn--arrow-u-left"></span>
        </button>
        <h1>Tu lista</h1>
        <p className="song-count">({cart.length}/2)</p>
      </header>

      {/* Lista de canciones */}
      <div className="card-cart">
        <div className="cart-list">
          {cart.length === 0 && <p>No has seleccionado ninguna canción.</p>}
          {cart.map((song, index) => (
            <div key={song._id} className="cart-item">
              <div>
                <p className="song-title">
                  {index + 1}. {song.title}
                </p>
                <p className="song-artist">{(song.artists ?? []).join(", ")}</p>
              </div>
              <button
                onClick={() => handleRemove(song._id)}
                className="btn-danger"
              >
                Quitar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Información de pedido */}
      <div className="card__order-info">
        <h2>Información del Pedido</h2>

        <label>Mesa *</label>
        <select
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
        >
          <option value="">Selecciona tu mesa</option>

          {/* Ordenamos numéricamente: Mesa 1, Mesa 2, Mesa 3, Mesa 4... */}
          {[...tables]
            .sort((a, b) =>
              (a.name || "").localeCompare(b.name || "", undefined, { numeric: true })
            )
            .map((table) => {
              const tableName = table.name || table.numero || `Mesa ${table._id}`;
              return (
                <option key={table._id} value={tableName}>
                  {tableName}
                </option>
              );
            })}
        </select>

        <label>Observaciones (opcional)</label>
        <textarea
          className="observations"
          placeholder="Ej: Dedicada a María, Para celebrar cumpleaños..."
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={!tableNumber || cart.length === 0}
          className="btn-primary"
        >
          Enviar Pedido por WhatsApp
        </button>
      </div>
    </div>
  );
}