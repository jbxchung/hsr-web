import { useApiAuth } from './useApi';
import { GachaPull } from '../types/GachaPull';
import { InventoryItem } from '../types/GameItem';

export const useInventory = () => {
  const { response, isLoading, error, invoke } = useApiAuth<Array<InventoryItem>>(`/inventory`);

  return { response, isLoading, error, invoke };
};

export const useAddUserItem = () => {
  const { response, isLoading, error, invoke } = useApiAuth<InventoryItem>(`/inventory`, {
    callOnInit: false,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  return { response, isLoading, error, invoke };
};

export const useRemoveUserItem = () => {
  const { response, isLoading, error, invoke } = useApiAuth<InventoryItem>(`/inventory`, {
    callOnInit: false,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  return { response, isLoading, error, invoke };
};