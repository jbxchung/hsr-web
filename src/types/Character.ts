import { GameEntity, GameEntityPath } from './GameEntity';

export interface CharacterMap {
  [id: string]: Character;
}

export interface Character extends GameEntity {
  element: CharacterElement;
}

export enum CharacterElement {
  FIRE = 'Fire',
  ICE = 'Ice',
  IMAGINARY = 'Imaginary',
  LIGHTNING = 'Lightning',
  PHYSICAL = 'Physical',
  QUANTUM = 'Quantum',
  WIND = 'Wind'
}

export const DefaultCharacter: Character = {
  id: '',
  name: '',
  rarity: 5,
  path: GameEntityPath.ABUNDANCE,
  description: '',
  element: CharacterElement.FIRE
};