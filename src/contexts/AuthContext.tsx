import { FC, PropsWithChildren, ReactElement, createContext, useState } from 'react';
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
  const [user, setUser] = useState<User | null>(null);
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
      }
    } catch (e) {
      console.error('Error processing login response', e);
    }
  };
    
  const logout = () => {
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, loginError, setLoginError }}>
      {children}
    </AuthContext.Provider>
  );
};