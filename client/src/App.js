import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import DayBook from "./components/DayBook";

function App() {
  const [user, setUser] = useState(null); // Store the logged-in user

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/daybook" element={<DayBook user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
