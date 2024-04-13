import { ApiResponse } from '../types/ApiResponse';
import { Character } from '../types/Character';
import { getApiBaseUrl } from '../utils/HostUtils';


const BASE_URL = getApiBaseUrl();

interface CharacterMap {
  [id: string]: Character;
}

let characterCache: CharacterMap = {};
// export const getCharacters: Promise<CharacterMap> = async () => {
//   try {
//     if (!characterCache) {
//         const characterResp = await fetch(`${BASE_URL}/character/all`);
        
//         // todo - define character api response type
//         const responseObj: ApiResponse<Character[]> = await characterResp.json() as ApiResponse<Character[]>;

//         if (responseObj.status) {
//           console.log(responseObj);
//           const characterList = responseObj.payload;

//           characterCache = characterList.reduce((map: CharacterMap, character: Character) => {
//             map[character.id] = character;
//           }, {});
//         }
//     }

//     return Promise.resolve(characterCache);
//   } catch (e) {
//     console.error('Error getting characters', e);
//     return {
//       status: false,
//       payload: 'Network error: ' + (e as Error).message
//     };
//   }
// };

// export const getThumbnail = async (characterId) => {

// }

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