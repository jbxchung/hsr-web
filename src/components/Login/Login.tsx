import { FC, useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UserLoginRequest } from '../../types/User';

import './Login.scss';

const LoginPage: FC = () => {
  const { user, login, loginError, setLoginError: setLoginError } = useAuth();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
    setLoginError(null);
  }, [username, password]);

  useEffect(() => {
    if (user) {
      console.log('TODO: redirect on user authenticated', user);
    }
  }, [user])

  return (
    <div className="login-form">
      <div className="login-field">
        <label htmlFor='username'>Username</label>
        <input id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="login-field">
        <label htmlFor='password'>Password</label>
        <input id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="login-button" onClick={submitLogin}>
        Login
      </button>
      {user && `logged in as ${user.email}`}
      <span>{loginError}</span>
    </div>
  )
};

export default LoginPage;