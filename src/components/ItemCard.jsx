import { CHANNEL_LABEL } from "../data.js";
import { fmtDate, statusLabel, approvalLabel } from "../utils.js";

export default function ItemCard({ item, isClient, onEdit, onCycleStatus, onCycleApproval }) {
  const d = fmtDate(item.date);
  return (
    <div className="item">
      <div className="datebox">
        <div className="d">{d.day}</div>
        <div className="m">{d.month}</div>
        <div className="wd">{d.weekday}</div>
      </div>
      <div className="item-body">
        <div className="item-top">
          <span className="badge b-type">{item.type}</span>
          {item.channels.map((c) => (
            <span className={"badge b-" + c} key={c}>{CHANNEL_LABEL[c]}</span>
          ))}
        </div>
        <h4>{item.title}</h4>
        {item.desc && <p className="desc">{item.desc}</p>}
        {(item.feedImage || item.storyImage) && (
          <div className="thumbs">
            {item.feedImage && <img className="thumb-feed" src={item.feedImage} title="Arte feed 1080x1350" />}
            {item.storyImage && <img className="thumb-story" src={item.storyImage} title="Arte stories 1080x1920" />}
          </div>
        )}
      </div>
      <div className="item-actions" style={{ flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
        <button className={"approval-pill ap-" + item.approval} onClick={onCycleApproval}>{approvalLabel(item.approval)}</button>
        {!isClient && (
          <button className={"status-pill st-" + item.status} onClick={onCycleStatus}>{statusLabel(item.status)}</button>
        )}
        <button className="icon-btn" title="Ver / editar" onClick={onEdit}>👁</button>
      </div>
    </div>
  );
}
