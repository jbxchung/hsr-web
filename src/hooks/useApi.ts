import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/HostUtils';
import { ApiResponse } from '../types/ApiResponse';
import { useAuth } from './useAuth';

const BASE_URL = getApiBaseUrl();

interface UseApiOptions extends RequestInit {
  callOnInit?: boolean;
  cacheResponse?: boolean;
}

const UseApiDefaultOptions: UseApiOptions = {
  callOnInit: true,
  cacheResponse: false,
};

const apiResponseCache: any = {};
// expects JSON response
export const useApi = <T>(url: string | URL | Request, options?: UseApiOptions | undefined ) => {
  const fetchOptions: UseApiOptions = {
    ...UseApiDefaultOptions,
    ...options
  };

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchData = async (requestBody?: any, skipCache: boolean = false) => {
    setIsLoading(true);

    const cachedResponse = apiResponseCache[url.toString()];

    // todo - need to cache per specific request, not just url
    if (!skipCache && fetchOptions.cacheResponse && cachedResponse) {
      setData(cachedResponse);
      setError(null);
    } else {
      try {
        if (requestBody) {
          fetchOptions.body = requestBody instanceof FormData ? requestBody : JSON.stringify(requestBody);
        }
  
        const response = await fetch(`${BASE_URL}${url}`, fetchOptions);
  
        let data: ApiResponse<T> = {
          status: false,
          payload: null
        };
        const contentType = response.headers.get('Content-Type');
        if (contentType === 'image/webp') {
          data = {
            status: true,
            payload: await response.blob() as T
          };
        } else if (contentType === 'application/json') {
          data = await response.json();
        } else {
          setError(`Unrecognized MIME type from API response to ${url}`);
        }
        
        if (data.status) {
          setData(data.payload);
          setError(null);
  
          if (fetchOptions.cacheResponse) {
            // todo - need to cache per specific request, not just url
            apiResponseCache[url.toString()] = data.payload;
          }
        } else {
          setError(data.payload);
        }
      } catch (error) {
        setError(error);
      }
    }

    setIsLoading(false);
  };

  const invoke = async (requestBody?: any) => fetchData(requestBody, true);

  useEffect(() => {
    if (fetchOptions.callOnInit) {
      fetchData();
    }
  }, []);

  return { response: data, isLoading, error, invoke };
};

export const useApiAuth = <T>(url: string | URL | Request, options?: UseApiOptions | undefined ) => {
  const { user: currentUser } = useAuth();
  
  return useApi<T>(url, {
    ...options,
    headers: {
      ...(options?.headers),
      'Authorization': 'Bearer ' + currentUser?.token
    }
  });
};