import { GameEntity } from './GameEntity';

export interface LightConeMap {
  [id: string]: LightCone;
}

export interface LightCone extends GameEntity {
}
