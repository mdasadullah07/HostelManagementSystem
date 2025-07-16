// HostelFee.js (Admin Fee Management)
import React, { useState } from "react";

const HostelFee = () => {
  const [records, setRecords] = useState([
    { name: "Ali Khan", room: "A101", amount: 15000, status: "Paid" },
    { name: "Sara Singh", room: "B202", amount: 15000, status: "Unpaid" },
    { name: "Ravi Patel", room: "C303", amount: 15000, status: "Paid" },
  ]);

  return (
    <div className="container">
      <h3>💳 Hostel Fee Management</h3>
      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Room</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{r.name}</td>
              <td>{r.room}</td>
              <td>₹{r.amount}</td>
              <td>
                <span
                  className={`badge bg-${r.status === "Paid" ? "success" : "danger"}`}
                >
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HostelFee;
