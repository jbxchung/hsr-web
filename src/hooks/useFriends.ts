import { useApiAuth } from './useApi';
import { Friendship } from '../types/Friendship';

export const useFriends = () => {
  const { response: friends, isLoading, error, invoke } = useApiAuth<Array<Friendship>>('/friends');
  
  return { friends, isLoading, error, invoke };
};

export const useFriendRequest = () => {
  const { response: friendship, isLoading, error, invoke } = useApiAuth<Friendship>(`/friends/request`, {
    callOnInit: false,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  return { friendship, isLoading, error, invoke };
};

export const useFriendCancel = () => {
  const { response: friendship, isLoading, error, invoke } = useApiAuth<Friendship>(`/friends/cancel`, {
    callOnInit: false,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  return { friendship, isLoading, error, invoke };
}

export const useFriendAccept = () => {
  const { response: friendship, isLoading, error, invoke } = useApiAuth<Friendship>(`/friends/accept`, {
    callOnInit: false,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  return { friendship, isLoading, error, invoke };
};

export const useFriendReject = () => {
  const { response: friendship, isLoading, error, invoke } = useApiAuth<Friendship>(`/friends/reject`, {
    callOnInit: false,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  return { friendship, isLoading, error, invoke };
};

export const useFriendDelete = () => {
  const { response: friendship, isLoading, error, invoke } = useApiAuth<Friendship>(`/friends/delete`, {
    callOnInit: false,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  return { friendship, isLoading, error, invoke };
};