import IssueCard from "./IssueCard";

function IssueList({ issues, onSelect, selectedIssueId }) {
  if (!issues.length) {
    return (
      <div className="empty-state">
        <h4>No issues found</h4>
        <p>Adjust the current search or filters to widen the result set.</p>
      </div>
    );
  }

  return (
    <div className="issue-list">
      {issues.map((issue) => (
        <IssueCard
          key={issue.id}
          issue={issue}
          isActive={issue.id === selectedIssueId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default IssueList;
