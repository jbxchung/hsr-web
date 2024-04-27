import { GameEntity, GameEntityType } from "./GameEntity";

export interface GachaPull {
  id: string;
  timestamp: string;
  entityType: GameEntityType;
  entity: GameEntity;
}