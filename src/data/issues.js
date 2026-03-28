export const statusOptions = [
  "All",
  "Todo",
  "In Progress",
  "Review",
  "Blocked",
  "Resolved",
];

export const priorityOptions = ["All", "Critical", "High", "Medium", "Low"];

export const statusFlow = {
  Todo: ["In Progress"],
  "In Progress": ["Review", "Blocked"],
  Review: ["Resolved", "In Progress"],
  Blocked: ["In Progress"],
  Resolved: [],
};

export const initialIssues = [
  {
    id: "UX-214",
    title: "Notification drawer overlaps sprint controls",
    priority: "High",
    status: "In Progress",
    assignee: "Ava Patel",
    reporter: "Marcus Lee",
    team: "Design Systems",
    dueDate: "Mar 29",
    estimate: "5 pts",
    tags: ["UI", "Accessibility"],
    description:
      "The notification tray expands over sprint actions on tablet widths, blocking keyboard users from reaching the controls.",
    activity: [
      { type: "comment", label: "Ava added keyboard-navigation notes", time: "10m ago" },
      { type: "update", label: "Status changed from Todo to In Progress", time: "42m ago" },
      { type: "commit", label: "Linked commit 3a9f1dd to issue", time: "2h ago" },
    ],
  },
  {
    id: "API-087",
    title: "Retry storm after webhook timeout",
    priority: "Critical",
    status: "Blocked",
    assignee: "Jordan Kim",
    reporter: "Nina Brooks",
    team: "Platform",
    dueDate: "Today",
    estimate: "8 pts",
    tags: ["Backend", "Incident"],
    description:
      "Webhook retries do not back off after a gateway timeout, causing duplicate deliveries and queue saturation under load.",
    activity: [
      { type: "alert", label: "Incident channel escalated to SEV-2", time: "5m ago" },
      { type: "comment", label: "Jordan requested infra logs from gateway team", time: "28m ago" },
      { type: "update", label: "Blocked by missing rate-limit metrics", time: "1h ago" },
    ],
  },
  {
    id: "OPS-141",
    title: "CSV export misses filtered custom fields",
    priority: "Medium",
    status: "Review",
    assignee: "Sofia Chen",
    reporter: "Priya Nair",
    team: "Operations",
    dueDate: "Apr 2",
    estimate: "3 pts",
    tags: ["Export", "Data"],
    description:
      "Exports created from saved filters exclude dynamic custom columns, which causes operational reports to lose account-level metadata.",
    activity: [
      { type: "review", label: "Code review requested from data integrations", time: "14m ago" },
      { type: "comment", label: "QA attached regression checklist", time: "1h ago" },
      { type: "update", label: "Patch pushed to staging", time: "3h ago" },
    ],
  },
  {
    id: "MOB-053",
    title: "Android app crashes when offline draft sync resumes",
    priority: "High",
    status: "Todo",
    assignee: "Diego Alvarez",
    reporter: "Maya Singh",
    team: "Mobile",
    dueDate: "Apr 5",
    estimate: "13 pts",
    tags: ["Android", "Sync"],
    description:
      "Offline drafts created during packet loss can crash the app once network connectivity returns and sync reconciliation begins.",
    activity: [
      { type: "comment", label: "Crash traces uploaded from beta cohort", time: "22m ago" },
      { type: "update", label: "Added to mobile stabilization sprint", time: "2h ago" },
      { type: "alert", label: "Spike in crash-free session drop detected", time: "4h ago" },
    ],
  },
  {
    id: "SEC-302",
    title: "Session invalidation delayed after role downgrade",
    priority: "Critical",
    status: "Resolved",
    assignee: "Liam Foster",
    reporter: "Elena Garcia",
    team: "Security",
    dueDate: "Mar 30",
    estimate: "8 pts",
    tags: ["Auth", "Security"],
    description:
      "Users keep elevated access for several minutes after permission downgrades because token invalidation is processed asynchronously.",
    activity: [
      { type: "update", label: "Issue moved to Resolved after compliance verification", time: "11m ago" },
      { type: "commit", label: "Revocation queue instrumentation added", time: "53m ago" },
      { type: "update", label: "Temporary mitigation enabled for admin roles", time: "2h ago" },
    ],
  },
  {
    id: "WEB-198",
    title: "Board drag-and-drop jitters in Safari",
    priority: "Low",
    status: "Todo",
    assignee: "Rina Okafor",
    reporter: "Ethan Cole",
    team: "Frontend",
    dueDate: "Apr 8",
    estimate: "2 pts",
    tags: ["Safari", "Performance"],
    description:
      "Card reordering feels unstable in Safari because transform updates fight with scroll container measurements during drag operations.",
    activity: [
      { type: "comment", label: "Perf profile attached from Safari 17.4", time: "18m ago" },
      { type: "update", label: "Triaged as non-blocking UI polish", time: "3h ago" },
      { type: "review", label: "Needs reproduction on iPadOS", time: "6h ago" },
    ],
  },
];
