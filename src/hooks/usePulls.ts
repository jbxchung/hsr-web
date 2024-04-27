import { useApiAuth } from './useApi';
import { GachaPull } from '../types/GachaPull';

export const usePulls = () => {
  const { response, isLoading, error, invoke } = useApiAuth<Array<GachaPull>>(`/pulls`);

  return { response, isLoading, error, invoke };
};

export const useAddPull = () => {
  const { response, isLoading, error, invoke } = useApiAuth<GachaPull>(`/pulls`, {
    callOnInit: false,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  return { response, isLoading, error, invoke };
};
