import { FC, PropsWithChildren, ReactElement, createContext, useState } from 'react';
import useCookie from 'react-use-cookie';

import { User, UserLoginRequest } from '../types/User';
import * as AuthService from '../services/authService';

interface IAuthContext {
  user: User | null;
  login: (userLoginRequest: UserLoginRequest) => void;
  logout: () => void;
  loginError: string | null,
  setLoginError: (val: string | null) => void;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  login: () => {},
  logout: () => {},
  loginError: null,
  setLoginError: () => {},
});

// provide user login context to all children
export const AuthProvider: FC<PropsWithChildren> = ({ children }): ReactElement => {
  const [cachedUser, setCachedUser] = useCookie('user');
  const initialUser = cachedUser ? JSON.parse(cachedUser) : null;

  const [user, setUser] = useState<User | null>(initialUser);
  const [loginError, setLoginError] = useState<string | null>(null);

  const login = async (userLoginRequest: UserLoginRequest) => {
    try {
      const loginResponseBody = await AuthService.doLogin(userLoginRequest);

      if (!loginResponseBody.status) {
        setLoginError(loginResponseBody.payload);
      } else {
        console.log('Login success', loginResponseBody);
        const user: User = loginResponseBody.payload;
        setUser(user);
        setCachedUser(JSON.stringify(user))
      }
    } catch (e) {
      console.error('Error processing login response', e);
    }
  };
    
  const logout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      setUser(null);
      setCachedUser('');
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, loginError, setLoginError }}>
      {children}
    </AuthContext.Provider>
  );
};