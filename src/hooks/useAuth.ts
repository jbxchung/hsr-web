import { useEffect } from 'react';
import { useUser, User, UserLoginRequest } from './useUser';
import { useLocalStorage } from './useLocalStorage';

import { getApiBaseUrl } from '../utils/HostUtils';

const BASE_URL = getApiBaseUrl();

export const useAuth = () => {
  // we can re export the user methods or object from this hook
  const { user, addUser, removeUser, setUser } = useUser();
  const { getItem, setItem, removeItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem('user');
    if (user) {
      addUser(JSON.parse(user));
    }
  }, [addUser, getItem]);

  const login = async (userLoginRequest: UserLoginRequest) => {
    const loginResp = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(userLoginRequest)
    });
    
    const loginResponseBody = await loginResp.json();

    if (loginResponseBody) {
      // TODO - verify payload and create interface
      const user = loginResponseBody;
      addUser(user);
    }
  };
    
  const logout = () => {
    removeUser();
  }

  return { user, login, logout, setUser };
};