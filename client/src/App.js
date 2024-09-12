import React, {  useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import DayBook from "./components/DayBook";

// Create a UserContext
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

function App() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   setUser("kevin");
  // }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/daybook" element={<DayBook />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
