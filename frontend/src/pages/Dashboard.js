import React from "react";
import { useGlobal } from "../context/GlobalContext";

const Dashboard = () => {
  const { sessionId, schoolId } = useGlobal();
  const role = localStorage.getItem("userRole");

  return (
    <div className="container py-4">
  <h2 className="mb-4">Welcome back, Admin!</h2>
  <p className="text-muted mb-4">Here's what's happening in your hostel today.</p>

  <div className="row g-4">
    <div className="col-md-4">
      <div className="card shadow-sm border-0 rounded-4 text-center">
        <div className="card-body">
          <h5 className="text-primary fw-bold">248</h5>
          <p className="text-muted">Total Students</p>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card shadow-sm border-0 rounded-4 text-center">
        <div className="card-body">
          <h5 className="text-success fw-bold">32</h5>
          <p className="text-muted">Available Rooms</p>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card shadow-sm border-0 rounded-4 text-center">
        <div className="card-body">
          <h5 className="text-warning fw-bold">7</h5>
          <p className="text-muted">Pending Complaints</p>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Dashboard;
