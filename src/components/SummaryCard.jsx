import { memo } from "react";

const SummaryCard = memo(function SummaryCard({ detail, label, value }) {
  return (
    <article className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
});

export default SummaryCard;
