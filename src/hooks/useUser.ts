import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useLocalStorage } from './useLocalStorage';

// todo: move this into a separate file
export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  authToken?: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface UserLoginRequest {
    username: string;
    password: string;
}

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const addUser = (user: User) => {
    setUser(user);
    setItem('user', JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    setItem('user', '');
  };

  return { user, addUser, removeUser, setUser };
};
