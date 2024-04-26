import { useApi, useApiAuth } from './useApi';
import { GameEntity, GameEntityType } from '../types/GameEntity';

export const useGameEntities = (entityType: GameEntityType) => {
  const { response, isLoading, error, invoke } = useApi<Array<GameEntity>>(`/${entityType}/all`, {
    cacheResponse: true
  });

  // todo - do we need a map of characters for faster access?
  // if (characters) {
    // characterCache = Object.fromEntries(characters.map((c) => [c.id, c]));
  // }
  
  return { response, isLoading, error, invoke };
};

export const useThumbnail = (entity: GameEntity, entityType: GameEntityType) => {
  const { response, isLoading, error, invoke } = useApi<Blob>(`/${entityType}/${entity.id}/thumbnail`, {
    cacheResponse: true
  });

  let thumbnail = null;
  if (response) {
    thumbnail = URL.createObjectURL(response);
  }

  return { thumbnail, isLoading, error, invoke };
}

export const usePostGameEntity = (entityType: GameEntityType) => {
  const { response: gameEntity, isLoading, error, invoke } = useApiAuth<GameEntity>(`/${entityType}/`, {
    callOnInit: false,
    method: 'POST',
  });
  
  return { gameEntity, isLoading, error, invoke };
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