import StatusBadge from "./StatusBadge";

function IssueDetail({ activeRequest, issue, onUpdateStatus, statusFlow }) {
  if (!issue) {
    return (
      <div className="details-panel">
        <div className="empty-state">
          <h4>Select an issue</h4>
          <p>Choose an issue to inspect ownership, activity, and valid resolution transitions.</p>
        </div>
      </div>
    );
  }

  const nextStatuses = statusFlow[issue.status] ?? [];

  return (
    <div className="details-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Selected issue</p>
          <h3>{issue.title}</h3>
        </div>
        <StatusBadge status={issue.status} />
      </div>

      <div className="detail-block">
        <span className="issue-id">{issue.id}</span>
        <p>{issue.description}</p>
      </div>

      <div className="detail-grid">
        <article>
          <span>Priority</span>
          <strong>{issue.priority}</strong>
        </article>
        <article>
          <span>Assignee</span>
          <strong>{issue.assignee}</strong>
        </article>
        <article>
          <span>Reporter</span>
          <strong>{issue.reporter}</strong>
        </article>
        <article>
          <span>Due date</span>
          <strong>{issue.dueDate}</strong>
        </article>
      </div>

      <div className="state-panel">
        <div className="panel-header compact">
          <div>
            <p className="eyebrow">Resolution controls</p>
            <h3>Allowed next stages</h3>
          </div>
        </div>

        {nextStatuses.length ? (
          <div className="action-row">
            {nextStatuses.map((status) => (
              <button
                key={status}
                type="button"
                className="ghost-btn small-btn"
                disabled={activeRequest === `update-${issue.id}`}
                onClick={() => onUpdateStatus(issue.id, status)}
              >
                Move to {status}
              </button>
            ))}
          </div>
        ) : (
          <p className="support-copy">This issue is in a terminal state and cannot move forward.</p>
        )}
      </div>

      <div className="tags-row">
        {issue.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="activity-panel">
        <div className="panel-header compact">
          <div>
            <p className="eyebrow">Latest activity</p>
            <h3>Recent timeline</h3>
          </div>
        </div>

        <ul className="activity-list">
          {issue.activity.map((item) => (
            <li key={`${item.label}-${item.time}`}>
              <span className={`activity-icon ${item.type}`} aria-hidden="true" />
              <div>
                <strong>{item.label}</strong>
                <small>{item.time}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default IssueDetail;
