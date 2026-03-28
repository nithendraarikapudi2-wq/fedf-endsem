import { useState } from "react";

const defaultValues = {
  assignee: "",
  description: "",
  dueDate: "",
  estimate: "",
  priority: "Medium",
  reporter: "",
  tags: "",
  team: "",
  title: "",
};

function IssueForm({ activeRequest, onCreateIssue }) {
  const [formValues, setFormValues] = useState(defaultValues);
  const [createdIssue, setCreatedIssue] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const issue = await onCreateIssue(formValues);
    setCreatedIssue(issue);
    setFormValues(defaultValues);
  };

  return (
    <section className="form-layout">
      <form className="issue-form" onSubmit={handleSubmit}>
        <div className="panel-header">
          <div>
            <p className="eyebrow">Controlled form</p>
            <h3>Create a new issue</h3>
          </div>
        </div>

        <div className="form-grid">
          <label>
            <span>Title</span>
            <input name="title" value={formValues.title} onChange={handleChange} required />
          </label>
          <label>
            <span>Assignee</span>
            <input name="assignee" value={formValues.assignee} onChange={handleChange} required />
          </label>
          <label>
            <span>Reporter</span>
            <input name="reporter" value={formValues.reporter} onChange={handleChange} required />
          </label>
          <label>
            <span>Team</span>
            <input name="team" value={formValues.team} onChange={handleChange} required />
          </label>
          <label>
            <span>Priority</span>
            <select name="priority" value={formValues.priority} onChange={handleChange}>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>
          <label>
            <span>Estimate</span>
            <input name="estimate" value={formValues.estimate} onChange={handleChange} required />
          </label>
          <label>
            <span>Due date</span>
            <input name="dueDate" value={formValues.dueDate} onChange={handleChange} required />
          </label>
          <label>
            <span>Tags</span>
            <input
              name="tags"
              value={formValues.tags}
              onChange={handleChange}
              placeholder="Frontend, Bug, Accessibility"
            />
          </label>
          <label className="full-width">
            <span>Description</span>
            <textarea
              name="description"
              rows="5"
              value={formValues.description}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <button className="primary-btn" type="submit" disabled={activeRequest === "create"}>
          {activeRequest === "create" ? "Creating issue..." : "Create issue"}
        </button>
      </form>

      <aside className="details-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Async feedback</p>
            <h3>Submission result</h3>
          </div>
        </div>

        {createdIssue ? (
          <div className="detail-block">
            <span className="issue-id">{createdIssue.id}</span>
            <strong>{createdIssue.title}</strong>
            <p>The issue was added successfully and starts in the Todo stage for predictable triage.</p>
          </div>
        ) : (
          <div className="empty-state">
            <h4>No issue submitted yet</h4>
            <p>Submit the form to create a new issue and confirm the initial state assignment.</p>
          </div>
        )}
      </aside>
    </section>
  );
}

export default IssueForm;
