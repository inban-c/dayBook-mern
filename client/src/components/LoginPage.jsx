import React, { useState } from "react";
import axios from 'axios';
import './Login.css';
import { useNavigate } from "react-router-dom";
import { useUser } from "../App"; // Import the useUser hook

function LoginPage() {
  // const { user } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { setUser } = useUser(); // Access setUser from context
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password
      });
      
      if (response.status === 200) {
        setLoading(false);
        setSuccess(true);
        // alert(JSON.stringify(response.data));
        setUser(response.data);
         // Update user in context
        //  alert(JSON.stringify(user))
        setTimeout(() => {
          navigate('/daybook');
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={error ? "input-error" : ""}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={error ? "input-error" : ""}
        required
      />
      {error && <p className="error-message">Invalid email or password</p>}

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <button type="submit" onClick={handleSubmit}>Login</button>
      )}

      {success && <p className="success-message">Login Successful! Redirecting...</p>}
    </div>
  );
}

export default LoginPage;
