export default function Stats({ items }) {
  const total = items.length;
  const publicado = items.filter((i) => i.status === "publicado").length;
  const aprovado = items.filter((i) => i.approval === "aprovado").length;
  const percentPub = total > 0 ? Math.round((publicado / total) * 100) : 0;
  
  return (
    <>
      <div className="stat-card-clean">
        <div className="sc-label">Total Publicado</div>
        <div className="sc-val">{publicado} / {total}</div>
        <div className="sc-trend">+{percentPub}% concluído</div>
      </div>
      <div className="stat-card-clean">
        <div className="sc-label">Aprovados</div>
        <div className="sc-val">{aprovado}</div>
        <div className="sc-trend">Prontos para ir ao ar</div>
      </div>
    </>
  );
}
