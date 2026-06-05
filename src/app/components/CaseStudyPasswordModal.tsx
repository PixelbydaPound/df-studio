import { FormEvent, useState } from "react";
import { loginDod } from "../lib/dod-auth";
import "./CaseStudyPasswordModal.css";

type CaseStudyPasswordModalProps = {
  projectTitle: string;
  onAuthenticated: () => void;
  onCancel: () => void;
};

export function CaseStudyPasswordModal({
  projectTitle,
  onAuthenticated,
  onCancel,
}: CaseStudyPasswordModalProps) {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.length === 0) {
      setShowError(true);
      return;
    }

    setIsSubmitting(true);
    setShowError(false);

    const isValid = await loginDod(password);

    if (isValid) {
      onAuthenticated();
      return;
    }

    setIsSubmitting(false);
    setShowError(true);
  };

  return (
    <div
      className="case-study-gate"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-gate-title"
    >
      <div className="case-study-gate__panel">
        <span className="case-study-gate__badge">Restricted access</span>
        <h2 id="case-study-gate-title" className="case-study-gate__title">
          {projectTitle}
        </h2>
        <p className="case-study-gate__description">
          This case study contains U.S. Department of Defense-related work and
          is password protected. Enter your access password to view the content,
          or contact Daniel to request access.
        </p>
        <p className="case-study-gate__disclaimer">
          Unauthorized distribution of this material is prohibited.
        </p>

        <form className="case-study-gate__form" onSubmit={handleSubmit}>
          <input
            type="password"
            className={`case-study-gate__input${
              showError ? " case-study-gate__input--error" : ""
            }`}
            aria-label="Case study access password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setShowError(false);
            }}
            autoFocus
          />
          {showError && (
            <p className="case-study-gate__error">
              Invalid password. Please try again or request access.
            </p>
          )}
          <div className="case-study-gate__actions">
            <button
              type="button"
              className="case-study-gate__cancel"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="case-study-gate__submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "View case study"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
