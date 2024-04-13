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
  ERUDITION = 'Erudition'
}

export enum Element {
  FIRE = 'Fire'
}



// export interface UserLoginRequest {
//   username: string;
//   password: string;
// }