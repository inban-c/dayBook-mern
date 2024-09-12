import React, { useState } from "react";
import axios from 'axios';
import './SignupPage.css';
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const [success, setSuccess] = useState(false); // State for success message
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    if (password !== confirmPassword) {
      setError(true);
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:3000/signup', {
        firstName,
        lastName,
        email,
        password
      });
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login'); // Redirect to login after 2 seconds
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter your first name" onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Enter your last name" onChange={(e) => setLastName(e.target.value)} required />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} required />
        
        {loading ? (
          <div className="spinner"></div> // Show spinner while loading
        ) : (
          <button type="submit">Signup</button>
        )}

        {error && <p className="error-message">Passwords do not match or signup failed</p>}
        {success && <p className="success-message">Signup Successful! Redirecting...</p>}
      </form>
    </div>
  );
}

export default SignupPage;