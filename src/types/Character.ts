export interface CharacterMap {
  [id: string]: Character;
}

export interface Character {
  id: string;
  name: string;
  rarity: number;
  path: CharacterPath;
  element: Element;
  description: string;
  thumbnail?: string;
}

export enum CharacterPath {
  ABUNDANCE = 'Abundance',
  DESTRUCTION = 'Destruction',
  ERUDITION = 'Erudition',
  HARMONY = 'Harmony',
  HUNT = 'Hunt',
  NIHILITY = 'Nihility',
  PRESERVATION = 'Preservation'
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



// export interface UserLoginRequest {
//   username: string;
//   password: string;
// }