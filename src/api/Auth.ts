import { jwtDecode } from 'jwt-decode';

import { UserLoginRequest } from '../types/User';
import { getApiBaseUrl } from '../utils/HostUtils';
import { ApiResponse } from '../types/ApiResponse';


const BASE_URL = getApiBaseUrl();

export const doLogin = async (loginRequest: UserLoginRequest): Promise<ApiResponse<any>> => {
  try {
    const loginResp = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginRequest)
    });
    
    return loginResp.json();
  } catch (e) {
    console.error('Error during login attempt', e);
    return {
      status: false,
      payload: 'Network error: ' + (e as Error).message
    };
  }
};
