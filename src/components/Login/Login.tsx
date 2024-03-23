import { FC, useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UserLoginRequest } from '../../hooks/useUser';

const LoginPage: FC = () => {
  const { login, loginError, setLoginError } = useAuth();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submitLogin = useCallback(() => {
    const userLoginFields: UserLoginRequest = {
      username,
      password,
    };
    login(userLoginFields);
  }, [username, password]);

  // any time the login fields are changed, remove the error
  useEffect(() => {
    setLoginError('');
  }, [username, password]);

  return (
    <div>
      <label htmlFor='username'>Username</label>
      <input id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
      <label htmlFor='password'>Password</label>
      <input id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={submitLogin}>
        Login
      </button>
      <span>{loginError}</span>
    </div>
  )
};

export default LoginPage;