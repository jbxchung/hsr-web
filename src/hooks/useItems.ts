import { useApi, useApiAuth } from './useApi';
import { GameItem } from '../types/GameItem';

export const useItems = () => {
  const { response, isLoading, error, invoke } = useApi<Array<GameItem>>('/items', {
    cacheResponse: true
  });
  return { response, isLoading, error, invoke };
};

export const usePostItem = () => {
  const { response, isLoading, error, invoke } = useApiAuth<GameItem>('/items', {
    callOnInit: false,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  return { response, isLoading, error, invoke };
};

export const useDeleteItem = (itemId: string) => {
  const { response, isLoading, error, invoke } = useApiAuth<GameItem>(`/items/${itemId}`, {
    callOnInit: false,
    method: 'DELETE'
  });
  
  return { response, isLoading, error, invoke };
}