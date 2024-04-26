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
  const { response, isLoading, error, invoke } = useApiAuth<GameEntity>(`/${entityType}/`, {
    callOnInit: false,
    method: 'POST',
  });
  
  return { response, isLoading, error, invoke };
};

export const useDeleteGameEntity = (entityId: string, entityType: GameEntityType) => {
  const { response, isLoading, error, invoke } = useApiAuth<GameEntity>(`/${entityType}/${entityId}`, {
    callOnInit: false,
    method: 'DELETE'
  });
  
  return { response, isLoading, error, invoke };
}