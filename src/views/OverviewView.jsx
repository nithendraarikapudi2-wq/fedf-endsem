import IssueDetail from "../components/IssueDetail";
import IssueFilters from "../components/IssueFilters";
import IssueList from "../components/IssueList";
import SummaryCard from "../components/SummaryCard";

function OverviewView({
  activeRequest,
  error,
  filteredIssues,
  handleSelectIssue,
  handleUpdateStatus,
  loadIssues,
  loading,
  metrics,
  priorityFilter,
  priorityOptions,
  query,
  selectedIssue,
  selectedIssueId,
  setPriorityFilter,
  setQuery,
  setStatusFilter,
  statusFilter,
  statusFlow,
  statusOptions,
}) {
  if (loading) {
    return (
      <section className="state-screen">
        <h2>Loading dashboard</h2>
        <p>Fetching issue data and preparing resolution insights.</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="state-screen">
        <h2>Dashboard unavailable</h2>
        <p>{error}</p>
        <button className="primary-btn" type="button" onClick={loadIssues}>
          Retry load
        </button>
      </section>
    );
  }

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Dashboard overview</p>
          <h2>Track issue health without losing workflow context</h2>
          <p className="hero-copy">
            Monitor issue volume, filter by operational risk, and update resolution stages with guarded transitions.
          </p>
        </div>
      </section>

      <section className="metrics-grid">
        {metrics.map((metric) => (
          <SummaryCard key={metric.label} {...metric} />
        ))}
      </section>

      <IssueFilters
        priorityFilter={priorityFilter}
        priorityOptions={priorityOptions}
        query={query}
        setPriorityFilter={setPriorityFilter}
        setQuery={setQuery}
        setStatusFilter={setStatusFilter}
        statusFilter={statusFilter}
        statusOptions={statusOptions}
      />

      <section className="content-grid">
        <div className="issues-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Issue queue</p>
              <h3>{filteredIssues.length} matching issues</h3>
            </div>
          </div>

          <IssueList
            issues={filteredIssues}
            onSelect={handleSelectIssue}
            selectedIssueId={selectedIssueId}
          />
        </div>

        <IssueDetail
          activeRequest={activeRequest}
          issue={selectedIssue}
          onUpdateStatus={handleUpdateStatus}
          statusFlow={statusFlow}
        />
      </section>
    </>
  );
}

export default OverviewView;
