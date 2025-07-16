// NoticeBoard.js (for All Roles)
import React, { useState } from "react";

const NoticeBoard = () => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "⚠️ Fire Drill",
      message: "All students must assemble in the courtyard at 4 PM for a fire drill.",
      date: "2025-07-14",
    },
    {
      id: 2,
      title: "📢 Guest Lecture",
      message: "A guest lecture on mental health will be held in the auditorium tomorrow at 11 AM.",
      date: "2025-07-15",
    },
  ]);

  return (
    <div className="container">
      <h3>📢 Notice Board</h3>
      <ul className="list-group mt-3">
        {notices.map((notice) => (
          <li key={notice.id} className="list-group-item">
            <h6>{notice.title}</h6>
            <p className="mb-1">{notice.message}</p>
            <small className="text-muted">Date: {notice.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeBoard;