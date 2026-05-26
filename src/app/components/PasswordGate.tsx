import { FormEvent, useState } from "react";
import { login } from "../lib/auth";
import "./PasswordGate.css";

type PasswordGateProps = {
  onAuthenticated: () => void;
};

export function PasswordGate({ onAuthenticated }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleInput = (value: string) => {
    setPassword(value);
    setShowError(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.length === 0) {
      setShowError(true);
      return;
    }

    setIsSubmitting(true);

    const isValid = await login(password);

    if (isValid) {
      onAuthenticated();
      return;
    }

    setIsSubmitting(false);
    setShowError(true);
  };

  return (
    <div className="password-gate">
      <div className="password-gate__container">
        <div className="password-gate__header">
          <div className="password-gate__icon">
            <svg
              width="30"
              height="30"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M16 3.5C19.0376 3.5 21.5 5.96243 21.5 9C21.5 12.0376 19.0376 14.5 16 14.5C15.4798 14.5 14.977 14.426 14.5 14.291V15.5H12.5V16.5C12.5 17.0523 12.0523 17.5 11.5 17.5H10.5V18.5C10.5 19.0523 10.0523 19.5 9.5 19.5H8.5V20.5C8.5 21.0523 8.05228 21.5 7.5 21.5H4.5C3.94772 21.5 3.5 21.0523 3.5 20.5V17.4141C3.50004 17.1489 3.60547 16.8945 3.79297 16.707L10.5781 9.9209C10.5276 9.62139 10.5 9.31388 10.5 9C10.5 5.96243 12.9624 3.5 16 3.5ZM16 4.5C13.5147 4.5 11.5 6.51472 11.5 9C11.5 9.25506 11.5227 9.50716 11.5645 9.75488L11.6504 10.2637L11.2852 10.6279L4.5 17.4141V20.5H7.5V18.5H9.5V16.5H11.5V14.5H13.5V12.9688L14.7725 13.3291C15.1641 13.4399 15.5753 13.5 16 13.5C18.4853 13.5 20.5 11.4853 20.5 9C20.5 6.51472 18.4853 4.5 16 4.5ZM17 6.5C17.8284 6.5 18.5 7.17157 18.5 8C18.5 8.82843 17.8284 9.5 17 9.5C16.1716 9.5 15.5 8.82843 15.5 8C15.5 7.17157 16.1716 6.5 17 6.5ZM17 7.5C16.7239 7.5 16.5 7.72386 16.5 8C16.5 8.27614 16.7239 8.5 17 8.5C17.2761 8.5 17.5 8.27614 17.5 8C17.5 7.72386 17.2761 7.5 17 7.5Z"
                fill="black"
                fillOpacity="0.9"
              />
            </svg>
          </div>
          <h1 className="password-gate__title">Password protected</h1>
          <p className="password-gate__subtitle">
            Enter the password to view this page
          </p>
        </div>

        <form className="password-gate__form" onSubmit={handleSubmit}>
          <div className="password-gate__input-section">
            <input
              id="password-input"
              type="password"
              name="password"
              className={`password-gate__input${
                showError ? " password-gate__input--error" : ""
              }`}
              aria-label="password"
              value={password}
              onChange={(event) => handleInput(event.target.value)}
              autoFocus
            />
            <div
              className={`password-gate__error${
                showError ? " password-gate__error--visible" : ""
              }`}
            >
              Please enter a valid password
            </div>
          </div>
          <button
            type="submit"
            className="password-gate__submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
