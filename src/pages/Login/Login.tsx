import { FC, useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UserLoginRequest } from '../../types/User';

import './Login.scss';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Loader from '../../components/Loader/Loader';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { user, login, isLoading, loginError, setLoginError } = useAuth();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginButtonDisabled, setLoginButtonDisabled] = useState<boolean>(true);

  const submitLogin = useCallback(() => {
    // already submitted, don't repeat
    if (isLoading) {
      return;
    }

    // field validation
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
  }, [username, password, isLoading]);

  // any time the login fields are changed, remove any errors
  useEffect(() => {
    setLoginButtonDisabled(!username || !password);
    setLoginError(null);
  }, [username, password, setLoginError, setLoginButtonDisabled]);

  // `user` is set when the user logs in
  useEffect(() => {
    if (user) {
      console.log('TODO: redirect based on url param', user);
      navigate('/');
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
    <div className="login-wrapper">
      <div className="form login-form">
        {isLoading && (
          <div className="loading-overlay">
            <Loader />
          </div>
        )}
        <h1>Login</h1>
        <Input
          className="form-field"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          className="form-field"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="primary form-button" disabled={loginButtonDisabled} onClick={submitLogin}>
          Login
        </button>
        <span>{loginError}</span>
        <p className="disclaimer">
          <b>Note: </b>
          new account creation is centrally managed. Please check the assignment submission for credentials.
        </p>
      </div>
    </div>
  )
};

export default LoginPage;