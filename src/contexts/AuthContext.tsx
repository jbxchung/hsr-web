import { FC, PropsWithChildren, ReactElement, createContext, useState } from 'react';
import useCookie from 'react-use-cookie';

import { User, UserLoginRequest } from '../types/User';
import * as AuthService from '../api/Auth';
import { useNavigate } from 'react-router-dom';

interface IAuthContext {
  user: User | null;
  login: (userLoginRequest: UserLoginRequest) => void;
  logout: () => void;
  isLoading: boolean;
  loginError: string | null,
  setLoginError: (val: string | null) => void;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: false,
  loginError: null,
  setLoginError: () => {},
});

// provide user login context to all children
export const AuthProvider: FC<PropsWithChildren> = ({ children }): ReactElement => {
  const navigate = useNavigate();

  // todo - session cookie should be set by server response with HttpOnly
  const [cachedUser, setCachedUser] = useCookie('user');
  const initialUser = cachedUser ? JSON.parse(cachedUser) : null;

  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const login = async (userLoginRequest: UserLoginRequest) => {
    try {
      setIsLoading(true);
      const loginResponseBody = await AuthService.doLogin(userLoginRequest);

      if (!loginResponseBody.status) {
        setLoginError(loginResponseBody.payload);
      } else {
        console.log('Login success', loginResponseBody);
        const user: User = loginResponseBody.payload;
        setUser(user);
        setCachedUser(JSON.stringify(user), {
          days: 1,
          SameSite: 'Strict',
          // Secure: true,
        });
      }
    } catch (e) {
      console.error('Error processing login response', e);
    } finally {
      setIsLoading(false);
    }
  };
    
  const logout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      setUser(null);
      setCachedUser('');
      navigate('/login');
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, loginError, setLoginError }}>
      {children}
    </AuthContext.Provider>
  );
};