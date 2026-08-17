import { useEffect, useRef, useState } from "react";

const VIEWPORT = 240;
const OUTPUT = 480;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

export default function PhotoEditorModal({ src, onCancel, onSave }) {
  const [img, setImg] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragState = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const image = new Image();
    image.onload = () => { if (!cancelled) { setImg(image); setZoom(1); setPos({ x: 0, y: 0 }); } };
    image.src = src;
    return () => { cancelled = true; };
  }, [src]);

  if (!img) return null;

  const baseScale = Math.max(VIEWPORT / img.naturalWidth, VIEWPORT / img.naturalHeight);
  const scale = baseScale * zoom;
  const dispW = img.naturalWidth * scale;
  const dispH = img.naturalHeight * scale;
  const maxOffsetX = Math.max(0, (dispW - VIEWPORT) / 2);
  const maxOffsetY = Math.max(0, (dispH - VIEWPORT) / 2);

  function clamp(p, mx = maxOffsetX, my = maxOffsetY) {
    return { x: Math.min(mx, Math.max(-mx, p.x)), y: Math.min(my, Math.max(-my, p.y)) };
  }

  function handlePointerDown(e) {
    e.preventDefault();
    dragState.current = { startX: e.clientX, startY: e.clientY, startPos: pos };
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  }
  function handlePointerMove(e) {
    if (!dragState.current) return;
    const { startX, startY, startPos } = dragState.current;
    setPos(clamp({ x: startPos.x + (e.clientX - startX), y: startPos.y + (e.clientY - startY) }));
  }
  function handlePointerUp() {
    dragState.current = null;
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
  }

  function handleZoomChange(e) {
    const nz = Number(e.target.value);
    const nScale = baseScale * nz;
    const nMaxX = Math.max(0, (img.naturalWidth * nScale - VIEWPORT) / 2);
    const nMaxY = Math.max(0, (img.naturalHeight * nScale - VIEWPORT) / 2);
    setZoom(nz);
    setPos((p) => clamp(p, nMaxX, nMaxY));
  }

  function handleSave() {
    const canvas = document.createElement("canvas");
    canvas.width = OUTPUT;
    canvas.height = OUTPUT;
    const ctx = canvas.getContext("2d");
    const ratio = OUTPUT / VIEWPORT;
    const outScale = scale * ratio;
    const cx = OUTPUT / 2 + pos.x * ratio;
    const cy = OUTPUT / 2 + pos.y * ratio;
    ctx.drawImage(
      img,
      cx - (img.naturalWidth * outScale) / 2,
      cy - (img.naturalHeight * outScale) / 2,
      img.naturalWidth * outScale,
      img.naturalHeight * outScale
    );
    onSave(canvas.toDataURL("image/jpeg", 0.92));
  }

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="modal photo-editor-modal">
        <h3>Ajustar foto</h3>
        <div className="photo-editor-viewport" onPointerDown={handlePointerDown}>
          <img
            src={img.src}
            alt=""
            draggable={false}
            className="photo-editor-img"
            style={{ width: dispW, height: dispH, transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)` }}
          />
          <div className="photo-editor-ring"></div>
        </div>
        <div className="photo-editor-zoom-row">
          <span className="photo-editor-zoom-icon">🔍</span>
          <input type="range" min={MIN_ZOOM} max={MAX_ZOOM} step={0.01} value={zoom} onChange={handleZoomChange} />
        </div>
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancelar</button>
          <button type="button" className="btn btn-primary" onClick={handleSave}>Salvar foto</button>
        </div>
      </div>
    </div>
  );
}
