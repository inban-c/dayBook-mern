// src/components/LoginPage.js
import React, { useState } from "react";
import axios from 'axios'
import './Login.css';
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/login', {
        email,
        password
      })
      navigate('/daybook');
    }catch(error) {
      console.log(error);
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
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" onClick = { handleSubmit }>Login</button>
    </div>
  );
}

export default LoginPage;
