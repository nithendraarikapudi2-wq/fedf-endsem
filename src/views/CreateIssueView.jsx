import IssueForm from "../components/IssueForm";

function CreateIssueView({ activeRequest, handleCreateIssue }) {
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Issue intake</p>
          <h2>Create new work with controlled inputs</h2>
          <p className="hero-copy">
            Capture new issues consistently, assign ownership, and start each issue in a predictable triage state.
          </p>
        </div>
      </section>

      <IssueForm activeRequest={activeRequest} onCreateIssue={handleCreateIssue} />
    </>
  );
}

export default CreateIssueView;
