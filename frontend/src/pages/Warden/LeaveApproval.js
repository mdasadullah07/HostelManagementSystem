// LeaveApproval.js (for Warden)
import React, { useState, useEffect } from "react";

const LeaveApproval = () => {
  const [leaves, setLeaves] = useState([
    {
      id: "1",
      studentName: "Ali",
      fromDate: "2025-07-20",
      toDate: "2025-07-22",
      reason: "Family emergency",
      status: "Pending",
    },
    {
      id: "2",
      studentName: "Sara",
      fromDate: "2025-07-25",
      toDate: "2025-07-27",
      reason: "Exam preparation",
      status: "Pending",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    const updatedLeaves = leaves.map((leave) =>
      leave.id === id ? { ...leave, status: newStatus } : leave
    );
    setLeaves(updatedLeaves);
  };

  return (
    <div className="container">
      <h3>📋 Leave Requests</h3>
      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Student</th>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, i) => (
            <tr key={leave.id}>
              <td>{i + 1}</td>
              <td>{leave.studentName}</td>
              <td>{leave.fromDate}</td>
              <td>{leave.toDate}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
              <td>
                {leave.status === "Pending" && (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => updateStatus(leave.id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => updateStatus(leave.id, "Rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveApproval;
