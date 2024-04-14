import { GameEntityPath } from "./GameEntity";

export interface CharacterMap {
  [id: string]: Character;
}

export interface Character {
  id: string;
  name: string;
  rarity: number;
  path: GameEntityPath;
  element: Element;
  description: string;
  thumbnail?: string;
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
