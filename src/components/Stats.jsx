export default function Stats({ items }) {
  const total = items.length;
  const publicado = items.filter((i) => i.status === "publicado").length;
  const videos = items.filter((i) => i.type === "Vídeo" || i.type === "Reels").length;
  const aprovado = items.filter((i) => i.approval === "aprovado").length;
  const aguardando = items.filter((i) => i.approval === "pendente").length;
  const reprovado = items.filter((i) => i.approval === "reprovado").length;
  const stats = [
    [total, "Conteúdos no calendário"],
    [videos, "Vídeos / Reels roteirizados"],
    [publicado, "Publicados"],
    [aprovado, "Aprovados pelo cliente"],
    [aguardando, "Aguardando aprovação"],
    [reprovado, "Reprovados"],
  ];
  return (
    <div className="stats">
      {stats.map(([num, lbl]) => (
        <div className="stat" key={lbl}>
          <div className="num">{num}</div>
          <div className="lbl">{lbl}</div>
        </div>
      ))}
    </div>
  );
}
