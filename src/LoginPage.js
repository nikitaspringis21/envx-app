import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage({ setAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const correctUsername = 'admin';
    const correctPassword = 'admin';

    if (username === correctUsername && password === correctPassword) {
      setAuth(true); 
      navigate('/calendar');
    } else {
      setAuth(false); 
      setError('Nepareizs lietotājvārds vai parole');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Sveiki, skolēn!</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="text"
          placeholder="Lietotājvārds"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Parole"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Ienākt</button>
      </div>
    </div>
  );
}

export default LoginPage;
