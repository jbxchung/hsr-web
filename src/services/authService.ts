import { UserLoginRequest } from '../types/User';
import { getApiBaseUrl } from '../utils/HostUtils';


const BASE_URL = getApiBaseUrl();

export const doLogin = async (loginRequest: UserLoginRequest) => {
  try {
    const loginResp = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginRequest)
    });
    
    return await loginResp.json();
  } catch (e) {
    console.error('Error during login attempt', e);
  }
};
