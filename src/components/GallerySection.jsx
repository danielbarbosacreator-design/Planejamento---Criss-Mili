import { readFileAsDataURL } from "../utils.js";

export default function GallerySection({ label, photos, isClient, onAdd, onRemove }) {
  async function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const urls = await Promise.all(files.map(readFileAsDataURL));
    onAdd(urls);
    e.target.value = "";
  }

  return (
    <div className="gallery-section">
      <div className="gallery-head">
        <h3>{label}</h3>
        <span className="gallery-count">{photos.length} foto{photos.length === 1 ? "" : "s"}</span>
      </div>
      <div className="gallery-grid">
        {photos.map((p, idx) => (
          <div className="gallery-item" key={idx}>
            <img src={p} />
            {!isClient && <button className="g-remove" onClick={() => onRemove(idx)}>✕</button>}
          </div>
        ))}
        {!isClient && (
          <label className="gallery-add">
            <span className="plus">+</span>
            Adicionar fotos
            <input type="file" accept="image/*" multiple style={{ display: "none" }} onChange={handleFiles} />
          </label>
        )}
      </div>
    </div>
  );
}
