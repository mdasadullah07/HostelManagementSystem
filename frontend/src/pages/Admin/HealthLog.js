// HealthLog.js (Admin or Warden)
import React, { useState } from "react";

const HealthLog = () => {
  const [logs, setLogs] = useState([
    {
      student: "Ali Khan",
      issue: "Fever",
      action: "Given paracetamol, under observation",
      date: "2025-07-14",
    },
    {
      student: "Sara Singh",
      issue: "Stomach pain",
      action: "Sent to campus doctor",
      date: "2025-07-13",
    },
  ]);

  const [form, setForm] = useState({ student: "", issue: "", action: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLog = { ...form, date: new Date().toISOString().split("T")[0] };
    setLogs([newLog, ...logs]);
    setForm({ student: "", issue: "", action: "" });
  };

  return (
    <div className="container">
      <h3>🏥 Health & Emergency Logs</h3>

      <form className="row g-3 mt-2" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <label>Student Name</label>
          <input
            className="form-control"
            value={form.student}
            onChange={(e) => setForm({ ...form, student: e.target.value })}
            required
          />
        </div>
        <div className="col-md-4">
          <label>Health Issue</label>
          <input
            className="form-control"
            value={form.issue}
            onChange={(e) => setForm({ ...form, issue: e.target.value })}
            required
          />
        </div>
        <div className="col-md-4">
          <label>Action Taken</label>
          <input
            className="form-control"
            value={form.action}
            onChange={(e) => setForm({ ...form, action: e.target.value })}
            required
          />
        </div>
        <div className="col-md-12">
          <button className="btn btn-success" type="submit">
            Add Log
          </button>
        </div>
      </form>

      <table className="table table-bordered mt-4">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Student</th>
            <th>Issue</th>
            <th>Action</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{log.student}</td>
              <td>{log.issue}</td>
              <td>{log.action}</td>
              <td>{log.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HealthLog;
