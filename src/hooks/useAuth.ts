import { useEffect, useState } from 'react';
import { useUser, User, UserLoginRequest } from './useUser';
import { useLocalStorage } from './useLocalStorage';

import { getApiBaseUrl } from '../utils/HostUtils';

const BASE_URL = getApiBaseUrl();

export const useAuth = () => {
  // we can re export the user methods or object from this hook
  const { user, addUser, removeUser, setUser } = useUser();
  const { getItem, setItem, removeItem } = useLocalStorage();
  
  const [ loginError, setLoginError ] = useState<string>('');

  useEffect(() => {
    const user = getItem('user');
    if (user) {
      addUser(JSON.parse(user));
    }
  }, [addUser, getItem]);

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
          // TODO - verify payload and create interface
          const user: User = loginResponseBody.payload;
          addUser(user);
        }
      }
    } catch (e) {
      console.error('Error during login attempt', e);
    }
  };
    
  const logout = () => {
    removeUser();
  }

  return { user, login, logout, loginError, setLoginError, setUser };
};