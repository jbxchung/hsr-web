import { useApiAuth } from './useApi';
import { User } from '../types/User';

export const useUsers = () => {
  const { response: users, isLoading, error, invoke } = useApiAuth<Array<User>>('/api/user/all');
  
  return { users, isLoading, error, invoke };
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

export const usePutUser = (username: string) => {
  const { response: user, isLoading, error, invoke } = useApiAuth<User>(`/api/user/${username}`, {
    callOnInit: false,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  return { user, isLoading, error, invoke };
};

export const useDeleteUser = (username: string) => {
  const { response: user, isLoading, error, invoke } = useApiAuth<User>(`/api/user/${username}`, {
    callOnInit: false,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  return { user, isLoading, error, invoke };
}