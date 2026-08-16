const OPTS = [["all", "Todos"], ["instagram", "Instagram"], ["facebook", "Facebook"], ["whatsapp", "Comunidade WhatsApp"], ["site", "Site"]];

export default function Toolbar({ activeFilter, onFilterChange, onReset, onAdd, isClient }) {
  return (
    <div className="toolbar">
      <div className="filters">
        {OPTS.map(([val, label]) => (
          <button
            key={val}
            className={"chip" + (activeFilter === val ? " on" : "")}
            onClick={() => onFilterChange(val)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="spacer"></div>
      {!isClient && (
        <>
          <button className="btn btn-ghost team-only" onClick={onReset}>Restaurar plano padrão</button>
          <button className="btn btn-primary team-only" onClick={onAdd}>+ Novo conteúdo</button>
        </>
      )}
    </div>
  );
}
