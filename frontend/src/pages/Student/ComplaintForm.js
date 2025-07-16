// ComplaintForm.js
import React, { useState } from "react";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Complaint Submitted:", formData);
    alert("Complaint submitted successfully.");
    setFormData({ subject: "", description: "", date: new Date().toISOString().split("T")[0] });
  };

  return (
    <div className="container">
      <h3>🛠️ Submit Complaint</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label>Subject</label>
          <input
            type="text"
            className="form-control"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={formData.date}
            readOnly
          />
        </div>
        <button className="btn btn-success" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;
