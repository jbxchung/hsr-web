import { useApiAuth } from './useApi';
import { User } from '../types/User';

export const useUsers = () => {
  const { response: users, isLoading, error } = useApiAuth<Array<User>>('/api/user/all');
  
  return { users, isLoading, error };
};