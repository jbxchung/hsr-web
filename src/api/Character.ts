import { ApiResponse } from '../types/ApiResponse';
import { getApiBaseUrl } from '../utils/HostUtils';


const BASE_URL = getApiBaseUrl();

let characterCache: any;
export const getCharacters = async () => {
  try {
    if (!characterCache) {
        const characterResp = await fetch(`${BASE_URL}/character/all`);
        
        // todo - define character api response type
        const responseObj: ApiResponse<any> = await characterResp.json() as ApiResponse<any>;

        if (responseObj.status) {
            characterCache = responseObj.payload;
        }
    }

    return Promise.resolve(characterCache);
  } catch (e) {
    console.error('Error getting characters', e);
    return {
      status: false,
      payload: 'Network error: ' + (e as Error).message
    };
  }
};

// export const getUserInfo = async (sessionToken: string) => {
//   try {
//     const loginResp = await fetch(`${BASE_URL}/auth/info`, {
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