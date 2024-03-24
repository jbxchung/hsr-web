import { FC, useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UserLoginRequest } from '../../types/User';

import './Login.scss';

const LoginPage: FC = () => {
  const { user, login, loginError, setLoginError } = useAuth();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginButtonDisabled, setLoginButtonDisabled] = useState<boolean>(true);

  const submitLogin = useCallback(() => {
    if (!username) {
      setLoginError('Username is required.')
      return;
    }
    if (!password) {
      setLoginError('Password is required.')
      return;
    }

    const userLoginFields: UserLoginRequest = {
      username,
      password,
    };
    login(userLoginFields);
  }, [username, password]);

  // any time the login fields are changed, remove any errors
  useEffect(() => {
    setLoginButtonDisabled(!username || !password);
    setLoginError(null);
  }, [username, password, setLoginError, setLoginButtonDisabled]);

  // `user` is set when the user logs in
  useEffect(() => {
    if (user) {
      console.log('TODO: redirect on user authenticated', user);
    }
  }, [user]);


  // allow press enter to submit
  const handleKeyPressed = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !loginButtonDisabled) {
      submitLogin();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPressed, false);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPressed, false);
    }
  }, [handleKeyPressed]);

  return (
    <div className="login-form">
      <h1>Login</h1>
      <div className="login-field">
        <input
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
      </div>
      <div className="login-field">
        <input
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          />
      </div>
      <button className="login-button" disabled={loginButtonDisabled} onClick={submitLogin}>
        Login
      </button>
      {user && `logged in as ${user.email}`}
      <span>{loginError}</span>
    </div>
  )
};

export default LoginPage;