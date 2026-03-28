import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SidebarNav from "./components/SidebarNav";
import { initialIssues, priorityOptions, statusFlow, statusOptions } from "./data/issues";
import CreateIssueView from "./views/CreateIssueView";
import OverviewView from "./views/OverviewView";
import PipelineView from "./views/PipelineView";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function App() {
  const [issues, setIssues] = useState([]);
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeRequest, setActiveRequest] = useState("");

  const loadIssues = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      await delay(700);
      setIssues(initialIssues);
      setSelectedIssueId(initialIssues[0]?.id ?? null);
    } catch {
      setError("We could not load issue data. Please retry.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadIssues();
  }, [loadIssues]);

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const matchesQuery =
        issue.title.toLowerCase().includes(query.toLowerCase()) ||
        issue.id.toLowerCase().includes(query.toLowerCase()) ||
        issue.assignee.toLowerCase().includes(query.toLowerCase()) ||
        issue.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));
      const matchesStatus = statusFilter === "All" || issue.status === statusFilter;
      const matchesPriority = priorityFilter === "All" || issue.priority === priorityFilter;

      return matchesQuery && matchesStatus && matchesPriority;
    });
  }, [issues, priorityFilter, query, statusFilter]);

  const selectedIssue = useMemo(() => {
    return issues.find((issue) => issue.id === selectedIssueId) ?? filteredIssues[0] ?? null;
  }, [filteredIssues, issues, selectedIssueId]);

  const metrics = useMemo(() => {
    const criticalCount = issues.filter((issue) => issue.priority === "Critical").length;
    const blockedCount = issues.filter((issue) => issue.status === "Blocked").length;
    const resolvedCount = issues.filter((issue) => issue.status === "Resolved").length;
    const onTrackCount = issues.filter((issue) => issue.status === "Review").length;

    return [
      { label: "Open issues", value: issues.length, detail: "Across all delivery teams" },
      { label: "Critical risk", value: criticalCount, detail: "Requires escalation review" },
      { label: "Blocked items", value: blockedCount, detail: "Waiting on dependencies" },
      { label: "Ready to close", value: resolvedCount + onTrackCount, detail: "Review or resolved" },
    ];
  }, [issues]);

  const groupedIssues = useMemo(() => {
    return statusOptions
      .filter((status) => status !== "All")
      .reduce((accumulator, status) => {
        accumulator[status] = issues.filter((issue) => issue.status === status);
        return accumulator;
      }, {});
  }, [issues]);

  const handleSelectIssue = useCallback((issueId) => {
    setSelectedIssueId(issueId);
  }, []);

  const handleUpdateStatus = useCallback(
    async (issueId, nextStatus) => {
      const issue = issues.find((item) => item.id === issueId);

      if (!issue || !statusFlow[issue.status]?.includes(nextStatus)) {
        return;
      }

      setActiveRequest(`update-${issueId}`);

      await delay(450);

      setIssues((currentIssues) =>
        currentIssues.map((currentIssue) => {
          if (currentIssue.id !== issueId) {
            return currentIssue;
          }

          return {
            ...currentIssue,
            status: nextStatus,
            activity: [
              {
                type: "update",
                label: `Status changed from ${currentIssue.status} to ${nextStatus}`,
                time: "Just now",
              },
              ...currentIssue.activity,
            ],
          };
        })
      );

      setActiveRequest("");
    },
    [issues]
  );

  const handleCreateIssue = useCallback(async (formValues) => {
    setActiveRequest("create");

    await delay(600);

    const nextNumber = issues.length + 201;
    const newIssue = {
      id: `${formValues.team.slice(0, 3).toUpperCase()}-${nextNumber}`,
      title: formValues.title,
      priority: formValues.priority,
      status: "Todo",
      assignee: formValues.assignee,
      reporter: formValues.reporter,
      team: formValues.team,
      dueDate: formValues.dueDate,
      estimate: formValues.estimate,
      tags: formValues.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      description: formValues.description,
      activity: [{ type: "comment", label: "Issue created from dashboard form", time: "Just now" }],
    };

    setIssues((currentIssues) => [newIssue, ...currentIssues]);
    setSelectedIssueId(newIssue.id);
    setActiveRequest("");

    return newIssue;
  }, [issues.length]);

  const dashboardState = {
    activeRequest,
    error,
    filteredIssues,
    groupedIssues,
    handleCreateIssue,
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
  };

  return (
    <div className="app-shell">
      <SidebarNav issueCount={issues.length} blockedCount={metrics[2]?.value ?? 0} />
      <main className="dashboard">
        <Routes>
          <Route path="/" element={<OverviewView {...dashboardState} />} />
          <Route path="/pipeline" element={<PipelineView {...dashboardState} />} />
          <Route
            path="/create"
            element={<CreateIssueView {...dashboardState} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
