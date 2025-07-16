import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import {
  FaUserGraduate,
  FaBuilding,
  FaSignOutAlt,
  FaChartLine,
} from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const occupancyData = [
  { month: 'Jan', roomsOccupied: 80 },
  { month: 'Feb', roomsOccupied: 120 },
  { month: 'Mar', roomsOccupied: 100 },
  { month: 'Apr', roomsOccupied: 130 },
  { month: 'May', roomsOccupied: 110 },
];

const SidebarLayout = () => {
  const role = localStorage.getItem("userRole");
  const navigate = useNavigate();
  const { sessionId, schoolId } = useGlobal();

  const navItems = {
    Admin: [
      { name: "Dashboard", icon: <FaChartLine /> },
      { name: "Students", icon: <FaUserGraduate /> },
      { name: "Hostels", icon: <FaBuilding /> },
      { name: "Complaints", icon: "📝" },
      { name: "Leaves", icon: "📅" },
      { name: "Settings", icon: "⚙️" },
    ],
    Warden: [
      { name: "Attendance", icon: "📊" },
      { name: "Leaves", icon: "📅" },
      { name: "Reports", icon: "📈" },
    ],
    Guard: [{ name: "Visitor Log", icon: "🧾" }],
    Student: [
      { name: "Menu", icon: "🍽️" },
      { name: "Attendance", icon: "📊" },
      { name: "Leave", icon: "📝" },
      { name: "Complaints", icon: "📢" },
      { name: "Feedback", icon: "💬" },
    ],
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const chartData = [
    { name: "Jan", students: 40 },
    { name: "Feb", students: 55 },
    { name: "Mar", students: 48 },
    { name: "Apr", students: 60 },
  ];

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div className="bg-dark text-white p-4" style={{ width: "250px" }}>
        <h4 className="text-center mb-4">🏨 Hostel</h4>
        <p>
          <small>
            <strong>Session:</strong> {sessionId}
          </small>
        </p>
        <p>
          <small>
            <strong>School:</strong> {schoolId}
          </small>
        </p>

        <ul className="nav flex-column">
          {navItems[role]?.map((item, i) => (
            <li key={i} className="nav-item mb-2">
              <Link
                to={`/${role.toLowerCase()}/${item.name
                  .toLowerCase()
                  .replace(/\s+/g, "")}`}
                className="nav-link text-white d-flex align-items-center"
              >
                <span className="me-2">{item.icon}</span> {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <button className="btn btn-outline-light w-100 mt-3" onClick={logout}>
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 overflow-auto">
        <Outlet />

        {/* Chart Area */}
        <div className="mt-5">
          <h5>🏔️ Room Occupancy Trends</h5>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={occupancyData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorOccupancy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00c6ff" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#00c6ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="roomsOccupied"
                stroke="#00c6ff"
                fillOpacity={1}
                fill="url(#colorOccupancy)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
