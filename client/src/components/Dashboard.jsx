// src/components/Dashboard.js
import React from "react";
import { Link } from "react-router-dom";
import './Dashboard.css';
function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Welcome to DayBook</h1>
      <div className="button-container">
        <Link to="/login">
          <button className="button">Login</button>
        </Link>
        <Link to="/signup">
          <button className="button">Signup</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
