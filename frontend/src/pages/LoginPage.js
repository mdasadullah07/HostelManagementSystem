import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";

const LoginPage = () => {
  const { setSessionId, setSchoolId } = useGlobal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // fake response; replace with axios post request
      const response = {
        token: "abcd1234",
        sessionId: "2025-session-01",
        schoolId: "school-xyz-123",
        role: "Admin"
      };

      localStorage.setItem("token", response.token);
      localStorage.setItem("userRole", response.role);
      setSessionId(response.sessionId);
      setSchoolId(response.schoolId);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="w-50">
        <div className="mb-3">
          <label>Email:</label>
          <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
