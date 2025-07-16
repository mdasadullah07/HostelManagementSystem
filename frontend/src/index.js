import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Updated import
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ React 18+
root.render(<App />);
