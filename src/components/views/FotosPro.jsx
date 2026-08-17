import GallerySection from "../GallerySection.jsx";

export default function FotosPro({ photos, isClient, onAdd, onRemove }) {
  return (
    <>
      <div className="view-intro">Fotos profissionais feitas em estúdio (Joinville). Suba aqui conforme forem sendo entregues.</div>
      <GallerySection label="Fotos profissionais" photos={photos.map((p) => p.url)} isClient={isClient} onAdd={onAdd} onRemove={onRemove} />
    </>
  );
}
