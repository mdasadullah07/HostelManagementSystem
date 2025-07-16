// VisitorLog.js (for Guard)
import React, { useState } from "react";

const VisitorLog = () => {
  const [visitors, setVisitors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    relation: "",
    studentName: "",
    purpose: "",
    time: new Date().toLocaleString(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedVisitors = [...visitors, form];
    setVisitors(updatedVisitors);
    alert("Visitor added to log.");
    setForm({ name: "", relation: "", studentName: "", purpose: "", time: new Date().toLocaleString() });
  };

  return (
    <div className="container">
      <h3>🧾 Visitor Log</h3>
      <form className="row g-3 mt-2" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label>Name</label>
          <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="col-md-6">
          <label>Relation</label>
          <input className="form-control" value={form.relation} onChange={(e) => setForm({ ...form, relation: e.target.value })} required />
        </div>
        <div className="col-md-6">
          <label>Student Name</label>
          <input className="form-control" value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} required />
        </div>
        <div className="col-md-6">
          <label>Purpose</label>
          <input className="form-control" value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} required />
        </div>
        <div className="col-md-12">
          <button className="btn btn-primary" type="submit">Add Visitor</button>
        </div>
      </form>

      <h5 className="mt-5">Visitor Entries</h5>
      <table className="table table-bordered mt-2">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Relation</th>
            <th>Student</th>
            <th>Purpose</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((v, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{v.name}</td>
              <td>{v.relation}</td>
              <td>{v.studentName}</td>
              <td>{v.purpose}</td>
              <td>{v.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisitorLog;
