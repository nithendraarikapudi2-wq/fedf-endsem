import StatusBadge from "../components/StatusBadge";

function PipelineView({ activeRequest, groupedIssues, handleSelectIssue, handleUpdateStatus, statusFlow }) {
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Route-based workflow</p>
          <h2>Resolution pipeline by issue state</h2>
          <p className="hero-copy">
            Review issue movement through each stage and apply only the next allowed transition.
          </p>
        </div>
      </section>

      <section className="pipeline-grid" aria-label="Issue resolution pipeline">
        {Object.entries(groupedIssues).map(([status, issues]) => (
          <section key={status} className="pipeline-column">
            <div className="panel-header compact">
              <div>
                <p className="eyebrow">Stage</p>
                <h3>{status}</h3>
              </div>
              <span className="pill">{issues.length}</span>
            </div>

            <div className="pipeline-list">
              {issues.map((issue) => (
                <article key={issue.id} className="pipeline-card">
                  <button type="button" className="pipeline-link" onClick={() => handleSelectIssue(issue.id)}>
                    <strong>{issue.id}</strong>
                    <span>{issue.title}</span>
                  </button>
                  <StatusBadge status={issue.status} />
                  <div className="action-row">
                    {(statusFlow[issue.status] ?? []).map((nextStatus) => (
                      <button
                        key={nextStatus}
                        type="button"
                        className="ghost-btn small-btn"
                        disabled={activeRequest === `update-${issue.id}`}
                        onClick={() => handleUpdateStatus(issue.id, nextStatus)}
                      >
                        {nextStatus}
                      </button>
                    ))}
                  </div>
                </article>
              ))}

              {!issues.length && (
                <div className="empty-state">
                  <h4>No issues here</h4>
                  <p>This stage is currently clear.</p>
                </div>
              )}
            </div>
          </section>
        ))}
      </section>
    </>
  );
}

export default PipelineView;
