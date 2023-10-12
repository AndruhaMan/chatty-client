import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

export const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    if (userName.trim()) {
      e.preventDefault();
      sessionStorage.setItem('userName', userName);
      navigate('/chat');
    }
  }

  return (
    <div className="Login">
      <h2 className="Login__header">Enter your Username</h2>
      <form className="Login__form form-login" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          className="form-login__input"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button className="form-login__button"></button>
      </form>
    </div>

  );
};