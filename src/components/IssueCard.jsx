import { memo } from "react";
import StatusBadge from "./StatusBadge";

const priorityClassMap = {
  Critical: "critical",
  High: "high",
  Medium: "medium",
  Low: "low",
};

const IssueCard = memo(function IssueCard({ issue, isActive, onSelect }) {
  return (
    <button
      type="button"
      className={`issue-card ${isActive ? "active" : ""}`}
      onClick={() => onSelect(issue.id)}
    >
      <div className="issue-card-top">
        <span className={`priority-dot ${priorityClassMap[issue.priority]}`} aria-hidden="true" />
        <strong>{issue.id}</strong>
        <StatusBadge status={issue.status} />
      </div>
      <h4>{issue.title}</h4>
      <p>{issue.description}</p>
      <div className="issue-meta">
        <span>{issue.assignee}</span>
        <span>{issue.team}</span>
        <span>{issue.dueDate}</span>
      </div>
    </button>
  );
});

export default IssueCard;
