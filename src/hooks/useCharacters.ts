import { useApi, useApiAuth } from './useApi';
import { User } from '../types/User';
import { Character, CharacterMap } from '../types/Character';

let characterCache: CharacterMap | null = null;
export const useCharacters = () => {
  const returnVal = {
    characters: [],
    isLoading: true,
    error: null,
    invoke: null,
  };

  if (characterCache) {
    return {
      characters: characterCache,
      isLoading: false,
      error: null,
      invoke: () => {}
    };
  } else {
    const { response: characters, isLoading, error, invoke } = useApi<CharacterMap>('/character/all');
    
    if (characters) {
      characterCache = characters;
    }
    
    return { characters, isLoading, error, invoke };
  }
};

export const useThumbnail = (character: Character) => {
    const { response: thumbnail, isLoading, error, invoke } = useApi<Blob>(`/character/${character.name}/thumbnail`);

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