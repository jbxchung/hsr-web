import { useApi, useApiAuth } from './useApi';
import { Character, CharacterMap } from '../types/Character';

export const useCharacters = () => {
  const { response: characters, isLoading, error, invoke } = useApi<Array<Character>>('/character/all', {
    cacheResponse: true
  });

  // todo - do we need a map of characters for faster access?
  if (characters) {
    // characterCache = Object.fromEntries(characters.map((c) => [c.id, c]));
  }
  
  return { characters, isLoading, error, invoke };
};

export const useThumbnail = (character: Character) => {
  const { response, isLoading, error, invoke } = useApi<Blob>(`/character/${character.name}/thumbnail`, {
    cacheResponse: true
  });

  let thumbnail = null;
  if (response) {
    thumbnail = URL.createObjectURL(response);
  }

  return { thumbnail, isLoading, error, invoke };
}

export const usePostCharacter = () => {
  const { response: user, isLoading, error, invoke } = useApiAuth<Character>('/character/', {
    callOnInit: false,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  return { user, isLoading, error, invoke };
};

// export const usePutUser = (username: string) => {
//   const { response: user, isLoading, error, invoke } = useApiAuth<User>(`/user/${username}`, {
//     callOnInit: false,
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
  
//   return { user, isLoading, error, invoke };
// };

// export const useDeleteUser = (username: string) => {
//   const { response: user, isLoading, error, invoke } = useApiAuth<User>(`/user/${username}`, {
//     callOnInit: false,
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
  
//   return { user, isLoading, error, invoke };
// }