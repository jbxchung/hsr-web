import { GameEntity, GameEntityPath } from './GameEntity';

export interface LightConeMap {
  [id: string]: LightCone;
}

export interface LightCone extends GameEntity {
}

export const DefaultLightCone: LightCone = {
  id: '',
  name: '',
  rarity: 5,
  path: GameEntityPath.ABUNDANCE,
  description: ''
};