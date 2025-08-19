import { useState } from "react";
import type { EmailForm } from "../../models/EmailForm";
import "./EmailGenerator.css";
import { useGenerateEmail } from "../../hooks/useGenerateEmail";

const EmailGenerator = () => {
  const [formValue, setFormValue] = useState<EmailForm>({
    emailSubject: "",
    isFormalStyle: false,
    emailAditionalDetails: ""
  });

  const { generateEmail, generatedEmail, loading, error } = useGenerateEmail();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    generateEmail(formValue);
  };


  const handleChange = (event: { target: { name: string; value: string | boolean }; }) => {
    const name = event.target.name;
    const value =  event.target.value;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  }


  return (
    <div className="generator-wrapper">
      <h3>Welcome to AI email generator</h3>
      <div className="prompt-data-form">
        <form onSubmit={handleSubmit}>
          <label>Enter Email Subject:</label>
          <input
            className="input email-subject-input"
            type="text"
            name="emailSubject"
            value={formValue?.emailSubject}
            onChange={handleChange}
          />
            <label>Is Formal Style:</label>
            <input
            type="checkbox"
            name="isFormalStyle"
            checked={formValue?.isFormalStyle}
            onChange={(event) => {
              setFormValue((prev) => ({ ...prev, isFormalStyle: event.target.checked }));
            }}
          />
            <label>Enter Additional Details:</label>
            <textarea
           rows={4}
            name="emailAditionalDetails"
            value={formValue?.emailAditionalDetails}
            onChange={handleChange}
          />
            <button type="submit">Generate Email</button>
        </form>
      </div>
      <div className="prompt-data-display">
        <h4>Generated Email:</h4>
        <div className="email-display">
          {error && <span style={{ color: "red" }}>{error}</span>}
          {loading && <span>Generating email...</span>}
          {!loading && !error && generatedEmail}
        </div>
     </div>
    </div>
  );
}

export default EmailGenerator;
