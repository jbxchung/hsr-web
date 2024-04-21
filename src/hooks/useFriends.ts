import { useApiAuth } from './useApi';
import { Friendship } from '../types/Friendship';

export const useFriends = () => {
  const { response: friends, isLoading, error, invoke } = useApiAuth<Array<Friendship>>('/friends');
  
  return { friends, isLoading, error, invoke };
};

export const useFriendCancel = (receiver: string) => {
  const { response: friendship, isLoading, error, invoke } = useApiAuth<Friendship>(`/friends/cancel/${receiver}`, {
    callOnInit: false,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  return { friendship, isLoading, error, invoke };
}

export const useFriendRequest = (receiver: string) => {
  const { response: friendship, isLoading, error, invoke } = useApiAuth<Friendship>(`/friends/request/${receiver}`, {
    callOnInit: false,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  return { friendship, isLoading, error, invoke };
};

export const useFriendAccept = (sender: string) => {
  const { response: friendship, isLoading, error, invoke } = useApiAuth<Friendship>(`/friends/accept/${sender}`, {
    callOnInit: false,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  return { friendship, isLoading, error, invoke };
};

export const useFriendReject = (sender: string) => {
  const { response: friendship, isLoading, error, invoke } = useApiAuth<Friendship>(`/friends/reject/${sender}`, {
    callOnInit: false,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  return { friendship, isLoading, error, invoke };
};
