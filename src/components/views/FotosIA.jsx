import { GALLERY_LABELS } from "../../data.js";
import GallerySection from "../GallerySection.jsx";

const CATS = ["estudio", "rua", "evento", "saidaReuniao"];

export default function FotosIA({ galleries, isClient, onAdd, onRemove }) {
  return (
    <>
      <div className="view-intro">Banco de imagens com IA, separado por galeria. Clique em "Adicionar fotos" pra subir os arquivos de cada categoria.</div>
      {CATS.map((cat) => (
        <GallerySection
          key={cat}
          label={GALLERY_LABELS[cat]}
          photos={galleries[cat].map((p) => p.url)}
          isClient={isClient}
          onAdd={(urls) => onAdd(cat, urls)}
          onRemove={(idx) => onRemove(cat, idx)}
        />
      ))}
    </>
  );
}
