import { jwtDecode } from 'jwt-decode';

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

// export const getUserInfo = async (sessionToken: string) => {
//   try {
//     const loginResp = await fetch(`${BASE_URL}/api/auth/info`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ token: sessionToken } )
//     });
    
//     const response = await loginResp.json();
//     console.log(response);
//     const decodedJwt = jwtDecode(sessionToken);
//     console.log(decodedJwt);

//     return 'TODO';
//   } catch (e) {
//     console.error('Error during login attempt', e);
//   }
// };