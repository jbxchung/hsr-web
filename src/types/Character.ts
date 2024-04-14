import { GameEntity } from './GameEntity';

export interface CharacterMap {
  [id: string]: Character;
}

export interface Character extends GameEntity {
  element: Element;
}

export enum Element {
  FIRE = 'Fire',
  ICE = 'Ice',
  IMAGINARY = 'Imaginary',
  LIGHTNING = 'Lightning',
  PHYSICAL = 'Physical',
  QUANTUM = 'Quantum',
  WIND = 'Wind'
}
