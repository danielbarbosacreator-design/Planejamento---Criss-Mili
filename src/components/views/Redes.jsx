import { CHANNEL_LABEL } from "../../data.js";
import { fmtDate } from "../../utils.js";

export default function Redes({ items, isClient, onEdit }) {
  const list = [...items].filter((i) => i.type !== "Marco").sort((a, b) => a.date.localeCompare(b.date));
  return (
    <>
      <div className="view-intro">Conteúdo pronto pra publicar: texto da arte, legenda completa e canal de cada peça — já organizado conforme o planejamento de conteúdo baseado no plano estratégico.</div>
      <div>
        {list.map((i) => {
          const d = fmtDate(i.date);
          return (
            <div className="content-card" key={i.id}>
              <div className="cc-top">
                <span className="badge b-type">{i.type}</span>
                {i.channels.map((c) => <span className={"badge b-" + c} key={c}>{CHANNEL_LABEL[c]}</span>)}
                <span style={{ fontSize: 11, color: "var(--gray-text)", marginLeft: "auto" }}>{d.day} {d.month} · {d.weekday}</span>
              </div>
              <h4>{i.title}</h4>
              {i.imageText && (
                <div className="cc-block">
                  <div className="cc-label">Texto que vai na imagem</div>
                  <span className="cc-imgtext">{i.imageText}</span>
                </div>
              )}
              <div className="cc-block">
                <div className="cc-label">Legenda</div>
                {i.caption
                  ? <div className="cc-caption">{i.caption}</div>
                  : <div className="cc-caption" style={{ color: "var(--gray-text)" }}>Ainda não preenchida — abra o conteúdo no calendário pra escrever.</div>}
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
