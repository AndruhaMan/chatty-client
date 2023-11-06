import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { InputField } from '../InputField';
import classNames from 'classnames';
import './LoginPage.scss';

export const LoginPage = ({ openSocket }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);

    if (userName.trim() && password.trim()) {
      const url = pathname === '/login'
        ? 'http://localhost:4000/users/login'
        : 'http://localhost:4000/users/signup'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        credentials: 'include',
        body: JSON.stringify({
          userName,
          password,
        }),
      })
        .then(result => result.json());

      if (response.status === 'success') {
        sessionStorage.setItem('sessionId', response.sessionId);
        sessionStorage.setItem('userName', userName);
        openSocket();
        navigate('/chat');
      }
    }

    setIsError(true);

    setTimeout(() => setIsError(false), 2000)
  }

  const handleModeButton = (e) => {
    if (pathname === '/login') {
      navigate('/signup');
    } else {
      navigate('/login');
    }
  }

  return (
    <div className="LoginPage">
      <h2 className="LoginPage__header">
        {pathname === '/login'
          ? 'Log in'
          : 'Sing up'}
      </h2>
      <form className="LoginPage__form form-login" onSubmit={handleSubmit}>
        <InputField
          currentvalue={userName}
          setValue={setUserName}
          placeholder="Name"
        />

        <InputField
          currentvalue={password}
          setValue={setPassword}
          type="password"
          placeholder="Password"
        />
        <button className="form-login__button form-login__button--accept"></button>

        <button
          type='button'
          className="form-login__button form-login__button--signup"
          onClick={handleModeButton}
        >
          {pathname === '/login'
           ? 'Sign up'
           : 'Back to login'
          }
        </button>
      </form>

      <div className={classNames(
        "LoginPage__error",
        { "hidden": !isError }
      )}>
        Wrong name or password!
      </div>
    </div>
  );
};