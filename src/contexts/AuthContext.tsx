import { FC, PropsWithChildren, ReactElement, ReactNode, createContext, useState } from 'react';
import { User, UserLoginRequest } from '../hooks/useUser';
import { getApiBaseUrl } from '../utils/HostUtils';

interface IAuthContext {
  user: User | null;
  login: (userLoginRequest: UserLoginRequest) => void;
  logout: () => void;
  loginError: string | null,
  clearLoginError: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  login: () => {},
  logout: () => {},
  loginError: null,
  clearLoginError: () => {},
});

const BASE_URL = getApiBaseUrl();

export const AuthProvider: FC<PropsWithChildren> = ({ children }): ReactElement => {
  const [user, setUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const login = async (userLoginRequest: UserLoginRequest) => {
    try {
      const loginResp = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userLoginRequest)
      });
      
      const loginResponseBody = await loginResp.json();

      if (!loginResponseBody.status) {
        // failed login
        setLoginError(loginResponseBody.payload);
      } else {
        console.log('Login success', loginResponseBody);
        if (loginResponseBody) {
          const user: User = loginResponseBody.payload;
          setUser(user);
        }
      }
    } catch (e) {
      console.error('Error during login attempt', e);
    }
  };
    
  const logout = () => {
    setUser(null);
  };

  const clearLoginError = () => {
    setLoginError(null);
  }
  
  return (
    <AuthContext.Provider value={{ user, login, logout, loginError, clearLoginError }}>
      {children}
    </AuthContext.Provider>
  );
};