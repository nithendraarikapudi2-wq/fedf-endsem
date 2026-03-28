import { NavLink } from "react-router-dom";

function SidebarNav({ blockedCount, issueCount }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div>
          <p className="eyebrow">PulseBoard</p>
          <h1>Issue Tracking Dashboard</h1>
          <p className="sidebar-copy">
            Track issues from intake to resolution with predictable state transitions and fast team context.
          </p>
        </div>

        <nav className="nav-list" aria-label="Dashboard sections">
          <NavLink className="nav-link" to="/">
            Overview
          </NavLink>
          <NavLink className="nav-link" to="/pipeline">
            Resolution Pipeline
          </NavLink>
          <NavLink className="nav-link" to="/create">
            Create Issue
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-stack">
        <section className="sidebar-panel">
          <p className="panel-label">Sprint focus</p>
          <strong>Predictable resolution flow</strong>
          <span>{issueCount} active issues under observation</span>
        </section>

        <section className="sidebar-panel">
          <p className="panel-label">Escalation watch</p>
          <strong>{blockedCount} blocked issues</strong>
          <span>Investigate dependency blockers before the next review cycle.</span>
        </section>
      </div>
    </aside>
  );
}

export default SidebarNav;
