// AttendanceTracker.js (for Warden)
import React, { useState } from "react";

const initialData = [
  { id: "1", name: "Ali", morning: false, afternoon: false, night: false },
  { id: "2", name: "Sara", morning: false, afternoon: false, night: false },
];

const AttendanceTracker = () => {
  const [students, setStudents] = useState(initialData);

  const toggleAttendance = (id, session) => {
    const updated = students.map((s) =>
      s.id === id ? { ...s, [session]: !s[session] } : s
    );
    setStudents(updated);
  };

  return (
    <div className="container">
      <h3>📋 Attendance Tracker</h3>
      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Morning</th>
            <th>Afternoon</th>
            <th>Night</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={s.id}>
              <td>{i + 1}</td>
              <td>{s.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={s.morning}
                  onChange={() => toggleAttendance(s.id, "morning")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={s.afternoon}
                  onChange={() => toggleAttendance(s.id, "afternoon")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={s.night}
                  onChange={() => toggleAttendance(s.id, "night")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTracker;
