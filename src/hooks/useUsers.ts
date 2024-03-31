import { useApiAuth } from './useApi';
import { User } from '../types/User';

export const useUsers = () => {
  const { response: users, isLoading, error } = useApiAuth<Array<User>>('/api/user/all');
  
  return { users, isLoading, error };
};

export const usePostUser = () => {
  const { response: user, isLoading, error, invoke } = useApiAuth<User>('/api/user', {
    callOnInit: false,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  return { user, isLoading, error, invoke };
};