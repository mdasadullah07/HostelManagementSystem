// LeaveForm.js (for Student)
import React, { useState } from "react";

const LeaveForm = () => {
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
    status: "Pending"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Leave Request:", formData);
    alert("Leave request submitted.");
    setFormData({ fromDate: "", toDate: "", reason: "", status: "Pending" });
  };

  return (
    <div className="container">
      <h3>📆 Leave Request</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label>From Date</label>
          <input
            type="date"
            className="form-control"
            value={formData.fromDate}
            onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>To Date</label>
          <input
            type="date"
            className="form-control"
            value={formData.toDate}
            onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Reason</label>
          <textarea
            className="form-control"
            rows="3"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            required
          ></textarea>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit Leave Request
        </button>
      </form>
    </div>
  );
};

export default LeaveForm;
