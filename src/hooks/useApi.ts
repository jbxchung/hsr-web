import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/HostUtils';
import { ApiResponse } from '../types/ApiResponse';
import { useAuth } from './useAuth';

const BASE_URL = getApiBaseUrl();

// expects JSON response
export const useApi = <T>(url: string | URL | Request, options?: RequestInit | undefined ) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}${url}`, options);
      const data: ApiResponse<T> = await response.json();
      if (data.status) {
        setData(data.payload);
      } else {
        setError(data.payload);
      }
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { response: data, isLoading, error };
};

export const useApiAuth = <T>(url: string | URL | Request, options?: RequestInit | undefined ) => {
  const { user: currentUser } = useAuth();
  
  return useApi<T>(url, {
    ...options,
    headers: {
      ...(options?.headers),
      'Authorization': 'Bearer ' + currentUser?.token
    }
  })
};