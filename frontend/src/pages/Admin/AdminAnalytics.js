// AdminAnalytics.js
import React from "react";

const AdminAnalytics = () => {
  const data = {
    totalStudents: 120,
    totalRooms: 45,
    complaintsResolved: 87,
    pendingLeaves: 5,
    availableBeds: 12,
    visitorsToday: 8,
  };

  const cards = [
    { title: "Total Students", value: data.totalStudents },
    { title: "Total Rooms", value: data.totalRooms },
    { title: "Resolved Complaints", value: data.complaintsResolved },
    { title: "Pending Leave Requests", value: data.pendingLeaves },
    { title: "Available Beds", value: data.availableBeds },
    { title: "Visitors Today", value: data.visitorsToday },
  ];

  return (
    <div className="container">
      <h3>📊 Admin Analytics Dashboard</h3>
      <div className="row mt-3">
        {cards.map((card, i) => (
          <div className="col-md-4 mb-3" key={i}>
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h5 className="card-title">{card.title}</h5>
                <h2>{card.value}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAnalytics;
