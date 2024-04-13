import { useApi, useApiAuth } from './useApi';
import { Character, CharacterMap } from '../types/Character';

let characterCache: CharacterMap | null = null;
export const useCharacters = () => {
  if (characterCache) {
    return {
      characters: characterCache,
      isLoading: false,
      error: null,
      invoke: () => {}
    };
  } else {
    const { response: characters, isLoading, error, invoke } = useApi<Array<Character>>('/character/all');
    
    if (characters) {
      characterCache = Object.fromEntries(characters.map((c) => [c.id, c]));
    }
    
    return { characters, isLoading, error, invoke };
  }
};

export const useThumbnail = (character: Character) => {
  if (characterCache && characterCache[character.id]?.thumbnail) {
    return {
      thumbnail: characterCache[character.id].thumbnail,
      isLoading: false,
      error: null,
      invoke: () => {}
    };
  } else {
    const { response, isLoading, error, invoke } = useApi<Blob>(`/character/${character.name}/thumbnail`);

    let thumbnail = null;
    if (response) {
      thumbnail = URL.createObjectURL(response);
    }

    if (thumbnail && characterCache && characterCache[character.id]) {
      characterCache[character.id].thumbnail = thumbnail;
    }

    return { thumbnail, isLoading, error, invoke };
  }
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