import { GameEntity, GameEntityType } from "./GameEntity";

export interface GachaPull {
  timestamp: string;
  entityType: GameEntityType;
  entity: GameEntity;
}