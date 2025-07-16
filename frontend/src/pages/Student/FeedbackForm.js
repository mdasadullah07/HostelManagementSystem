// FeedbackForm.js (for Student)
import React, { useState } from "react";

const FeedbackForm = () => {
  const [form, setForm] = useState({ subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Feedback Submitted:", form);
    setForm({ subject: "", message: "" });
  };

  return (
    <div className="container">
      <h3>📥 Submit Feedback</h3>

      {submitted && (
        <div className="alert alert-success">Thank you for your feedback!</div>
      )}

      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Subject</label>
          <input
            className="form-control"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label>Message</label>
          <textarea
            className="form-control"
            rows="4"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          ></textarea>
        </div>

        <button className="btn btn-primary" type="submit">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;