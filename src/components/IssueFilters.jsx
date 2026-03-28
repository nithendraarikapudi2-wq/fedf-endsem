function IssueFilters({
  priorityFilter,
  priorityOptions,
  query,
  setPriorityFilter,
  setQuery,
  setStatusFilter,
  statusFilter,
  statusOptions,
}) {
  return (
    <section className="toolbar">
      <label className="search-field">
        <span>Search issues</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title, ID, assignee, or tag"
        />
      </label>

      <label className="filter-field">
        <span>Status</span>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="filter-field">
        <span>Priority</span>
        <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)}>
          {priorityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}

export default IssueFilters;
