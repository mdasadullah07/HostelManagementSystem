import React, { useState, useEffect } from "react";
import axios from "axios";

const TestAPI = () => {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    axios
      .get("/api/test")
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.error(err);
        setMessage("Error contacting server");
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>🔁 API Test Page</h2>
      <p>Backend says: <strong>{message}</strong></p>
    </div>
  );
};

export default TestAPI;
