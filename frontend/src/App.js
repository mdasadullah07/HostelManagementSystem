import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { GlobalProvider } from "./context/GlobalContext";
import SidebarLayout from "./components/SidebarLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentTable from "./pages/Admin/StudentTable";
import ComplaintForm from "./pages/Student/ComplaintForm";
import LeaveForm from "./pages/Student/LeaveForm";
import LeaveApproval from "./pages/Warden/LeaveApproval";
import AttendanceTracker from "./pages/Warden/AttendanceTracker";
import MealMenu from "./pages/Student/MealMenu";
import VisitorLog from "./pages/Guard/VisitorLog";
import NoticeBoard from "./pages/Common/NoticeBoard";
import FeedbackForm from "./pages/Student/FeedbackForm";
import AdminAnalytics from "./pages/Admin/AdminAnalytics";
import HostelFee from "./pages/Admin/HostelFee";
import HealthLog from "./pages/Admin/HealthLog";
import TestAPI from "./pages/TestAPI";
import HostelTable from "./pages/Admin/HostelTable";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          {/* 👇 Sidebar for all protected pages */}
          <Route element={<SidebarLayout />}>
            {/* Dashboard for all roles */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute roles={["Admin", "Warden", "Student", "Guard"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin/students"
              element={
                <ProtectedRoute roles={["Admin"]}>
                  <StudentTable />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/hostels"
              element={
                <ProtectedRoute roles={["Admin"]}>
                  <HostelTable />
                </ProtectedRoute>
              }
            />

            {/* Student routes */}
            <Route
              path="/student/attendance"
              element={
                <ProtectedRoute roles={["Student"]}>
                  <div>📝 Student - Attendance</div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/complaints"
              element={
                <ProtectedRoute roles={["Student"]}>
                  <ComplaintForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/leave"
              element={
                <ProtectedRoute roles={["Student"]}>
                  <LeaveForm />
                </ProtectedRoute>
              }
            />

            {/* Warden routes */}
            <Route
              path="/warden/leaves"
              element={
                <ProtectedRoute roles={["Warden"]}>
                  <LeaveApproval />
                </ProtectedRoute>
              }
            />
            <Route
              path="/warden/attendance"
              element={
                <ProtectedRoute roles={["Warden"]}>
                  <AttendanceTracker />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Routes outside sidebar layout */}
          <Route
            path="/student/menu"
            element={
              <ProtectedRoute roles={["Student"]}>
                <MealMenu />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guard/visitorlog"
            element={
              <ProtectedRoute roles={["Guard"]}>
                <VisitorLog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notices"
            element={
              <ProtectedRoute roles={["Admin", "Warden", "Student", "Guard"]}>
                <NoticeBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/feedback"
            element={
              <ProtectedRoute roles={["Student"]}>
                <FeedbackForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <AdminAnalytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/hostelfee"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <HostelFee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/health"
            element={
              <ProtectedRoute roles={["Admin", "Warden"]}>
                <HealthLog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/test"
            element={
              <ProtectedRoute roles={["Admin", "Warden", "Guard", "Student"]}>
                <TestAPI />
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
