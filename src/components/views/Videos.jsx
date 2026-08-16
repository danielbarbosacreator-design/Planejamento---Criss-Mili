import { CHANNEL_LABEL } from "../../data.js";
import { fmtDate } from "../../utils.js";

export default function Videos({ items, isClient, onEdit }) {
  const vids = [...items].filter((i) => i.type === "Vídeo" || i.type === "Reels").sort((a, b) => a.date.localeCompare(b.date));
  return (
    <>
      <div className="view-intro">Roteiro completo de cada vídeo/reels: legenda, tempo de gravação e direção estilo filmmaker (ambiente, enquadramento, iluminação, áudio e dicas de captação).</div>
      <div>
        {vids.map((i) => {
          const d = fmtDate(i.date);
          const dir = i.direction;
          return (
            <div className="video-card" key={i.id}>
              <div className="vc-top">
                <span className="badge b-type">{i.type}</span>
                {i.channels.map((c) => <span className={"badge b-" + c} key={c}>{CHANNEL_LABEL[c]}</span>)}
                <span style={{ fontSize: 11, color: "var(--gray-text)", marginLeft: "auto" }}>{d.day} {d.month}</span>
              </div>
              <h4>{i.title}</h4>
              {i.caption && (
                <div className="cc-block">
                  <div className="cc-label">Legenda</div>
                  <div className="cc-caption">{i.caption}</div>
                </div>
              )}
              <div className="vc-cols" style={{ marginTop: 12 }}>
                <div>
                  <div className="cc-label" style={{ marginBottom: 6 }}>Tempo / roteiro</div>
                  <ul className="vc-timing-list">
                    {(i.timing && i.timing.length) ? i.timing.map((t, idx) => <li key={idx}>{t}</li>) : <li>Roteiro a detalhar.</li>}
                  </ul>
                </div>
                <div>
                  <div className="cc-label" style={{ marginBottom: 6 }}>Direção (filmmaker)</div>
                  {dir ? (
                    <>
                      <div className="vc-dir-row"><b>Ambiente / cenário</b>{dir.ambiente}</div>
                      <div className="vc-dir-row"><b>Enquadramento</b>{dir.enquadramento}</div>
                      <div className="vc-dir-row"><b>Iluminação</b>{dir.iluminacao}</div>
                      <div className="vc-dir-row"><b>Áudio</b>{dir.audio}</div>
                      <div className="vc-dir-row"><b>Dica extra</b>{dir.dica}</div>
                    </>
                  ) : <div className="meta">Direção a detalhar.</div>}
                </div>
              </div>
              {!isClient && (
                <button className="btn btn-ghost" style={{ marginTop: 10, fontSize: 11.5, padding: "6px 12px" }} onClick={() => onEdit(i.id)}>Editar este conteúdo</button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
